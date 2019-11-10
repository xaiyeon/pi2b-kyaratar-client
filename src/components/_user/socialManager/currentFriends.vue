<template>
    <div>
        <div>
            <!-- <q-radio v-model="filterName" val="giver" color="black" label="Waiting For Other User Response" />
            <q-radio v-model="filterName" val="receiver" color="black" label="Pending Your Action" style="margin-left: 10px" />
            <q-radio v-model="filterName" val="pending" color="black" label="All On Pending" style="margin-left: 10px" />
            <br> -->
            <template v-if="RequestData">
                <q-list inset-separator class="q-mt-md">
                    <q-item v-for="(friend, index) in RequestData" :key="index">
                        <template v-if="friend.User">
                            <q-item-side :avatar="friend.User.profileImageURL" />
                            <q-item-main :label="friend.User.displayName" style="cursor: pointer;" @click.native="goToUserProfile(friend.User.username)" />
                            <q-item-side right>
                                <q-btn glossy rounded color="tertiary" icon="chat" />
                                <span class="q-ml-sm q-mr-sm"></span>
                                <q-btn flat round dense icon="more_vert">
                                <q-popover>
                                    <q-list link>
                                    <q-item v-close-overlay>
                                        <q-item-main label="Ignore" />
                                    </q-item>
                                    <q-item v-close-overlay>
                                        <q-item-main label="Block" />
                                    </q-item>
                                    <q-item @click.native="deleteFriend(friend.uuid, friend.User.displayName)" v-close-overlay>
                                        <q-item-main label="Unfriend" />
                                    </q-item>
                                    </q-list>
                                </q-popover>
                                </q-btn>
                            </q-item-side>
                        </template>
                        <template v-if="friend.friend">
                            <q-item-side :avatar="friend.friend.profileImageURL" />
                            <q-item-main :label="friend.friend.displayName" style="cursor: pointer;" @click.native="goToUserProfile(friend.friend.username)" />
                            <q-item-side right>
                                <q-btn glossy rounded color="tertiary" icon="chat" />
                                <span class="q-ml-sm q-mr-sm"></span>
                                <q-btn flat round dense icon="more_vert">
                                <q-popover>
                                    <q-list link>
                                    <q-item v-close-overlay>
                                        <q-item-main label="Ignore" />
                                    </q-item>
                                    <q-item v-close-overlay>
                                        <q-item-main label="Block" />
                                    </q-item>
                                    <q-item @click.native="deleteFriend(friend.uuid, friend.friend.displayName)" v-close-overlay>
                                        <q-item-main label="Unfriend"/>
                                    </q-item>
                                    </q-list>
                                </q-popover>
                                </q-btn>
                            </q-item-side>
                        </template>
                    </q-item>
                </q-list>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import UserRelationService from '@/_services/userRelationshipService';
import swal from 'sweetalert2';

// use this as copy and paste for making .vue files, change name
@Component
export default class CurrentFriends extends Vue {
    // data can just be define here using public
    public RequestData = null;
    // we have a filter
    // public selectedFilter = null;
    public filterName = 'none';

    // @Watch('filterName', { immediate: true })
    // public onChangeFilter(value: any) {
    //     const temp = this.loadRequests();
    //     this.RequestData = temp[0];
    // }

// get data with status friends and isFriends
    public async mounted() {
        // call the function
        this.loadRequests();
    }

    public async loadRequests() {
        // gets called if value of filter changes
        try {
            const requestObject = {
                username: this.$store.state.user.username,
                uuid: this.$store.state.user.uuid,
                filter: this.filterName,
            };
            // receive list based on filtered
            const response = await UserRelationService.getFriends(requestObject).then(( result ) => {
                console.log(result.data.ExistingRelations);
                const tempData = result.data.ExistingRelations;
                let NewUserArray = null;
                tempData.forEach((element) => {
                    if (element.User.uuid === this.$store.state.user.uuid) {
                        // remove
                        delete element.User;
                        // const index = this.RequestData.indexOf(element);
                        // this.RequestData.splice(index, 1);
                    }
                    if (element.friend.uuid === this.$store.state.user.uuid) {
                        // remove
                        delete element.friend;
                        // const index = this.RequestData.indexOf(element);
                        // this.RequestData.splice(index, 1);
                    }
                });
                NewUserArray = tempData;
                console.log('current friends');
                console.log(NewUserArray);
                this.RequestData = NewUserArray;
            });
        } catch (error) {
            // error
            // console.log(error);
        }
    }

    // unfriend delete
    public async deleteFriend(uuid, name) {
        try {
            // based on uuid of userReltation key
            const response = await UserRelationService.deleteRelationship(uuid).then(() => {
                const toast = (swal as any).mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                });
                toast({
                type: 'success',
                title: `Friend, ${name}, deleted!`,
                });
                this.loadRequests();
            });
            // console.log(response);
        } catch (error) {
            // error
        }
    }

    public goToUserProfile(usernamex) {
        // console.log(id);
        this.$router.push({
            name: 'viewUser',
            params: {
                username: usernamex.replace(/\s/g, '_'),
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

</style>