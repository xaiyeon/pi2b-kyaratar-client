<template>
    <div>
        <q-page>
            <q-layout>
                <div class="row">
                    <div class="col-lg-4">
                        <div class="q-pa-lg">
                            <span style="font-size: 1.3em; font-weight: bold"> User Settings</span>
                            <br>
                            Welcome {{ $store.state.user.username }} ({{ $store.state.user.displayName }})
                            <br>
                            <br>
                            <template v-if="dummyUserInfo">
                                <div class="q-pa-md shadow-6">
                                    <div class="Asubheading">
                                        User Info
                                    </div>
                                    <div>
                                        <span class="q-ma-sm">
                                            <span class="Aminiheading">User Role: </span>{{ userData.UserRole.title }}
                                        </span>
                                        <br>
                                        <span class="q-ma-sm">
                                            <span class="Aminiheading">User Standing: </span>{{ dummyUserInfo.status }}
                                        </span>
                                        <br>
                                        <span class="q-ma-sm">
                                            <span class="Aminiheading">Birth Date: </span>{{ dummyUserInfo.birthDate }}
                                        </span>
                                        <br>
                                        <span class="q-ma-sm">
                                            <span class="Aminiheading">Member Since: </span>{{ dummyUserInfo.createdAt }}
                                        </span>
                                        <br>
                                        <span class="q-ma-sm">
                                            <span class="Aminiheading">Last Login: </span>{{ dummyUserInfo.lastOnlineDate }}
                                        </span>
                                        <br>
                                        <span class="q-ma-sm">
                                            <span class="Aminiheading">Invite Key Id: </span>{{ userData.fk_inviteKeyId }}
                                        </span>
                                        <br>
                                        <div>
                                            <hr>
                                            <span class="q-ma-sm">
                                                <span class="Aminiheading">Rank: </span>{{ userData.rank }}
                                            </span>
                                            <br>
                                            <span class="q-ma-sm">
                                                <span class="Aminiheading">Score: </span>{{ userData.score }}
                                            </span>
                                            <br>
                                            <span class="q-ma-sm">
                                                <span class="Aminiheading">View Count: </span>{{ userData.viewCount }}
                                            </span>
                                            <br>
                                            <span class="q-ma-sm">
                                                <span class="Aminiheading">Kyaratar Bytes: </span>{{ userData.kyaratarBytes }}
                                            </span>
                                            <br>
                                            <span class="q-ma-sm">
                                                <span class="Aminiheading">Kyaratar Coins: </span>{{ userData.kyaratarCoins }}
                                            </span>
                                            <br>
                                            <span class="q-ma-sm">
                                                <span class="Aminiheading">Kyaratar Points: </span>{{ userData.kyaratarPoints }}
                                            </span>
                                            <br>
                                            <span class="q-ma-sm">
                                                <span class="Aminiheading">Life-Time Kyaratar Bytes: </span>{{ userData.lifeTimeKyaBytes }}
                                            </span>
                                            <br>
                                            <span class="q-ma-sm">
                                                <span class="Aminiheading">Life-Time Kyaratar Coins: </span>{{ userData.lifeTimeKyaCoins }}
                                            </span>
                                            <br>
                                            <span class="q-ma-sm">
                                                <span class="Aminiheading">Life-Time Kyaratar Points: </span>{{ userData.lifeTimeKyaPoints }}
                                            </span>
                                            <hr>
                                        </div>

                                        <br>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="q-pa-lg">
                            Edit Below and Save
                            <br>
                            <template v-if="userData !== null">
                                <br>
                                <div class="row">
                                    <div class="col-lg-12 shadow-5">
                                        <div class="q-pa-sm">
                                            <div class="row">
                                                <div class="col-lg-4">
                                                    <div>
                                                        <div class="picturetext">
                                                            Profile Photo
                                                        </div>
                                                        <div>
                                                            <img class="responsive" :src="userData.profileImageURL" alt="">
                                                            <br>
                                                            <input type="file" accept="image/*" @change="onFileImageSelected('profile', $event)">
                                                            <q-btn color="tertiary" @click="saveSettings('avatar', userData.uuid)" label="Save"></q-btn>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4">
                                                    <div>
                                                        <div class="picturetext">
                                                            Background Photo
                                                        </div>
                                                        <div>
                                                            <img class="responsive" :src="userData.backgroundImageURL" alt="">
                                                            <br>
                                                            <input type="file" accept="image/*" @change="onFileImageSelected('background', $event)">
                                                            <q-btn color="tertiary" @click="saveSettings('bg', userData.uuid)" label="Save"></q-btn>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4">
                                                    <div>
                                                        <div class="picturetext">
                                                            Banner Photo
                                                        </div>
                                                        <div>
                                                            <img class="responsive" :src="userData.bannerImageURL" alt="">
                                                            <br>
                                                            <input type="file" accept="image/*" @change="onFileImageSelected('banner', $event)">
                                                            <q-btn color="tertiary" @click="saveSettings('banner', userData.uuid)" label="Save"></q-btn>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-if="userData !== null">
                                <br>
                                <div class="row">
                                    <div class="col-lg-12 shadow-5">
                                        <div class="q-pa-sm">
                                            <q-input v-model="userData.displayName" stack-label="Display Name" />
                                            <br>
                                            <p style="font-weight: bold;">About Yourself</p>
                                            <vue-editor v-model="userData.about"></vue-editor>
                                            <br>
                                            <q-btn color="tertiary" @click="saveSettings('info', userData.uuid)" label="Save"></q-btn>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-if="userData !== null">
                                <br>
                                <div class="row">
                                    <div class="col-lg-12 shadow-5">
                                        <div class="q-pa-sm">
                                            <span class="Aminiheading">Change Email: </span>
                                            <q-input type="email" v-model="userData.email" stack-label="E-mail" />
                                            <br>
                                            <q-btn color="tertiary" @click="saveSettings('email', userData.uuid)" label="Save"></q-btn>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-if="userData !== null">
                                <br>
                                <div class="row">
                                    <div class="col-lg-12 shadow-5">
                                        <div class="q-pa-sm">
                                            <span class="Aminiheading">Privacy Setting: </span>
                                            <br>
                                            <div>
                                                Current Setting: {{ dummyUserInfo.privacyCompute }}
                                            </div>
                                            <q-select
                                            v-model="userData.privacyCode"
                                            :options="privacyOptions"
                                            />
                                            <br>
                                            <q-btn color="tertiary" @click="saveSettings('privacy', userData.uuid)" label="Save"></q-btn>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </q-layout>
        </q-page>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mapState } from 'vuex';
