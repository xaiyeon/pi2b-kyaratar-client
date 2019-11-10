<template>
    <div>
        <q-page>
            <q-layout>
                <div class="q-pa-md">
                    <template v-if="OnePage && editToggling === false">
                        <div class="shadow-7">
                            <div class="q-pa-md">
                                <div>
                                    <div class="customHeadinglol flex wrap">
                                        <div class="row">
                                            <div class="col-*">
                                                <div class="">
                                                    <img class="imageProfileMax responsive" :src="OnePage.User.profileImageURL" alt="">
                                                </div>
                                            </div>
                                            <div class="col-*">
                                                <div style="padding-left: 1.2em;">
                                                    {{ OnePage.heading }}
                                                    <br>
                                                    <span class="taglineThing">{{ OnePage.tagline }}</span>
                                                    <template v-if="this.$store.state.user">
                                                        <div v-if="OnePage.rk_userName === this.$store.state.user.username" style="">
                                                            <q-btn color="purple" class="purple darken-2 white--text"
                                                            label="Edit"
                                                            @click="editButton()"
                                                            >
                                                            </q-btn>
                                                            <q-btn style="margin-left: 1.2em;" color="green-6" class="purple darken-2 white--text"
                                                            label="Add Link"
                                                            @click="toggleModal()"
                                                            >
                                                            </q-btn>
                                                            <q-btn style="margin-left: 1.2em;" color="green-8" class="purple darken-2 white--text"
                                                            label="Add File"
                                                            >
                                                            </q-btn>
                                                        </div>
                                                        <div style="padding-bottom: 8px;"></div>
                                                    </template>
                                                    <div class="badgeandmore">
                                                        <q-btn :label="this.$route.params.username" @click="navigateTo(OnePage.User.username, 'viewUser')">
                                                            <q-tooltip anchor="bottom middle" self="top middle">
                                                                View Profile
                                                            </q-tooltip>
                                                        </q-btn>
                                                        <q-chip v-if="OnePage.User.isVerified" icon="verified_user" square color="blue">Verified</q-chip>
                                                        <q-chip icon="person_outline" square color="tertiary">{{ OnePage.User.UserRole.title }}</q-chip>
                                                        <q-chip v-if="OnePage.User.isPartner" icon="fa fa-handshake" square color="amber-10">Partner</q-chip>
                                                        <q-chip v-if="OnePage.User.isHelper"  icon="fa fa-info-circle" square color="cyan">Helper</q-chip>
                                                        <q-chip v-if="OnePage.User.isDonator" icon="fa fa-heart" square class="donatorflare">Donator</q-chip>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr>
                                    <div>
                                        Website: <a :href="OnePage.linkOne" target="_blank">{{ OnePage.linkOne }}</a>
                                        <br>
                                        Social Link: <a :href="OnePage.linkTwo" target="_blank">{{ OnePage.linkTwo }}</a>
                                        <br>
                                        Another Social Link: <a :href="OnePage.linkThree" target="_blank">{{ OnePage.linkThree }}</a>
                                        <br>
                                            <template>
                                                <div v-if="OnePageLinkObject.larray.length + 1 > 0">
                                                    <onepagelinkcard :pageLinks="OnePageLinkObject" />
                                                </div>
                                            </template>
                                        <br>
                                    </div>
                                    <br>
                                    <div class="docuBody">
                                        <div :class="$style" v-html="OnePage.body">
                                        </div>
                                    </div>
                                </div>    
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <template v-if="this.$route.params.username === this.$store.state.user.username && editToggling === false">
                            <p>You don't have a OnePage set-up!</p>
                        </template>
                        <template v-if="this.$route.params.username !== this.$store.state.user.username && editToggling === false">
                            <p>This user does not have a OnePage set-up!</p>
                        </template>
                    </template>
                    <template v-if="this.$store.state.user && OnePage !== null && editToggling === true">
                        <div class="shadow-7">
                            <div class="q-pa-md">
                                <div>
                                    <div class="flex wrap">
                                        <q-input style="width: auto;" v-model="OnePage.heading" :float-label="'Title: ' + OnePage.heading" :placeholder="OnePage.heading" />
                                        <q-input style="width: auto;" v-model="OnePage.tagline" :float-label="'Tagline: ' + OnePage.tagline" :placeholder="OnePage.tagline" />
                                        <div style="padding-right: 1.2em;">
                                        </div>
                                        <div v-if="OnePage.rk_userName === this.$store.state.user.username" style="">
                                            <q-btn color="purple" class="purple darken-2 white--text"
                                            label="Save Edit"
                                            @click="saveChangesOnePage()"
                                            >
                                            </q-btn>
                                            <q-btn color="red" class="darken-2 white--text"
                                            label="Cancel Edit"
                                            @click="editButton()"
                                            >
                                            </q-btn>
                                            <q-btn style="margin-left: 1.2em;" color="green-6" class="purple darken-2 white--text"
                                            label="Add Link"
                                            @click="toggleModal()"
                                            >
                                            </q-btn>
                                            <q-btn style="margin-left: 1.2em;" color="green-8" class="purple darken-2 white--text"
                                            label="Add File"
                                            @click="navigateTo({
                                                name:'character-edit',
                                                params: {
                                                    characterId: characterL[0].id,
                                                    slugName: characterL[0].slug,
                                                }
                                            })"
                                            >
                                            </q-btn>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="badgeandmore">
                                        <q-chip v-if="OnePage.User.isVerified" icon="verified_user" square color="blue">Verified</q-chip>
                                        <q-chip icon="person_outline" square color="tertiary">{{ OnePage.User.UserRole.title }}</q-chip>
                                        <q-chip v-if="OnePage.User.isPartner" icon="fa fa-handshake" square color="amber-10">Partner</q-chip>
                                        <q-chip v-if="OnePage.User.isHelper"  icon="fa fa-info-circle" square color="cyan">Helper</q-chip>
                                        <q-chip v-if="OnePage.User.isDonator" icon="fa fa-heart" square class="donatorflare">Donator</q-chip>
                                    </div>
                                    <hr>
                                    <div>
                                        <q-input style="width: auto;" v-model="OnePage.linkOne" float-label="Website" :placeholder="OnePage.linkOne" />
                                        <br>
                                        <q-input style="width: auto;" v-model="OnePage.linkTwo" float-label="Social Link" :placeholder="OnePage.linkTwo" />
                                        <br>
                                        <q-input style="width: auto;" v-model="OnePage.linkThree" float-label="Social Link" :placeholder="OnePage.linkThree" />
                                        <br>
                                        More Links (upon deletion the links will update after a cancel or save)...
                                        <br>
                                            <template>
                                                <div v-if="OnePageLinkObject.larray.length + 1 > 0">
                                                    <onepagelinkcard :pageLinks="OnePageLinkObject" />
                                                </div>
                                            </template>
                                        <br>
                                    </div>
                                    <br>
                                    <div>
                                        <br>
                                        <div>
                                            Body
                                        </div>
                                        <br>
                                        <vue-editor v-model="OnePage.body"></vue-editor>
                                        <br>
                                    </div>
                                </div>    
                            </div>
                        </div>
                    </template>
                </div>
            </q-layout>
        </q-page>
        <template>
            <q-modal minimized :content-css="{minWidth: '80vw', minHeight: '60vh'}" no-backdrop-dismiss="Mfalse" v-model="showUploadModal">
                <q-modal-layout>
                    <q-btn color="red" label="X" @click="toggleModal()"></q-btn>
                    <div class="q-pa-md">
                        <q-alert icon="image" color="green-4">Add a link or new banner!
                            <q-btn round dense color="dark" icon="info">
                                <q-tooltip anchor="bottom middle" self="top middle">
                                    A banner image size of 320x120 (w * h) is suggested.
                                </q-tooltip>
                            </q-btn>
                        </q-alert>
                        <br>
                            <div>
                                <q-input v-model="linkObj.heading" float-label="Title" placeholder="Title" />
                            </div>
                            <div>
                                <q-input type="number" v-model="linkObj.order" float-label="Order" placeholder="1" />
                            </div>
                            <div>
                                <q-input v-model="linkObj.link" float-label="URL" placeholder="Title" />
                            </div>
                            <div>
                                <br>
                                <input type="file" accept="image/*" @change="onFileImageSelected('banner', $event)">
                            </div>
                            <div>
                                <q-input v-model="linkObj.description" float-label="Description" placeholder="Title" />
                            </div>
                            <!-- <div>
                                <q-select
                                v-model="linkObj.kind"
                                :options="kindOptions"
                                />
                            </div>
                            <div>
                                <q-select
                                v-model="MvideoObj.status"
                                :options="statusOptions"
                                />
                            </div> -->
                        <br>
                        <q-btn @click="createLink()" label="Submit"></q-btn> <q-btn @click="clearLinkForm()" label="Clear"></q-btn>
                    </div>
                </q-modal-layout>
            </q-modal>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mapState } from 'vuex';
