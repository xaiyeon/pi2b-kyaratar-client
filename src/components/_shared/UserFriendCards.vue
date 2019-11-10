<template>
    <div>
        <div>
            <div class="row">
                <template v-if="FriendArray && !noUser">
                    <div class="col" v-for="(x, index) in FriendArray" :key="index">
                        <template v-if="x.User">
                            <q-card inline class="q-ma-sm shadow-5">
                                <q-card-main>
                                    <div>
                                        <div class="row">
                                            <div class="col-3">
                                                <div v-if="isRealUser" class="buttonOptions q-pa-sm">
                                                    <q-btn
                                                    color="amber-9"
                                                    size="xs"
                                                    icon="arrow_drop_down"
                                                    round
                                                    >
                                                    <q-popover>
                                                        <!--
                                                        The DOM element(s) that make up the popup,
                                                        in this case a list:
                                                        -->
                                                        <q-list separator link>
                                                        <!-- notice `v-close-overlay` which closes popover -->
                                                        <q-item v-close-overlay>
                                                            Delete
                                                        </q-item>
                                                        </q-list>
                                                    </q-popover>
                                                    </q-btn>
                                                </div>
                                            </div>
                                            <div class="col-auto">
                                                <div style="cursor: pointer;">
                                                    <div style="text-align: center;">
                                                        <p>{{ x.User.UserRole.title }}</p>
                                                    </div>
                                                    <div>
                                                        <img class="responsive fluid" style="width:5vw; height:4vw" :src="x.User.profileImageURL" alt="">
                                                    </div>                                        
                                                    <div @click="goToUserProfile(x.User.username)">
                                                        <div v-if="x.User.displayName.length > 12">
                                                            <p style="color: black; display: inline;">{{ x.User.displayName.substring(0,9) + '...' }}</p>
                                                        </div>
                                                        <div v-else>
                                                            <p style="color: black; display: inline;">{{ x.User.displayName }}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </q-card-main>
                            </q-card>
                        </template>
                        <template v-if="x.friend">
                            <q-card inline class="q-ma-sm shadow-5">
                                <q-card-main>
                                    <div>
                                        <div class="row">
                                            <div class="col-3">
                                                <div v-if="isRealUser" class="buttonOptions q-pa-sm">
                                                    <q-btn
                                                    color="amber-9"
                                                    size="xs"
                                                    icon="arrow_drop_down"
                                                    round
                                                    >
                                                    <q-popover>
                                                        <!--
                                                        The DOM element(s) that make up the popup,
                                                        in this case a list:
                                                        -->
                                                        <q-list separator link>
                                                        <!-- notice `v-close-overlay` which closes popover -->
                                                        <q-item v-close-overlay>
                                                            Delete
                                                        </q-item>
                                                        </q-list>
                                                    </q-popover>
                                                    </q-btn>
                                                </div>
                                            </div>
                                            <div class="col-auto">
                                                <div style="cursor: pointer;" @click="goToUserProfile(x.friend.username)">
                                                    <div style="text-align: center;">
                                                        <p>{{ x.friend.UserRole.title }}</p>
                                                    </div>
                                                    <div>
                                                        <img class="responsive fluid" style="width:5vw; height:4vw" :src="x.friend.profileImageURL" alt="">
                                                    </div>                                        
                                                    <div>
                                                        <div v-if="x.friend.displayName.length > 12">
                                                            <p style="color: black; display: inline;">{{ x.friend.displayName.substring(0,9) + '...' }}</p>
                                                        </div>
                                                        <div v-else>
                                                            <p style="color: black; display: inline;">{{ x.friend.displayName }}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </q-card-main>
                            </q-card>
                        </template>
                    </div>
                </template>
                <template v-if="FriendArray && noUser">
                    <div class="col" v-for="(x, index) in FriendArray" :key="index">
                        <template v-if="x.User">
                            <q-card inline class="q-ma-sm shadow-5">
                                <q-card-main>
                                    <div>
                                        <div class="row">
                                            <div class="col-3">
                                                <div v-if="isRealUser" class="buttonOptions q-pa-sm">
                                                    <q-btn
                                                    color="amber-9"
                                                    size="xs"
                                                    icon="arrow_drop_down"
                                                    round
                                                    >
                                                    <q-popover>
                                                        <!--
                                                        The DOM element(s) that make up the popup,
                                                        in this case a list:
                                                        -->
                                                        <q-list separator link>
                                                        <!-- notice `v-close-overlay` which closes popover -->
                                                        <q-item v-close-overlay>
                                                            Delete
                                                        </q-item>
                                                        </q-list>
                                                    </q-popover>
                                                    </q-btn>
                                                </div>
                                            </div>
                                            <div class="col-auto">
                                                <div style="cursor: pointer;" @click="goToUserProfile(x.User.username)">
                                                    <div style="text-align: center;">
                                                        <p>{{ x.User.UserRole.title }}</p>
                                                    </div>
                                                    <div>
                                                        <img class="responsive fluid" style="width:5vw; height:4vw" :src="x.User.profileImageURL" alt="">
                                                    </div>                                        
                                                    <div >
                                                        <div v-if="x.User.displayName.length > 12">
                                                            <p style="color: black; display: inline;">{{ x.User.displayName.substring(0,9) + '...' }}</p>
                                                        </div>
                                                        <div v-else>
                                                            <p style="color: black; display: inline;">{{ x.User.displayName }}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </q-card-main>
                            </q-card>
                        </template>
                        <template v-if="x.friend">
                            <q-card inline class="q-ma-sm shadow-5">
                                <q-card-main>
                                    <div>
                                        <div class="row">
                                            <div class="col-3">
                                                <div v-if="isRealUser" class="buttonOptions q-pa-sm">
                                                    <q-btn
                                                    color="amber-9"
                                                    size="xs"
                                                    icon="arrow_drop_down"
                                                    round
                                                    >
                                                    <q-popover>
                                                        <!--
                                                        The DOM element(s) that make up the popup,
                                                        in this case a list:
                                                        -->
                                                        <q-list separator link>
                                                        <!-- notice `v-close-overlay` which closes popover -->
                                                        <q-item v-close-overlay>
                                                            Delete
                                                        </q-item>
                                                        </q-list>
                                                    </q-popover>
                                                    </q-btn>
                                                </div>
                                            </div>
                                            <div class="col-auto">
                                                <div style="cursor: pointer;" @click="goToUserProfile(x.friend.username)">
                                                    <div style="text-align: center;">
                                                        <p>{{ x.friend.UserRole.title }}</p>
                                                    </div>
                                                    <div>
                                                        <img class="responsive fluid" style="width:5vw; height:4vw" :src="x.friend.profileImageURL" alt="">
                                                    </div>                                        
                                                    <div>
                                                        <div v-if="x.friend.displayName.length > 12">
                                                            <p style="color: black; display: inline;">{{ x.friend.displayName.substring(0,9) + '...' }}</p>
                                                        </div>
                                                        <div v-else>
                                                            <p style="color: black; display: inline;">{{ x.friend.displayName }}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </q-card-main>
                            </q-card>
                        </template>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import swal from 'sweetalert2';
