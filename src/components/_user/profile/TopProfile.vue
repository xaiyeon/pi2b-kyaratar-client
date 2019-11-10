<template>
    <div>
        <div class="row">
            <div class="col-md-4 profilex">
                <div class="row profilex">
                    <div class="col">
                        <div class="text-white text-center ">
                            <template v-if="puser[0].profileImageURL === '' || puser[0].profileImageURL === null">
                                <img class="responsive imageprof" src="@/assets/images/placeholder/default_profile_img.png" alt="">
                            </template>
                            <template v-else>
                                <img class="responsive imageprof" :src="puser[0].profileImageURL" alt="">
                            </template>
                        </div>
                    </div>
                    <div class="col text-white">
                        <span><p class="profiletitle">{{ puser[0].displayName }}'s Profile</p></span>
                        <p v-if="puser[0].createdAt">Join date: {{ cjoinDate }}</p>
                        <p v-if="puser[0].lastOnlineDate">Last on: {{ clastOnlineDate }}</p>
                        <p v-else>This needs to re-login to see a change</p>
                    </div>
                </div>
                <div class="q-pa-md">
                    <q-toolbar>
                        <template v-if="isMyFriend">
                            <q-btn flat color="green" icon="check_box" />
                            <q-tooltip anchor="bottom middle" self="top middle">
                                You are friends!
                            </q-tooltip>
                        </template>
                        <template v-else-if="isStillPending">
                            <q-btn flat dense label="Pending"></q-btn>
                        </template>
                        <template v-else>
                            <q-item v-if="!isMyFriend && isUserLoggedIn && !isRealUser && this.$store.state.user.uuid !== this.$route.params.username">
                                <q-btn color="green" icon="person_add" @click="requestFriend(puser[0].uuid, puser[0].username)" />
                            </q-item>
                        </template>
                        <template v-if="hasOnePage">
                            <q-item>
                                <q-btn color="blue-4" icon="web" @click="goToOnePage(puser[0].username)" />
                                <q-tooltip anchor="bottom middle" self="top middle">
                                    View OnePage
                                </q-tooltip>
                            </q-item>                            
                        </template>
                        <q-item v-if="isUserLoggedIn && !isRealUser">
                            <q-btn color="tertiary" icon="chat" />
                        </q-item>
                        <q-item v-if="isUserLoggedIn && isRealUser">
                            <q-btn color="purple" icon="edit" @click="navigateToEdit" />
                            <q-tooltip anchor="bottom middle" self="top middle">
                                Edit Your Profile
                            </q-tooltip>
                        </q-item>
                        <q-toolbar-title>
                        </q-toolbar-title>
                        <q-item v-if="isUserLoggedIn && !isRealUser">
                            <q-btn flat push icon="more_vert"></q-btn>
                                <q-popover
                                >
                                    <q-list link style="min-width: 100px">
                                    <q-item
                                    >
                                        <q-item-main label="Block" />
                                    </q-item>
                                    <q-item
                                    >
                                        <q-item-main label="Report" />
                                    </q-item>
                                    </q-list>
                                </q-popover>
                        </q-item>
                    </q-toolbar>
                </div>
            </div>
            <div class="col-md-8">
                <template v-if="puser[0].bannerImageURL === '' || puser[0].bannerImageURL === null">
                    <q-parallax :src="require('@/assets/images/placeholder/default_banner_img.jpg')">
                    <!-- Dom elements to display while loading image -->
                        <div slot="loading">Loading...</div>
                    <!--
                        The rest of Dom elements get displayed on
                        top of the Parallax image after it's loaded
                    -->
                    </q-parallax>
                </template>
                <template v-else>
                    <q-parallax :src="puser[0].bannerImageURL">
                    <!-- Dom elements to display while loading image -->
                        <div slot="loading">Loading...</div>
                    <!--
                        The rest of Dom elements get displayed on
                        top of the Parallax image after it's loaded
                    -->
                    </q-parallax>                    
                </template>
                <div class="badgeandmore">
                    <q-chip v-if="puser[0].isVerified" icon="verified_user" square color="blue">Verified</q-chip>
                    <q-chip icon="person_outline" square color="tertiary">{{ puser[0].UserRole.title }}</q-chip>
                    <q-chip v-if="puser[0].isPartner" icon="fa fa-handshake" square color="amber-10">Partner</q-chip>
                    <q-chip v-if="puser[0].isHelper"  icon="fa fa-info-circle" square color="cyan">Helper</q-chip>
                    <q-chip v-if="puser[0].isDonator" icon="fa fa-heart" square class="donatorflare">Donator</q-chip>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import moment from 'moment';
import { mapState } from 'vuex';
import UserRelationshipService from '@/_services/userRelationshipService';
import swal from 'sweetalert2';
import UserService from '@/_services/userService';
import user from '@/_router/user';

