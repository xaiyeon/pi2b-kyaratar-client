<template>
    <div>
        <template v-if="serviceOkay">
            <div v-if="GroupData">
                <q-layout>
                    <q-layout-header>
                        <q-toolbar color="tertiary">
                            <div class="row inline flex-center">
                                <div class="col-auto">
                                    <q-toolbar-title class="q-headline q-pa-md">
                                        <span style="font-size: 1.3em; font-weight: 500;">{{ GroupData.name }}</span> <br>
                                        <q-chip>Group</q-chip>
                                        <q-chip color="black" color-text="white">{{ GroupData.type.replace(/\w/, c => c.toUpperCase()) }}</q-chip>
                                    </q-toolbar-title>
                                </div>
                                <div class="col-auto">
                                    <div style="padding-right: 1.04em">
                                        <q-chip>{{GroupData.viewCount}} Views</q-chip>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div>
                                        Create Date: {{ createdAtDateFix }}
                                        <br>
                                        Current Leader: {{ GroupData.leader.username }}
                                        <br>
                                        # of Members: <b>{{ NumberOfMembers }}</b>
                                    </div>
                                </div>
                                <div class="col-auto q-pa-md">
                                    <q-btn
                                        text-color="black"
                                        :glossy="true"
                                        color="amber"
                                        @click="showLeft = !showLeft"
                                        icon="menu"
                                        label="Menu"
                                    />
                                    <q-btn
                                        v-if="GroupData.fk_userId !== this.$store.state.user.uuid && !isInGroup"
                                        text-color="white"
                                        :glossy="true"
                                        color="green"
                                        @click="joinGroup"
                                        icon="person_add"
                                        label="Join"
                                    />
                                    <q-btn
                                        v-if="GroupData.fk_userId !== this.$store.state.user.uuid && isInGroup"
                                        text-color="white"
                                        :glossy="true"
                                        color="red"
                                        @click="leaveGroup(GroupData.uuid)"
                                        icon="delete"
                                        label="Leave"
                                    />
                                    <q-btn
                                        text-color="white"
                                        :glossy="true"
                                        color="blue"
                                        icon="notifications"
                                        label="Follow"
                                    />
                                    <q-btn
                                        v-if="isInGroup && GroupData.fk_userId === this.$store.state.user.uuid"
                                        text-color="white"
                                        :glossy="true"
                                        color="purple"
                                        @click="editGroup"
                                        icon="edit"
                                        label="Edit"
                                    />
                                </div>
                            </div>
                        </q-toolbar>
                    </q-layout-header>
                    <q-page-container>
                        <q-page>
                            <q-layout>
                                <!-- Left Side Drawer, Only show certain things unless logged in user is part of the group -->
                                <q-layout-drawer side="left" v-model="showLeft">
                                    <q-list no-border link inset-separator>
                                    <q-list-header>Group Menu</q-list-header>
                                    <q-item @click.native="navigateToSub('Overview', GroupData.uuid, GroupData.pageURL)">
                                        <q-item-side icon="language" />
                                        <q-item-main label="Overview" sublabel="Group Statistics" />
                                    </q-item>
                                    <q-item @click.native="navigateToSub('Members', GroupData.uuid, GroupData.pageURL)">
                                        <q-item-side icon="people" />
                                        <q-item-main label="Members" sublabel="" />
                                    </q-item>
                                    <q-item v-if="isInGroup" @click.native="navigateToSub('Activity', GroupData.uuid, GroupData.pageURL)">
                                        <q-item-side icon="event" />
                                        <q-item-main label="Activity" sublabel="Member Activity" />
                                    </q-item>
                                    <q-item v-if="isInGroup" @click.native="navigateToSub('Forum', GroupData.uuid, GroupData.pageURL)">
                                        <q-item-side icon="forum" />
                                        <q-item-main label="Forum" sublabel="" />
                                    </q-item>
                                    <q-item v-if="isInGroup" @click.native="navigateToSub('Collections', GroupData.uuid, GroupData.pageURL)">
                                        <q-item-side icon="apps" />
                                        <q-item-main label="Collections" sublabel="" />
                                    </q-item>
                                    <q-item v-if="isInGroup" @click.native="navigateToSub('Photos', GroupData.uuid, GroupData.pageURL)">
                                        <q-item-side icon="photo" />
                                        <q-item-main label="Photos" sublabel="" />
                                    </q-item>
                                    <q-item v-if="isInGroup" @click.native="navigateToSub('Videos', GroupData.uuid, GroupData.pageURL)">
                                        <q-item-side icon="movie" />
                                        <q-item-main label="Videos" sublabel="" />
                                    </q-item>
                                    <q-item @click.native="navigateToSub('Rules', GroupData.uuid, GroupData.pageURL)">
                                        <q-item-side icon="live_help" />
                                        <q-item-main label="Group Rules" sublabel="Please Read" />
                                    </q-item>
                                    <hr>
                                    <template v-if="isInGroup">
                                        <q-list-header>Admin Menu</q-list-header>
                                    </template>
                                    </q-list>
                                </q-layout-drawer>
                                <q-page-container>
                                    <q-page>
                                        <div class="row">
                                            <div class="col-4">
                                                <div class="q-pa-lg">
                                                    <b>Alternate Name:</b> {{ GroupData.altName }}
                                                    <hr>
                                                    <br>
                                                    <img class="responsive fluid" :src="GroupData.imageURL" :alt="GroupData.imageURL">
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="q-pa-lg">
                                                    <span style="font-size: 1.2em; font-weight: 500;">About</span>
                                                    <div class="about-container">
                                                        <div v-html="GroupData.about">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <router-view :key="$route.fullPath" />
                                        </div>
                                    </q-page>
                                </q-page-container>
                            </q-layout>
                        </q-page>
                    </q-page-container>
                </q-layout>
            </div>
        </template>
        <template v-else>
            <not-registered/>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import GroupService from '@/_services/groupService';