import swal from 'sweetalert2';
import moment from 'moment';
import { VueEditor } from 'vue2-editor';
import UserService from '@/_services/userService';
import userService from '@/_services/userService';
import AmazonHelper from '@/static/helpers/amazons3';
import myAmazonS3Service from '@/_services/myAmazons3Service';
import OnePageLinkCard from '@/components/_user/onePage/OnePageLinkCard.vue';

// This page will have everything, even edit toggling and stuff like that

// use this as copy and paste for making .vue files, change name
@Component({
    components: {
        VueEditor,
        onepagelinkcard: OnePageLinkCard,
    },
    computed: {
        ...mapState([
            'isUserLoggedIn',
            'user',
        ]),
    },
})
export default class ViewUserOnePage extends Vue {
    // data can just be define here using public
    public OnePage = {
        heading: '',
        tagline: '',
        linkOne: '',
        linkTwo: '',
        linkThree: '',
        body: '',
        viewCount: 0,
        rk_userName: '',
    };

    public linkObj = {
        heading: '',
        link: '',
        imageURL: '',
        description: '',
        displayOrder: 1,
        order: 1,
        fk_userOnePageLinkId: '',
    };

    public bannerImageInput = {
        selectFileImage: null,
        imageBlob: '',
        selectFileName: '',
        selectUrl: '',
        completeUrl: '',
    };