// use this as copy and paste for making .vue files, change name
@Component({
    computed: {
        ...mapState([
            'isUserLoggedIn',
            'user',
        ]),
    },
})
export default class TopProfile extends Vue {
    @Prop({default: { options: Object }})
    public puser!: any;
    public isRealUser = false;
    public tempError = '';
    public tempMessage = '';
    public isMyFriend = false;
    public isStillPending = false;
    public tUsername = '';
    public hasOnePage = false;

    public dbg = '@/assets/images/placeholder/default_banner_img.jpg';

    public joinDate = this.puser[0].createdAt.toString().slice(0, 10);
    // see: https://momentjs.com/docs/#/displaying/format/
    public cjoinDate = moment(this.joinDate, ['MM-DD-YYYY', 'YYYY-MM-DD']).format('MMMM Do YYYY');
    // last online
    public lastOnlineDate = this.puser[0].lastOnlineDate.toString().slice(0, 10);
    public clastOnlineDate = moment(this.lastOnlineDate, ['MM-DD-YYYY', 'YYYY-MM-DD']).format('MMMM Do YYYY');

    @Watch('isMyFriend', { immediate: true })
    public onChangeFriend(value: any) {
        this.isMyFriend = value;
    }

    public async mounted() {
        this.tUsername = this.$route.params.username;
        this.checkHasOnePage();
        if (this.$store.state.user.uuid === this.puser[0].uuid) {
            this.isRealUser = true;
        }
        if (this.$store.state.isUserLoggedIn) {
            // now we can check for friend
            this.friendCheck();
        }
    }

    public async checkHasOnePage() {
        try {
            // checking for onepage
            const userMatch = {
                isLoggedIn: false,
            };
            const response = (await UserService.showPage(this.tUsername, userMatch)).data;
            if (response.uuid !== null || response.uuid !== '' || response.uuid !== undefined) {
                this.hasOnePage = true;
            }
        } catch (error) {
            // an error
        }
    }

    public async friendCheck() {
        try {
            const object = {
                otherUUID: this.puser[0].uuid,
            };
            console.log(this.puser[0].uuid);
            const response = (await UserRelationshipService.checkIfFriend(object)).data;
            // console.log(response);
            this.isMyFriend = response.isFriend;
            if (response.isPending) {
                this.isStillPending = response.isPending;
                console.log(this.isStillPending);
            }
            console.log(this.isMyFriend);
        } catch (error) {
            // error
            // console.log(error);
        }
    }

    public navigateToEdit() {
        this.$router.push({
            name: 'user-edit-profile',
            params: {
                username: this.$store.state.user.username,
            },
        });
    }

    public goToOnePage(e) {
        this.$router.push({
            name: 'user-page',
            params: {
                username: e,
            },
        });
    }

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }

    private async requestFriend(uuid, username) {
        if (this.$store.state.user !== null) {
            try {
                const UserObjects = {
                    receiverUUID: uuid,
                    receiverUsername: username,
                    giverUUID: this.$store.state.user.uuid,
                };
                const dataRespone = (await UserRelationshipService.requestFriend(UserObjects)).data;
                this.tempMessage = dataRespone.message;
                swal({
                position: 'center',
                type: 'info',
                title: 'Look Master!',
                text: this.tempMessage,
                showConfirmButton: false,
                timer: 3000,
                });
                this.friendCheck();
                // console.log(dataRespone);
                // console.log(dataRespone);
                // console.log(dataRespone.message);
                // console.log(dataRespone.message.receiverUUID);
            } catch (error) {
                // lol
                swal({
                position: 'center',
                type: 'info',
                title: 'Look Master!',
                text: this.tempError,
                showConfirmButton: false,
                timer: 3000,
                });
                console.log(error);
            }
        }
    }

}
</script>

<style scoped lang="scss">

.userimage{

}

.imageprof {
    width: 200px;
}

.profilex {
    background: rgba(0,0,0,0.8);
}

.badgeandmore {
    background: rgba(0,0,0,0.8);
}

.donatorflare {
    font-weight: bold;
    color: rgb(104, 17, 17);
    animation: donatorAnimation 5s infinite;
}

@keyframes donatorAnimation {
  0% {
    background: linear-gradient(-90deg, rgb(66, 156, 230), rgb(54, 224, 91));
    transition: 0.4s ease;
  }
  25% {
    background: linear-gradient(-120deg, rgb(101, 173, 255), rgb(142, 255, 90));
    transition: 0.4s ease;
  }
  50% {
    background: linear-gradient(-180deg, rgb(66, 225, 230), rgb(175, 236, 33));
    transition: 0.4s ease;
  }
  75% {
    background: linear-gradient(-120deg, rgb(101, 173, 255), rgb(142, 255, 90));
    transition: 0.4s ease;
  }
  100% {
    background: linear-gradient(-90deg, rgb(66, 156, 230), rgb(54, 224, 91));
    transition: 0.4s ease;
  }
}

</style>