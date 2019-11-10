<template>
    <div>
        <div>
            <q-radio v-model="filterName" val="giver" color="black" label="Waiting For A Response" />
            <q-radio v-model="filterName" val="receiver" color="black" label="Pending Your Response" style="margin-left: 10px" />
            <q-radio v-model="filterName" val="pending" color="black" label="All On Pending" style="margin-left: 10px" />
            <br>
            <q-list inset-separator class="q-mt-md">
                <q-item v-for="(users, index) in RequestData" :key="index">
                    <template v-if="users === null || users === undefined || users.length === 0">
                        <p>Nothing</p>
                    </template>
                    <template v-else>
                        <template v-if="users.User">
                            <q-item-side :avatar="users.User.profileImageURL" />
                            <q-item-main :label="users.User.displayName" style="cursor: pointer;" @click.native="goToUserProfile(users.User.username)" />
                            <q-item-side right>
                                <q-btn @click="beFriends(users.uuid)" v-if="filterName === 'receiver'" glossy rounded color="green-5" label="Accept"></q-btn>
                                <q-btn glossy rounded color="red" icon="cancel" @click="severRelationship(users.uuid)" />
                                <!-- <span class="q-ml-sm q-mr-sm"></span>
                                <q-btn flat round dense icon="more_vert">
                                <q-popover>
                                    <q-list link>
                                    <q-item v-close-overlay>
                                        <q-item-main label="Cancel" />
                                    </q-item>
                                    </q-list>
                                </q-popover> 
                                </q-btn> -->
                            </q-item-side>
                        </template>
                        <template v-if="users.friend">
                            <q-item-side :avatar="users.friend.profileImageURL" />
                            <q-item-main :label="users.friend.displayName" style="cursor: pointer;" @click.native="goToUserProfile(users.friend.username)" />
                            <q-item-side right>
                                <q-btn glossy rounded color="red" icon="cancel" @click="severRelationship(users.uuid)" />
                                <span class="q-ml-sm q-mr-sm"></span>
                                <!-- <q-btn flat round dense icon="more_vert">
                                <q-popover>
                                    <q-list link>
                                    <q-item v-close-overlay>
                                        <q-item-main label="Cancel" />
                                    </q-item>
                                    </q-list>
                                </q-popover>
                                </q-btn> -->
                            </q-item-side>
                        </template>
                    </template>
                </q-item>
            </q-list>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import UserRelationService from '@/_services/userRelationshipService';


// use this as copy and paste for making .vue files, change name
@Component({
    // computed
})
export default class SocialRequests extends Vue {
    // data can just be define here using public
    public RequestData = null;
    // we have a filter
    // public selectedFilter = null;
    public filterName = 'giver';

    @Watch('filterName', { immediate: true })
    public onChangeFilter(value: any) {
        const temp = this.loadRequests();
        this.RequestData = temp;
    }

// get data related to receiver or giver
    public async mounted() {
        // call the function
        this.loadRequests();
    }

    public async beFriends(relationUuid) {
        try {
            const obj = {
                receiverUUID: this.$store.state.user.uuid,
                friendState: 'accept',
                ruuid: relationUuid,
            };
            const respnse = (await UserRelationService.requestFriend(obj)).data;
            console.log(respnse);
            this.loadRequests();
        } catch (error) {
            // error
        }
    }

    public async severRelationship(theUUID) {
        try {
            const response = (await UserRelationService.deleteRelationship(theUUID)).data;
            // console.log(response);
            this.loadRequests();
        } catch (error) {
            // an error
        }
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
            const response = (await UserRelationService.fetchRequests(requestObject)).data;
            this.RequestData = response.ExistingRelations;
            this.RequestData.forEach((element) => {
                // if (element.)
            });
            console.log(response.ExistingRelations);
        } catch (error) {
            // error
            // console.log(error);
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