import UserService from '../../_services/userService';
import moment from 'moment';
import { VueEditor } from 'vue2-editor';
import UserFunctions from '@/static/helpers/userFunctions';
import { UserModel } from '@/_models/User';
import AmazonHelper from '@/static/helpers/amazons3';
import myAmazonS3Service from '@/_services/myAmazons3Service';
import swal from 'sweetalert2';

// use this as copy and paste for making .vue files, change name
@Component({
    components: {
        VueEditor,
    },
    computed: {
        ...mapState([
            'isUserLoggedIn',
            'user',
        ]),
    },
})
export default class UserSettings extends Vue {
    // data can just be define here using public
    public actualUser = '';
    // assume userData has same data for above form inputs
    public userData = null;
    public tUsername = '';
    public dummyUserInfo!: UserModel;

    public privacyOptions = [
        {
            label: 'public',
            value: 1,
        },
        {
            label: 'friends-only',
            value: 2,
        },
        {
            label: 'private',
            value: 3,
        },
    ];

    // the image profile input object
    public profileImageInput = {
        selectFileImage: null,
        imageBlob: '',
        selectFileName: '',
        selectUrl: '',
        completeUrl: '',
    };

    public bannerImageInput = {
        selectFileImage: null,
        imageBlob: '',
        selectFileName: '',
        selectUrl: '',
        completeUrl: '',
    };

    public backgroundImageInput = {
        selectFileImage: null,
        imageBlob: '',
        selectFileName: '',
        selectUrl: '',
        completeUrl: '',
    };

    // doesn't work
    @Watch('dummyUserInfo', { immediate: true })
    public onChange(value: any) {
        // this.dummyUserInfo = value;
        // this.userData = value;
        // console.log(this.userData);
    }

    public beforeCreate() {
        // console.log(this.$store.state.user.username);
        // console.log(this.$route.params.username);
        if (this.$store.state.user.username !== this.$route.params.username) {
            this.$router.push({
                name: 'home',
            });
        } else {
            this.actualUser = this.$route.params.username;
            // console.log(this.actualUser);
        }
    }

    public async mounted() {
        // console.log('mounted');
        // console.log(this.actualUser);
        this.tUsername = this.$route.params.username;
        if (this.$store.state.user.username === this.$route.params.username) {
            this.actualUser = this.$store.state.user.username;
            // now we load the data
            console.log('load user');
            await this.loadUser(this.actualUser);
        }
    }

