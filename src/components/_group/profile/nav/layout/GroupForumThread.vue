<template>
    <div>
        <div class="q-pa-lg">
            <template v-if="threadOP">
                <div class="row">
                    <div class="col-lg-12">
                        <p>Thread: </p>
                        <p class="viewthreadTitle">{{ threadOP.title }} <span><br>Posted by: {{ threadOP.User.displayName }}</span></p>
                            <div style="float:right;" class="col-auto inline flex">
                                <q-chip style="margin-top: 1.08em" class="q-pa-sm" flat dense icon="book" color="tertiary">
                                {{ threadOP.GroupForumCategory.name }}
                                </q-chip>
                                <p class="q-pr-md"></p>
                                <q-chip style="margin-top: 1.08em" class="q-pa-sm" flat dense icon="remove_red_eye" color="primary">
                                {{ threadOP.viewCount }} Views
                                </q-chip>
                                <p class="q-pr-md"></p>
                                <q-chip style="margin-top: 1.08em" class="q-pa-sm" flat dense icon="chat" color="primary">
                                {{ commentCount }} Comments
                                </q-chip>
                            </div>
                        <q-collapsible :opened="a = true" class="shadow-3" icon="view_headline" sublabel="OP" label="View Topic">
                            <div class="shadow-5 q-pa-md">
                                <div style="overflow:hidden;" v-html="threadOP.text">
                                </div>
                            </div>
                        </q-collapsible>                        
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <br>
                        <p>Comments: </p>
                        <q-btn label="Comment" color="tertiary" @click.native="showCommentModal = true"></q-btn>
                    </div>
                </div>
                <div class="row flex">
                    <div class="col-lg-12">
                        <template v-if="comments.length > 0">
                            <br>
                            <q-pagination
                            v-model="pagination.pageNumber"
                            color="purple"
                            :min="1"
                            :max="pagination.maxPages"
                            :max-pages="8"
                            boundary-links
                            />
                            <div v-for="(comment, index) in comments" :key="index">
                                <div class="shadow-8">
                                    <div class="q-pa-lg q-ma-lg">
                                        <div class="row">
                                            <div class="col-lg-auto">
                                                <template v-if="comment.User.profileImageURL === '' || comment.User.profileImageURL === null">
                                                    <img class="responsive imageprof" src="@/assets/images/placeholder/default_profile_img.png" alt="">
                                                    <br>
                                                    <span class="userName" @click="navigateToUser(comment.User.username)">{{ comment.User.displayName }}</span>
                                                    <br>
                                                    <span>Posted: {{ fromNow(comment.createdAt) }}</span>
                                                </template>
                                                <template v-else>
                                                    <img class="responsive imageprof" :src="comment.User.profileImageURL" alt="">
                                                    <br>
                                                    <span class="userName" @click="navigateToUser(comment.User.username)">{{ comment.User.displayName }}</span>
                                                    <br>
                                                    <span>Posted: {{ fromNow(comment.createdAt) }}</span>
                                                </template>
                                            </div>
                                            <div class="col-lg-8 q-pa-md">
                                                <div class="row">
                                                    <div class="col-lg-12">
                                                        <div class="">
                                                            <div v-html="comment.text">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br>
                                                <div class="row">
                                                    <div style="float:left" class="col-lg-12">
                                                        <div style="float:left">
                                                            <q-btn label="Reply"></q-btn>
                                                            <q-btn icon="thumb_up"></q-btn>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <q-pagination
                            v-model="pagination.pageNumber"
                            color="purple"
                            :min="1"
                            :max="pagination.maxPages"
                            :max-pages="8"
                            boundary-links
                            />
                            <q-modal leave-class="pulse" position="bottom" no-backdrop-dismiss="false" v-model="showCommentModal">
                            <div style="padding: 50px; display: inline-block; width:94vw">
                                <div class="q-display-1 q-mb-md">Comment</div>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="q-ma-sm">
                                            <p>Your Comment:</p>
                                            <vue-editor v-model="commentContent"></vue-editor>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="q-ma-sm ">
                                            <p>Preview:</p>
                                            <div class="commentPre-container">
                                                <div v-html="commentContent">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <q-btn color="tertiary" @click="submitComment" label="Submit" />
                                <q-btn style="margin-left: 1.1em" color="tertiary" @click="showCommentModal = false" label="Close" />
                            </div>
                            </q-modal>
                        </template>
                        <template v-else>
                            <br>
                            <p>There are no comments yet.</p>
                            <q-modal leave-class="pulse" position="bottom" :no-backdrop-dismiss="z = false" v-model="showCommentModal">
                            <div style="padding: 50px; display: inline-block; width:94vw">
                                <div class="q-display-1 q-mb-md">Comment</div>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="q-ma-sm">
                                            <p>Your Comment:</p>
                                            <vue-editor v-model="commentContent"></vue-editor>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="q-ma-sm ">
                                            <p>Preview:</p>
                                            <div class="commentPre-container">
                                                <div v-html="commentContent">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <q-btn color="tertiary" @click="submitComment" label="Submit" />
                                <q-btn style="margin-left: 1.1em" color="tertiary" @click="showCommentModal = false" label="Close" />
                            </div>
                            </q-modal>
                        </template>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import GroupService from '@/_services/groupService';
