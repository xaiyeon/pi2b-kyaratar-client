<template>
    <div>
        <q-page>
            <q-toolbar>
                <q-toolbar-title>
                    Forum
                </q-toolbar-title>
            </q-toolbar>
            <!-- <div class="profiletitle">
            </div> -->
            <div class="row">
                <div class="col-lg-6">
                    <div class="q-ma-md">
                        <div class="q-mb-md">
                            <div>
                                <q-btn icon="add" label="New Thread" color="tertiary" @click.native="showThreadModal = true"></q-btn>
                            </div>
                            <br>
                            <hr>
                            <q-select
                            placeholder="Select Category"
                            v-model="selectCategory"
                            :options="selectCatOptions"
                            />
                            <br>
                            <q-radio v-model="orderbySelection" val="popular" color="red" label="Popular" />
                            <q-radio v-model="orderbySelection" val="newest" color="red" label="Newest" style="margin-left: 10px" />
                            <q-radio v-model="orderbySelection" val="oldest" color="red" label="Oldest" style="margin-left: 10px" />
                        </div>
                        <q-btn label="Apply Filter"></q-btn>
                    </div>
                    <template>
                        <div style="text-align: center;">
                        <q-pagination
                        class="shadow-4"
                        v-model="pagination.pageNumber"
                        color="black"
                        :min="1"
                        :max="pagination.maxPages"
                        :max-pages="8"
                        boundary-links
                        />
                        </div>
                            <div class="q-ma-lg">
                                <div class="q-pa-lg shadow-6" v-for="(thread, index) in currentThreads" :key="index">
                                    <div class="row">
                                        <div class="col-lg-7">
                                            <span class="threadtitle" style="font-size: 1.5em; font-weight: bold"><a @click="navigateToThread(thread.uuid, thread)">{{ thread.title }}</a></span>
                                        </div>
                                        <div style="float:right;" class="col-auto inline flex">
                                            <q-chip class="q-pa-sm" flat dense icon="book" color="tertiary">
                                            {{ thread.GroupForumCategory.name }}
                                            </q-chip>
                                            <p class="q-pr-md"></p>
                                            <q-chip class="q-pa-sm" flat dense icon="remove_red_eye" color="primary">
                                            {{ thread.viewCount }} Views
                                            </q-chip>
                                            <p class="q-pr-md"></p>
                                            <q-chip class="q-pa-sm" flat dense icon="chat" color="primary">
                                            {{ thread.commentCount }} Comments
                                            </q-chip>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-8">
                                            <div class="">
                                                <div v-html="thread.text.substring(0,69) + '...'">
                                                </div>
                                            </div>                           
                                        </div>
                                        <div class="col-lg-4">

                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-8">
                                            Last Reply:  | Started by: <span class="userName">{{ thread.User.displayName }}</span> | Posted: {{ fromNow(thread.createdAt) }}
                                        </div>
                                        <div class="col-lg-4">
                                            
                                        </div>                                
                                    </div>
                                </div>
                            </div>
                    </template>
                </div>
                <div class="col-lg-6">
                    <router-view />
                </div>
            </div>
            <template>
                <q-modal leave-class="pulse" position="bottom" :no-backdrop-dismiss="x = false" v-model="showThreadModal">
                <div style="padding: 50px; display: inline-block; width:94vw">
                    <div class="q-display-1 q-mb-md">Thread</div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="q-ma-sm">
                                <p>Your Thread:</p>
                                <div>
                                    Title:
                                    <q-input v-model="threadTitle" stack-label="Title of thread" />
                                </div>
                                <div>
                                    Category:
                                    <q-select
                                    placeholder="Select Category"
                                    v-model="threadCategory"
                                    :options="selectCatOptions"
                                    />
                                </div>
                                <br>
                                <div>
                                    What you want to discuss: 
                                </div>
                                <br>
                                <vue-editor v-model="threadContent"></vue-editor>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="q-ma-sm ">
                                <p>Preview:</p>
                                <div class="commentPre-container">
                                    <div v-html="threadContent">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <q-btn color="tertiary" @click="submitThread" label="Submit" />
                    <q-btn style="margin-left: 1.1em" color="tertiary" @click="showThreadModal = false" label="Close" />
                </div>
                </q-modal>
            </template>
        </q-page>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import EasyPanel from './../../../_shared/EasyPanel.vue';
import GroupService from '@/_services/groupService';
import moment from 'moment';
import { VueEditor } from 'vue2-editor';
import swal from 'sweetalert2';
import groupService from '@/_services/groupService';