import moment from 'moment';
import UserRelationService from '@/_services/userRelationshipService';
import { mapState } from 'vuex';

// use this as copy and paste for making .vue files, change name
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
export default class UserFriendCards extends Vue {
    @Prop({default: { options: Object }})
    public puser!: any;
    // data can just be define here using public
    public currentUser = null;
    public FriendArray = null;
    public isRealUser = false;
    public noUser = false;

    public beforeCreate() {
        // this is for options on user card if logged in
        if (this.$store.state.user.uuid) {
            this.currentUser = this.$store.state.user.uuid;
        } else {
            this.noUser = true;
        }
    }

    // I get the data and then load based!
    public async mounted() {
        // now we check and load
        console.log('mount user card');
        if (this.puser) {
            if (!this.$store.state.isUserLoggedIn) {
                this.noUser = true;
            }
            this.getFriends();
        }
    }

    public async getFriends() {
        try {
            // console.log('helllooo');
            // console.log(this.puser);
            // doesn't show friend if not logged in
            let requestObject = {
                username: this.$route.params.username,
                uuid: this.puser.uuid,
                curUUID: '',
            };
            // if true
            if (this.noUser) {
                // we want to just get for display
                requestObject = {
                    username: this.$route.params.username,
                    uuid: this.puser.uuid,
                    curUUID: 'none',
                };
            } else {
                // console.log('wtffff');
                // console.log(this.noUser);
                requestObject = {
                    username: this.$route.params.username,
                    uuid: this.puser.uuid,
                    curUUID: this.$store.state.user.uuid,
                };
            }
            // console.log(requestObject);
            // receive list based on filtered
            console.log('fetching friends');
            const response = await UserRelationService.getFriends(requestObject).then(( result ) => {
                // console.log(result);
                // console.log(result.data.ExistingRelations);
                // check if real user or not
                if (!this.noUser) {
                    const tempData = result.data.ExistingRelations;
                    let NewUserArray = null;
                    // but what if we not logged in? we filter where same user display on user
                    tempData.forEach((element) => {
                        if (element.User.giverUserId === this.$store.state.user.uuid ||
                            element.User.receiverUserId === this.$store.state.user.uuid ||
                            element.friend.giverUserId === this.$store.state.user.uuid ||
                            element.friend.receiverUserId === this.$store.state.user.uuid
                            ) {
                            // now we know that this is the user viewer their own friend list
                            this.isRealUser = true;
                        }
                        if (element.User.username === this.$route.params.username) {
                            delete element.User;
                        }
                        if (element.friend.username === this.$route.params.username) {
                            delete element.friend;
                        }
                        // if (element.friend.uuid !== this.$store.state.user.uuid) {
                        //     // remove
                        //     delete element.friend;
                        //     // const index = this.RequestData.indexOf(element);
                        //     // this.RequestData.splice(index, 1);
                        // }
                        // if (element.User.uuid !== this.$store.state.user.uuid) {
                        //     // remove
                        //     delete element.User;
                        //     // const index = this.RequestData.indexOf(element);
                        //     // this.RequestData.splice(index, 1);
                        // }
                    });
                    NewUserArray = tempData;
                    // console.log('user friend cards');
                    // console.log('current friends');
                    // console.log(NewUserArray);
                    this.FriendArray = NewUserArray;
                } else {
                    const tempData = result.data.ExistingRelations;
                    let NewUserArray = null;
                    // but what if we not logged in? we filter where same user display on user
                    tempData.forEach((element) => {
                        if (element.User.username === this.$route.params.username) {
                            delete element.User;
                        }
                        if (element.friend.username === this.$route.params.username) {
                            delete element.friend;
                        }
                    });
                    NewUserArray = tempData;
                    console.log('no user ');
                    this.FriendArray = NewUserArray;
                }
            });
        } catch (error) {
            // error
            console.log(error);
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

.buttonOptions {
    z-index: 99999; 
    position: absolute;
}

</style>