import moment from 'moment';
import { VueEditor } from 'vue2-editor';

// use this as copy and paste for making .vue files, change name
@Component({
    components: {
        VueEditor,
    },
})
export default class GroupForumThread extends Vue {
    @Prop({default: () => []})
    public threadInfo!: any;
    // store relevant information
    public threadOP = null;
    public comments = [];

    // comment pagination, default
    public pagination = {
        pageNumber: 1,
        itemsPerPage: 10,
        maxPages: null,
    };
    public commentCount = null;
    // for comment modal
    public showCommentModal = false;
    public commentContent = '';

    @Watch('pagination.pageNumber', { immediate: true })
    public onChangePage(value: any) {
        this.pagination.pageNumber = value;
        // console.log(this.pagination);
        // console.log(this.pagination.pageNumber);
        this.getComments();
    }

    @Watch('commentContent', { immediate: true, deep: true })
    public onChangeComment(value: any, oldVal: any) {
        // console.log('typing');
        this.commentContent = value;
    }

    // submit comment
    public async submitComment() {
        try {
            const commentObj = {
                groupPageURL: this.$route.params.url,
                groupId: this.threadOP.fk_groupId,
                groupForumId: this.threadOP.fk_groupForumId,
                threadId: this.threadOP.uuid,
                userId: this.$store.state.user.uuid,
                comment: this.commentContent,
            };
            const response = (await GroupService.createGroupForumThreadComment(commentObj)).data;
            this.showCommentModal = false;
            // console.log(response);
            this.commentContent = '';
            // const pathReload = this.$route.path;
            // this.$router.push(pathReload);
            // load comments again
            this.getComments();

            // console.log(this.$route.path);
        } catch (error) {
            // error
        }
    }

    // load the thread and such based on uuid
    public async mounted() {
        try {
            // don't forget to send the groupUUID as well
            // console.log('getting the entire thread');
            // console.log(this.$route.params.url);
            // console.log(this.$route.params.uuid);
            // we will pass the URL of unique, pageURL as groupUUID
            const sendObj = {
                groupUUID: this.$route.params.url,
                threadUUID: this.$route.params.uuid,
            };
            // first is threadUID and then pageURL
            const response = (await GroupService.getGroupForumThreadEntire(
            this.$route.params.uuid, this.$route.params.url)).data;
            this.threadOP = response;
            // console.log(response);
            // when first loading comments
            // first is threadUID and then pageURL
            this.pagination = {
                pageNumber: 1,
                itemsPerPage: 10,
                maxPages: null,
            };
            this.getComments();
        } catch (error) {
            // error
        }
    }

    public async getComments() {
        try {
            const response = (await GroupService.getGroupForumThreadComments(
            this.$route.params.uuid, this.$route.params.url, this.pagination.pageNumber,
            this.pagination.itemsPerPage)).data;
            this.comments = response.result;
            this.pagination.maxPages = response.pages;
            this.commentCount = response.count;
            // console.log(response[0]);
        } catch (error) {
            // error
        }
    }

    public navigateToUser(e) {
        this.$router.push({
            name: 'viewUser',
            params: {
                username: e.replace(/\s/g, '_'),
            },
        });
    }

    public fromNow(e) {
        const fromNow = moment(e).fromNow();
        return fromNow;
    }

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }
}
</script>

<style scoped lang="scss">

.imageprof {
    width: 128px;
    height: 128px;
}

.viewthreadTitle {
    font-size: 1.1em;
    font-weight: 500;
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