// use this as copy and paste for making .vue files, change name
@Component({
    components: {
        EasyPanel,
        VueEditor,
    },
})
export default class GroupForum extends Vue {
    @Prop({default: () => []})
    public pGroup!: any;

    public globalGroupId!: any;
    public currentThreads = null;

    // search thread filters
    public selectCategory = '';
    public orderbySelection = '';

    public mGroupForum = {
        uuid: '',
        name: '',
    };

    // temp vars for data posting thread
    public threadContent = '';
    public threadTitle = '';
    public threadCategory = '';

    // for thread pagination
    public pagination = {
        pageNumber: 1,
        itemsPerPage: 5,
        maxPages: null,
    };

    // used variables
    public tgroupId: any = null;
    public tgroupForumId: any = null;

    // UI variables
    public showThreadModal = false;

    // for the selector on front-end
    public selectCatOptions: any[] = [];

    // BELOW ARE METHODS
    @Watch('pagination.pageNumber', { immediate: true })
    public onChangePage(value: any) {
        this.pagination.pageNumber = value;
        console.log(this.pagination);
        console.log(this.pagination.pageNumber);
        this.loadThreads();
    }

    // get categories for filter search
    public async mounted() {
        try {
            const groupSlug = this.$store.state.route.params.url;
            // if we load from this url instead of passing from parent
            if (!this.pGroup.uuid) {
                // first get group information...
                const groupData = (await GroupService.show(groupSlug, 'noCount')).data;
                // console.log(groupData);
                this.globalGroupId = groupData[0].uuid;
            }
            this.loadThreads();
        } catch (error) {
            // error
        }
    }

    // submit new thread post
    public async submitThread() {
        // console.log(this.threadCategory);
        // for getting only uuid
        const modifyCat = this.threadCategory.substr(0, 36);
        // console.log(modifyCat);
        try {
            const threadObj = {
                groupPageURL: this.$route.params.url,
                groupId: this.globalGroupId,
                groupForumId: this.tgroupForumId,
                groupCategory: modifyCat,
                // threadId: this.threadOP.uuid,
                userId: this.$store.state.user.uuid,
                isPublic: true,
                threadTitle: this.threadTitle,
                threadContent: this.threadContent,
            };
            const response = (await GroupService.createForumThread(threadObj)).data;
            this.showThreadModal = false;
            // console.log(response);
            this.threadTitle = '';
            this.threadContent = '';
            this.threadCategory = '';
            // const pathReload = this.$route.path;
            // this.$router.push(pathReload);
            // now we get data again
            this.loadThreads();
            // console.log(this.$route.path);
        } catch (error) {
            // error
        }
    }

    // function to call for groupthread cat
    public async fetchForumCat(e) {
        try {
            // console.log(e);
            const getData = (await groupService.getGroupForumCategories(e)).data;
            getData.forEach((element) => {
                const sId = element.uuid.toString();
                // console.log(sId);
                const completeValue = sId + element.name;
                this.selectCatOptions.push({ label: element.name, value: completeValue });
                console.log(completeValue);
            });
            // console.log(getData);
        } catch (error) {
            // console.log(error);
        }
    }

    // groupId is actually pageURL, which is the slug name for the forum
    public async loadThreads() {
        try {
            const groupSlug = this.$store.state.route.params.url;
            const response = (await GroupService.ShowGroupForumIndex(groupSlug, this.pagination.pageNumber,
            this.pagination.itemsPerPage)).data;
            console.log(response);
            this.currentThreads = response.result;
            this.pagination.maxPages = response.pages;
            // console.log(response);
            // console.log(this.globalGroupId);
            // TODO: move elsewhere?
            // we can load forum categories here
            this.fetchForumCat(this.globalGroupId);
        } catch (error) {
            // error
            console.log(error);
        }
        // console.log(this.pGroup);
        // console.log(this.$route.params.group);
    }

    public fromNow(e) {
        const fromNow = moment(e).fromNow();
        return fromNow;
    }

    // a is the thread uuid
    public navigateToThread(a, mainThread) {
        // console.log(a);
        this.$router.push({
            name: 'groupForumThread',
            params: {
                uuid: a,
                threadInfo: mainThread,
            },
        });
    }

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }
}
</script>

<style scoped lang="scss">

.threadtitle {

}

.threadtitle:hover {
    cursor: pointer;
    color: rgb(240, 147, 8);
}

.userName {
    font-size: 1.2em;
    color: black;
    font-weight: 500;
}

.userName:hover {
    cursor: pointer;
    color:  rgb(8, 132, 235);;
}

.commentPre-container {
    width: auto;
    height: 52vh;
    overflow-y: scroll;
}

</style>