    public async loadUser(e) {
        try {
            // try
            const response = (await UserService.getSettings(e)).data;
            console.log(response);
            this.userData = response;
            // do some dummy data things
            this.dummyUserInfo = response;
            this.dummyUserInfo.privacyCompute = UserFunctions.privacyStatus(response.privacyCode);
            this.dummyUserInfo.birthDate = moment(response.birthDate.toString().slice(0, 10),
                ['MM-DD-YYYY', 'YYYY-MM-DD']).format('MMMM Do YYYY');
            this.dummyUserInfo.lastOnlineDate = moment(response.lastOnlineDate.toString().slice(0, 10),
                ['MM-DD-YYYY', 'YYYY-MM-DD']).format('MMMM Do YYYY');
            this.dummyUserInfo.createdAt = moment(response.createdAt.toString().slice(0, 10),
                ['MM-DD-YYYY', 'YYYY-MM-DD']).format('MMMM Do YYYY');
            this.dummyUserInfo.status = UserFunctions.userStatus(response.status);
        } catch (error) {
            // an error
        }
    }

    // for photos
    // Below are methods related to AWS and such
    // File input upload
    // https://stackoverflow.com/questions/29099610/how-to-pass-multiple-parameters-to-inputs-onchange-handler
    // https://stackoverflow.com/questions/40956671/passing-event-and-argument-to-v-on-in-vue-js
    public onFileImageSelected(whichPhoto, event) {
        console.log(whichPhoto);
        if (whichPhoto === 'profile') {
            this.profileImageInput.selectFileImage = event.target.files[0];
            const input = event.target;
            if (input.files && input.files[0]) {
                this.profileImageInput.selectFileName = event.target.files[0].name;
                const reader = new FileReader();
                reader.onload = (e: any) => {
                try {
                    this.profileImageInput.imageBlob = e.target.result;
                    this.profileImageInput.selectUrl = this.profileImageInput.imageBlob;
                } catch (error) {
                    // error
                }
                };
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(input.files[0]);
            }
            // console.log(`profileOnChange ${this.profileImageInput.selectFileName}`);
        }
        if (whichPhoto === 'banner') {
            this.bannerImageInput.selectFileImage = event.target.files[0];
            const input = event.target;
            if (input.files && input.files[0]) {
                this.bannerImageInput.selectFileName = event.target.files[0].name;
                const reader = new FileReader();
                reader.onload = (e: any) => {
                try {
                    this.bannerImageInput.imageBlob = e.target.result;
                    this.bannerImageInput.selectUrl = this.bannerImageInput.imageBlob;
                } catch (error) {
                    // error
                }
                };
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(input.files[0]);
            }
            // console.log(`profileOnChange ${this.profileImageInput.selectFileName}`);
        }
        if (whichPhoto === 'background') {
            this.backgroundImageInput.selectFileImage = event.target.files[0];
            const input = event.target;
            if (input.files && input.files[0]) {
                this.backgroundImageInput.selectFileName = event.target.files[0].name;
                const reader = new FileReader();
                reader.onload = (e: any) => {
                try {
                    this.backgroundImageInput.imageBlob = e.target.result;
                    this.backgroundImageInput.selectUrl = this.backgroundImageInput.imageBlob;
                } catch (error) {
                    // error
                }
                };
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(input.files[0]);
            }
            // console.log(`profileOnChange ${this.profileImageInput.selectFileName}`);
        }
    }

    public formatFileName(filename) {
      const date = moment().format('YYYYMMDD');
      const randomString = Math.random().toString(24).substring(3, 10);
      const cleanerFilename = filename.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const newFileName = `${date}-${randomString}-${cleanerFilename}`;
      console.log(newFileName);
      return newFileName.substring(0, 60);
    }