import moment from 'moment';
import { mapState } from 'vuex';

@Component({
    components: {
        // a
    },
    computed: {
        ...mapState([
            'isUserLoggedIn',
            'user',
        ]),
    },
})
export default class ViewGroup extends Vue {
    public GroupData = null;
    public isInGroup = false;
    public createdAtDateFix;
    public serviceOkay = false;
    public showLeft = false;

    public GroupUser = null;
    public NumberOfMembers = 0;

    public editGroup() {
        console.log('edit group');
            this.$router.push({
                name: 'edit-group',
                params: {
                    url: this.$store.state.route.params.url,
                    group: this.GroupData,
                },
            });
    }

    public async leaveGroup(groupUUID) {
        console.log('leaving group...');
        try {
            const dataResp = (await GroupService.leave(groupUUID)).data;
            console.log(dataResp);
            this.reloadEverythingImportant('noCount');
            await this.checkInGroup();
        } catch (error) {
            // an error
        }
    }

    public async joinGroup() {
        console.log('join group');
        try {
            const ThegroupSlug = this.$store.state.route.params.url;
            const dataResponse = (await GroupService.join(ThegroupSlug)).data;
            this.reloadEverythingImportant('noCount');
            await this.checkInGroup();
        } catch (error) {
            console.log(error);
        }
    }

    // check in group first
    public async checkInGroup() {
        try {
            const ThegroupSlug = this.$store.state.route.params.url;
            if (this.$store.state.isUserLoggedIn) {
                const response = (await GroupService.checkBelongGroup(ThegroupSlug, 'nothing')).data;
                // console.log(response);
                this.isInGroup = response.doesUserBelong;
            }
        } catch (error) {
            // an error
        }
    }

    public async mounted() {
        try {
            await this.checkInGroup();
        } catch (error) {
            // an error
        }
    }

    public async beforeCreate() {
        // first check
        try {
            const ThegroupSlug = this.$store.state.route.params.url;
            const response = (await GroupService.show(ThegroupSlug, 'addCount')).data[0];
            this.$store.state.route.params.pGroup = response;
            // console.log(`in viewgroup ${this.$store.state.route.params.pGroup}`);
            this.GroupData = response;
            // see: https://momentjs.com/docs/#/displaying/format/
            this.createdAtDateFix = response.createdAt.toString().slice(0, 10);
            this.createdAtDateFix = moment(this.createdAtDateFix, ['MM-DD-YYYY', 'YYYY-MM-DD']).format('MMMM Do YYYY');
            this.serviceOkay = true;
            // console.log(response);
        } catch (error) {
            // error
            console.log(error);
        }
        // we need to use the uuid
        try {
            const TheGroupUUID = this.GroupData.uuid;
            const countNumber = (await GroupService.CountUsersInGroup(TheGroupUUID)).data;
            this.NumberOfMembers = countNumber.memberCount;
            // console.log(countNumber);
        } catch (errorc) {
            // error
        }
    }

    public async reloadEverythingImportant(sstring: string) {
        // next
        try {
            const ThegroupSlug = this.$store.state.route.params.url;
            const response = (await GroupService.show(ThegroupSlug, sstring)).data[0];
            this.$store.state.route.params.pGroup = response;
            // console.log(`in viewgroup ${this.$store.state.route.params.pGroup}`);
            this.GroupData = response;
            // see: https://momentjs.com/docs/#/displaying/format/
            this.createdAtDateFix = response.createdAt.toString().slice(0, 10);
            this.createdAtDateFix = moment(this.createdAtDateFix, ['MM-DD-YYYY', 'YYYY-MM-DD']).format('MMMM Do YYYY');
            this.serviceOkay = true;
            // console.log(response);
        } catch (error) {
            // error
            console.log(error);
        }
        // we need to use the uuid
        try {
            const TheGroupUUID = this.GroupData.uuid;
            const countNumber = (await GroupService.CountUsersInGroup(TheGroupUUID)).data;
            this.NumberOfMembers = countNumber.memberCount;
            // console.log(countNumber);
        } catch (errorc) {
            // error
        }
    }

    public navigateToSub(e, id, slug, data) {
        if (e === 'Overview') {
            this.$router.push({
                name: 'overview',
                params: {
                    groupId: id,
                    url: slug,
                    pGroup: this.$store.state.route.params.pGroup,
                },
            });
        }
        if (e === 'Members') {
            this.$router.push({
                name: 'members',
                params: {
                    groupId: id,
                    url: slug,
                },
            });
        }
        if (e === 'Activity') {
            this.$router.push({
                name: 'activity',
                params: {
                    groupId: id,
                    url: slug,
                },
            });
        }
        if (e === 'Forum') {
            this.$router.push({
                name: 'forum',
                params: {
                    groupId: id,
                    url: slug,
                    pGroup: this.GroupData,
                },
            });
        }
        if (e === 'Collections') {
            this.$router.push({
                name: 'collections',
                params: {
                    groupId: id,
                    url: slug,
                },
            });
        }
        if (e === 'Photos') {
            this.$router.push({
                name: 'photos',
                params: {
                    groupId: id,
                    url: slug,
                },
            });
        }
        if (e === 'Videos') {
            this.$router.push({
                name: 'videos',
                params: {
                    groupId: id,
                    url: slug,
                },
            });
        }
        if (e === 'Rules') {
            this.$router.push({
                name: 'rules',
                params: {
                    groupId: id,
                    url: slug,
                },
            });
        }
    }

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }
}
</script>

<style scoped lang="scss">

.about-container {
    width: auto;
    height: 380px;
    overflow-y: scroll;
}

</style>