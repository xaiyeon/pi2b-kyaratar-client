<template>
    <div>
        <q-page>
            <q-toolbar>
                <q-toolbar-title>
                    Group Members
                </q-toolbar-title>
            </q-toolbar>
            <!-- <div class="profiletitle">
                
            </div> -->
            <div class="row">
                <div class="col-lg-12">
                    <div>
                        <q-pagination
                        class="shadow-4"
                        v-model="pagination.pageNumber"
                        color="blue-6"
                        :min="1"
                        :max="pagination.maxPages"
                        :max-pages="10"
                        boundary-links
                        />
                    </div>
                </div>
            </div>
            <div class="row">
                <div v-for="(member, index) in members" :key="index" class="col-* q-pa-lg inline flex wrap">
                    <div class="shadow-5 hvr-sweep-to-top">
                        <div class="niceCard q-pa-md">
                            {{ member.User.displayName }}
                            <br>
                            <img @click="goToUserProfile(member.User.username)" class="itemdisplay imageSize" :src="member.User.profileImageURL" alt="">
                            <br>
                            {{ member.GroupCustomRole.title.charAt(0).toUpperCase() + member.GroupCustomRole.title.slice(1) }}
                        </div>
                    </div>
                </div>
            </div>
        </q-page>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import EasyPanel from './../../../_shared/EasyPanel.vue';
import groupService from '@/_services/groupService.ts';

// use this as copy and paste for making .vue files, change name
@Component({
    components: {
        EasyPanel,
    },
})
export default class GroupMembers extends Vue {
    @Prop({default: () => []})
    public pGroup!: any;

    public members = [];
    public pagination = {
        pageNumber: 1,
        itemsPerPage: 31,
        maxPages: null,
    };

    // not pageURL
    public groupId = '';

    public async mounted() {
        const ThegroupURL = this.$store.state.route.params.url;
        // this.pGroup = this.$route.params.group;
        this.groupId = ThegroupURL;
        console.log(this.pGroup);
        this.loadMembers();
        // console.log(this.$route.params.group);
    }

    public async loadMembers() {
        try {
            // get the members
            const response = (await groupService.DisplayMembers(this.groupId,
                this.pagination.pageNumber, this.pagination.itemsPerPage)).data;
            console.log(response.result);
            this.members = response.result;
            this.pagination.maxPages = response.pages;
        } catch (error) {
            // an error
        }
    }

    public goToUserProfile(id) {
        // console.log(id);
        this.$router.push({
            name: 'viewUser',
            params: {
                username: id.replace(/\s/g, '_'),
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

.imageSize {
    width: 120px;
    height: 120px;
}

.itemdisplay {
    opacity: 1;
}

.itemdisplay:hover {
    cursor: pointer;
    opacity: 0.85;
    -webkit-transition-duration: .3s;
    transition-duration: .3s;
    -webkit-transition-property: opacity;
    transition-property: opacity;
    -webkit-transition-timing-function: ease-in-out;
    transition-timing-function: ease-in-out;    
}

.niceCard {
    text-align: center;
}

</style>