    // TODO: finish this parts, this builds the file path after the one baseURL
    // and prePath like groups, characters, etc.
    public async FileS3Upload(fileBlob, fileName, filetype, anumber,
    ) {
      const baseURL = AmazonHelper.baseURL;
      let fullPathKey = '';
      const newFileName = this.formatFileName(fileName);
      // user folder
      const NewPreFileName = this.$route.params.username.toLowerCase().replace(/\s/g, '_');
      // actual file name
      // add an image prefix
      console.log(filetype);
      // determine filtetype ext.
      let extensionImg = '.jpg';
      if (filetype.toString() === 'image/jpeg') {
          extensionImg = '.jpg';
      }
      if (filetype.toString() === 'image/png') {
          extensionImg = '.png';
      }
      const newImageName = ('user' + '_' + newFileName).toLowerCase()
        .replace(/[^a-z0-9.]/g, '-').replace(/\s/g, '_');
      console.log(newImageName);
      // add ext
      const finalImageName = newImageName + extensionImg;
      console.log(finalImageName);
      // let's make the url first and then upload
      // 1 = avatar, 2 = banner, 3 = background
      if (anumber === 1) {
        fullPathKey = `${NewPreFileName}/avatar/${finalImageName}`;
        this.profileImageInput.completeUrl = AmazonHelper.newAmazonS3URLMaker(fullPathKey, 'users');
        console.log(this.profileImageInput.completeUrl);
        const response = (await myAmazonS3Service.s3UserPhotoPutSigner({
            variables: {
            filebody: fileBlob,
            filetype,
            fileprename: this.tUsername,
            fullPathKey: this.profileImageInput.completeUrl,
            userId: this.$store.state.user.uuid,
            isPhoto: true,
            },
        })).data; // TODO:
        this.profileImageInput.completeUrl = response.url;
        console.log(this.profileImageInput.completeUrl);
        // return completeURL
      }
      if (anumber === 2) {
        fullPathKey = `${NewPreFileName}/banner/${finalImageName}`;
        this.bannerImageInput.completeUrl = AmazonHelper.newAmazonS3URLMaker(fullPathKey, 'users');
        console.log(this.bannerImageInput.completeUrl);
        const response = (await myAmazonS3Service.s3UserPhotoPutSigner({
            variables: {
            filebody: fileBlob,
            filetype,
            fileprename: this.tUsername,
            fullPathKey: this.bannerImageInput.completeUrl,
            userId: this.$store.state.user.uuid,
            isPhoto: true,
            },
        })).data; // TODO:
        this.bannerImageInput.completeUrl = response.url;
        console.log(this.bannerImageInput.completeUrl);
        // return completeURL
      }
      if (anumber === 3) {
        fullPathKey = `${NewPreFileName}/background/${finalImageName}`;
        this.backgroundImageInput.completeUrl = AmazonHelper.newAmazonS3URLMaker(fullPathKey, 'users');
        console.log(this.profileImageInput.completeUrl);
        const response = (await myAmazonS3Service.s3UserPhotoPutSigner({
            variables: {
            filebody: fileBlob,
            filetype,
            fileprename: this.tUsername,
            fullPathKey: this.backgroundImageInput.completeUrl,
            userId: this.$store.state.user.uuid,
            isPhoto: true,
            },
        })).data; // TODO:
        this.backgroundImageInput.completeUrl = response.url;
        console.log(this.backgroundImageInput.completeUrl);
        // return completeURL
      }
    }

    // TODO: finish
    public async saveSettings(mode, id) {
        try {
            // in userObj, saveType is for back-end logic
            let userObj = null;
            if (mode === 'info') {
                userObj = {
                    uuid: this.dummyUserInfo.uuid,
                    username: this.$store.state.user.username,
                    displayName: this.userData.displayName,
                    about: this.userData.about,
                    saveType: 'self',
                };
            }
            if (mode === 'privacy') {
                userObj = {
                    uuid: this.dummyUserInfo.uuid,
                    username: this.$store.state.user.username,
                    privacyCode: this.userData.privacyCode,
                    saveType: 'self',
                };
            }
            // for the images we need to wait for the S3 url generation and upload.
            if (mode === 'avatar') {
                // the complete URL is in FileSEUpload
                const avatarURL = await this.FileS3Upload(this.profileImageInput.imageBlob,
                  this.profileImageInput.selectFileName,
                  this.profileImageInput.selectFileImage.type, 1);
                userObj = {
                    uuid: this.dummyUserInfo.uuid,
                    username: this.$store.state.user.username,
                    profileImageURL: this.profileImageInput.completeUrl,
                    saveType: 'self',
                };
            }
            if (mode === 'bg') {
                // the complete URL is in FileSEUpload
                const bgURL = await this.FileS3Upload(this.backgroundImageInput.imageBlob,
                  this.backgroundImageInput.selectFileName,
                  this.backgroundImageInput.selectFileImage.type, 3);
                userObj = {
                    uuid: this.dummyUserInfo.uuid,
                    username: this.$store.state.user.username,
                    backgroundImageURL: this.backgroundImageInput.completeUrl,
                    saveType: 'self',
                };
            }
            if (mode === 'banner') {
                // the complete URL is in FileSEUpload
                const bgURL = await this.FileS3Upload(this.bannerImageInput.imageBlob,
                  this.bannerImageInput.selectFileName,
                  this.bannerImageInput.selectFileImage.type, 2);
                userObj = {
                    uuid: this.dummyUserInfo.uuid,
                    username: this.$store.state.user.username,
                    bannerImageURL: this.bannerImageInput.completeUrl,
                    saveType: 'self',
                };
            }
            const response = await UserService.saveSettings(userObj).then
                  ((data) => {
                    const toast = (swal as any).mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 4000,
                    });
                    toast({
                    type: 'success',
                    title: 'Settings updated successfully!',
                    });
                    console.log(data);
                    this.loadUser(this.actualUser);
                  });
        } catch (error) {
            // an error
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

.picturetext {
    text-align: center;
    padding-bottom: 1.0em;
}

.Aminiheading {
    font-weight: 600;
}

.Asubheading {
    font-size: 1.2em;
    font-weight: bold;
}

</style>