    public tUsername = '';
    public onePageUUID = '';
    public editToggling = false;
    public OnePageLinkObject = {
        larray: [],
        isEdit: false,
        fk_userOnePageLinkId: '',
        username: '',
    };
    public pagination = {
        pageNumber: 1,
        itemsPerPage: 30,
        maxPages: null,
    };

    // from checking OnePageExist
    public isOnePageExist = true;

    // for adding links
    public showUploadModal = false;

    // @Watch('this.$route.params.username', { immediate: true })
    // public paramChange(value: any) {
    //     const Ausername = this.$route.params.username;
    //     this.checkAndLoadPage(Ausername);
    // }

    @Watch('pageLinks', { immediate: true })
    public onChangeP(value: any) {
        this.loadPageLinks();
    }

    public async saveChangesOnePage() {
        try {
            if (this.OnePage.heading === '') {
                this.OnePage.heading = `${this.$store.state.user.username}'s One Page!`;
            }
            this.OnePage.rk_userName = this.$route.params.username;
            const response = (await userService.updatePage(this.$route.params.username,
                this.OnePage)).data;
            console.log(response);
            this.checkAndLoadPage(this.$route.params.username);
            this.editButton();
        } catch (error) {
            // an error
        }
    }

    public editButton() {
        this.editToggling = !this.editToggling;
        this.OnePageLinkObject.isEdit = !this.OnePageLinkObject.isEdit;
        this.loadPageLinks();
    }

    // create and add link
    public async createLink() {
        try {
            // try something
            if (this.linkObj.heading !== '' && this.linkObj.link !== '') {
                const bgURL = await this.FileS3Upload(this.bannerImageInput.imageBlob,
                                this.bannerImageInput.selectFileName,
                                this.bannerImageInput.selectFileImage.type, 2)
                .then(async (result) => {
                    const response = (await userService.createLink(this.tUsername, this.linkObj)).data;
                    this.clearLinkForm();
                    this.loadPageLinks();
                    // console.log(response);
                });
            }
        } catch (err) {
            // an error
        }
    }

    public mounted() {
        const Ausername = this.$route.params.username;
        this.tUsername = this.$route.params.username;
        this.OnePageLinkObject.username = this.tUsername;
        this.checkAndLoadPage(Ausername);
    }

    public async checkAndLoadPage(username) {
        // check if user has one already if not promprt for creation
        try {
            // check if onepage exists on fk_userId
            // basically we fetch and if none found ask to create. Not an error I guess.
            // console.log(this.$route.params.username);
            // console.log(this.$store.state.user.username);
            if (this.$store.state.isUserLoggedIn) {
                if (this.$route.params.username === this.$store.state.user.username) {
                    // means loading our own
                    const userMatch = {
                        isLoggedIn: false,
                    };
                    if (this.$store.state.user) {
                        userMatch.isLoggedIn = true;
                    }
                    const response = (await UserService.showPage(username, userMatch)).data;
                    this.OnePage = response;
                    // save the uuid
                    this.onePageUUID = response.uuid;
                    this.linkObj.fk_userOnePageLinkId = response.uuid;
                    this.OnePageLinkObject.fk_userOnePageLinkId = response.uuid;
                    // console.log(response.error);
                    console.log(response);
                    if (response.heading === undefined || response.heading === null) {
                        console.log('nothing');
                        this.wouldYouLikeToCreateOne();
                    }
                    this.loadPageLinks();
                }
            } else {
                console.log('check load else');
                const userMatch = {
                    isLoggedIn: false,
                };
                const response = (await UserService.showPage(username, userMatch)).data;
                // save the uuid
                this.onePageUUID = response.uuid;
                this.linkObj.fk_userOnePageLinkId = response.uuid;
                this.loadPageLinks();
                this.OnePage = response;
                // console.log(response);
            }
        } catch (error) {
            // an error
            // console.log(error.response.data.isExist);
            console.log(error);
            this.isOnePageExist = error.response.data.isExist;
            this.wouldYouLikeToCreateOne();
        }
    }

    public async loadPageLinks() {
        try {
            const query = {
                onePage: true,
            };
            const response = (await UserService.getLinks(this.onePageUUID, query)).data;
            let x = 0;
            response.forEach((data) => {
                data.createdAt = moment(data.createdAt.toString().slice(0, 10),
                ['MM-DD-YYYY', 'YYYY-MM-DD']).format('MMMM Do YYYY');
                data.updatedAt = moment(data.createdAt.toString().slice(0, 10),
                                ['MM-DD-YYYY', 'YYYY-MM-DD']).format('MMMM Do YYYY');
                data.isView = false;
                data.keyNumber = x;
                data.username = this.tUsername;
                x += 1;
            });
            this.OnePageLinkObject.larray = response;
            console.log(this.OnePageLinkObject.larray);
            console.log(response);
        } catch (error) {
            // am error
        }
    }

    public wouldYouLikeToCreateOne() {
        if (this.$store.state.isUserLoggedIn) {
              swal({
              title: 'Hey there!',
              text: `Would you like to create a OnePage?`,
              type: 'info',
              allowOutsideClick: false,
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes PLEASE!',
              }).then((result) => {
                if (result.value) {
                    // we call the create
                    this.createTheOnePage().then((resultant) => {
                        this.checkAndLoadPage(this.tUsername);
                    });
                  // this.logout();
                  // this.navigateTo('login');
                } else {
                  // this.logout();
                }
              });
        } else {
            // nothing
        }
    }

    // close modal duh
    public toggleModal() {
        this.showUploadModal = !this.showUploadModal;
    }

    // all functions for uploading an add link image
    public onFileImageSelected(whichPhoto, event) {
        // console.log(whichPhoto);
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
    }

    public formatFileName(filename) {
      const date = moment().format('YYYYMMDD');
      const randomString = Math.random().toString(24).substring(3, 10);
      const cleanerFilename = filename.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const newFileName = `${date}-${randomString}-${cleanerFilename}`;
      console.log(newFileName);
      return newFileName.substring(0, 60);
    }

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
        // console.log(filetype);
        // determine filtetype ext.
        let extensionImg = '.jpg';
        if (filetype.toString() === 'image/jpeg') {
            extensionImg = '.jpg';
        }
        if (filetype.toString() === 'image/png') {
            extensionImg = '.png';
        }
        if (filetype.toString() === 'image/gif') {
            extensionImg = '.gif';
        }
        const newImageName = ('link' + '_' + newFileName).toLowerCase()
            .replace(/[^a-z0-9.]/g, '-').replace(/\s/g, '_');
        // console.log(newImageName);
        // add ext
        const finalImageName = newImageName + extensionImg;
        // console.log(finalImageName);
        // let's make the url first and then upload
        if (anumber === 2) {
            fullPathKey = `${NewPreFileName}/links/${finalImageName}`;
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
            this.linkObj.imageURL = this.bannerImageInput.completeUrl;
            console.log(this.linkObj.link);
            // return completeURL
        }
        // return completeURL
      }

    public navigateTo(param, r) {
        if (r === 'viewUser') {
            this.$router.push({
                name: 'viewUser',
                params: {
                    username: param,
                },
            });
        }
    }

    protected clearLinkForm() {
        this.linkObj.heading = '';
        this.linkObj.link = '';
        this.linkObj.imageURL = '';
        this.linkObj.description = '';
        this.linkObj.displayOrder = 1;
        this.linkObj.order = 1;
    }

    // Only for loggedInUsers
    protected async createTheOnePage() {
        try {
            if (this.$store.state.isUserLoggedIn) {
                // do something
                // made a default constructor? or something?
                const defaultConst = {
                    heading: `${this.$store.state.user.username}'s One Page!`,
                };
                const response = (await userService.createPage(this.$store.state.user.username
                    , defaultConst)).data;
                // console.log(response);
            }
        } catch (error) {
            // an error
        }
    }

}
</script>

<style module>


</style>

<style lang="scss">

p.ql-indent-1 {
    text-indent: 2em;
}

p.ql-indent-2 {
    text-indent: 3em;
}

p.ql-indent-3 {
    text-indent: 4em;
}

p.ql-indent-4 {
    text-indent: 5em;
}

p.ql-align-center {
    text-align: center;
}

p.ql-align-right {
    text-align: right;
}

</style>

<style scoped lang="scss">

.taglineThing {
    font-size: 0.75em;
    font-style: italic;
    color: #999da3;
}

.imageProfileMax {
    width: 200px;
    height: 200px;
}

.docuBody {
    margin: auto;
    width: auto;
    height: auto;
}

.customHeadinglol {
    font-size: 1.5em;
    font-weight: bold;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', 'Verdana', 'sans-serif';
}

</style>