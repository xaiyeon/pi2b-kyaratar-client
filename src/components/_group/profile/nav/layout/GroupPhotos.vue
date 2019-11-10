<template>
    <div>
        <template>
            <div class="row">
                <div class="col-lg-12">
                    <div class="q-ma-md">
                        <div class="flex">
                            <q-btn icon="add" label="Upload Photo" color="tertiary" @click.native="showPhotoModal = true"></q-btn>
                            <div class="paddingButtons"></div>
                            <q-chip icon="image" color="primary">Total Photos: {{ photoCount }}</q-chip>
                        </div>                        
                        <hr>
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
                        <div>
                            <div>
                                <div  class="row">
                                    <div v-for="(photo, index) in photos" :key="index" class="col-* inline wrap ">
                                        <div class="hvr-trim q-ma-sm q-pa-md">
                                            <div class="shadow-5">
                                                <div>
                                                    <span class="photoTitle">{{ photo.title }} </span>
                                                    <br>
                                                    Uploader: {{ photo.User.displayName }} on {{ photo.createdAt }}
                                                </div>
                                                <div>
                                                    <div class="buttonOptions">
                                                        <q-btn icon="arrow_drop_down">
                                                        <!-- Direct child of target -->
                                                        <q-popover>
                                                            <!--
                                                            The DOM element(s) that make up the popup,
                                                            in this case a list:
                                                            -->
                                                            <q-list separator link>
                                                            <!-- notice `v-close-overlay` which closes popover -->
                                                            <q-item v-close-overlay @click.native="photoOption(photo.keyNumber)">
                                                                View
                                                            </q-item>
                                                            <q-item v-close-overlay @click.native="doSomething">
                                                                Detail
                                                            </q-item>
                                                            </q-list>
                                                        </q-popover>
                                                        </q-btn>
                                                    </div>
                                                    <img class="responsive photoDims" :src="photo.imageURL" alt="">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <template v-if="anyPhotos">
                    <q-modal minimized :content-css="{minWidth: '92vw', minHeight: '92vh'}" v-model="viewPhoto" :no-backdrop-dismiss="viewBack">
                        <q-modal-layout >
                            <div>
                                <q-btn style="position: absolute;" label="x" color="red" @click="viewPhoto=false">
                                </q-btn>
                            </div>
                            <div class="imgbox">
                                <img class="center responsive" :src="photos[modalNumber].imageURL" alt="">
                            </div>
                        </q-modal-layout>
                    </q-modal>
                </template>
            <q-modal leave-class="pulse" position="bottom" no-backdrop-dismiss="x = false" v-model="showPhotoModal">
            <div style="padding: 50px; display: inline-block; width:94vw">
                <div class="q-display-1 q-mb-md">Upload A Photo</div>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="q-ma-sm">
                            <p>Your Photo:</p>
                                <div>
                                    <q-input v-model="uploadPhoto.title" float-label="Photo Title" placeholder="Title" />
                                </div>
                                <div>
                                    Selected File: {{ selectedIconImageName }}
                                </div>
                                <div class='jbtn-file'>Browse for image
                                    <br>
                                    <input type="file" accept="image/*" @change="onFileImageSelected">
                                </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="q-ma-sm ">
                            <p>Preview:</p>
                            <div class="commentPre-container">
                                <img class="responsive imagefixer" :src="imagePhotoBlob" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <q-btn color="tertiary" @click="submitPhoto" label="Submit" />
                <q-btn style="margin-left: 1.1em" color="tertiary" @click="showPhotoModal = false" label="Close" />
            </div>
            </q-modal>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import groupService from '@/_services/groupService';
import myAmazonS3Service from '@/_services/myAmazons3Service';
import AmazonHelper from '@/static/helpers/amazons3';
import moment from 'moment';
import swal from 'sweetalert2';

// use this as copy and paste for making .vue files, change name
@Component
export default class GroupPhotos extends Vue {
    @Prop({default: () => []})
    public pGroup!: any;

    @Prop({default: () => null})
    public pGroupId!: string;

    public groupPageURL = '';
    public pagination = {
        pageNumber: 1,
        itemsPerPage: 30,
        maxPages: null,
    };

    public photos = [];
    public isView = false;

    public photo: any = null;
    public modalNumber = 0;
    public photoCount: number = 0;
    public anyPhotos = false;
    public viewPhoto = false;
    public viewBack = false;
    // for upload
    public showPhotoModal = false;

    // Upload with normal file input form
    public selectedFileImage = null;
    public imagePhotoBlob = '';
    public selectedPhotoImageName = '';
    public selectPhotoURL = '';

    public completeImageURL = '';

    public uploadPhoto = {
        title: '',
        image: null,
        description: null,
        groupPageURL: null,
        userId: null,
        groupUid: '',
    };

    public async mounted() {
        try {
            this.LoadPhotos();
        } catch (error) {
            // an error
        }
        // console.log('photo sub comp');
    }

    public async LoadPhotos() {
        this.uploadPhoto.groupPageURL = this.$route.params.url;
        this.groupPageURL = this.$route.params.url;
        try {
            const response = (await groupService.getPhotos(this.groupPageURL,
                this.pagination.pageNumber, this.pagination.itemsPerPage)).data;
            console.log(response);
            this.photos = response.result;
            let x = 0;
            this.photos.forEach((photo) => {
                photo.createdAt = moment(photo.createdAt.toString().slice(0, 10),
                ['MM-DD-YYYY', 'YYYY-MM-DD']).format('MMMM Do YYYY');
                photo.isView = false;
                photo.keyNumber = x;
                x += 1;
            });
            this.pagination.maxPages = response.pages;
            this.photoCount = response.count;
            if (this.photoCount > 0) {
                this.anyPhotos = true;
            }
        } catch (error) {
            // an error
        }
    }

    public photoOption(anum) {
        this.viewPhoto = false;
        this.photos.forEach((element) => {
            element.isView = false;
        });
        this.modalNumber = anum;
        console.log(anum);
        this.photos[anum].isView = true;
        this.viewPhoto = true;
        console.log(this.photos[anum].isView);
    }

    // BELOW are for uploading PHOTOS

    public async submitPhoto() {
        try {
            // try something
            if (this.uploadPhoto.title !== '') {
                this.uploadPhoto.userId = this.$store.state.user.uuid;
                const imageFile = this.imagePhotoBlob;
                const imageName = this.selectedPhotoImageName;
                const imageType = this.selectedFileImage.type;
                const dbImageURL = this.FileS3Upload(imageFile, imageName, imageType,
                this.uploadPhoto.title, 'profile', 'groups', 'photo', 1);
                // now build and send the group photo image object to server
                this.uploadPhoto.image = this.completeImageURL;
                // console.log(this.uploadPhoto);
                // console.log(this.uploadPhoto.image);
                // TODO: finish this part.
                const response = await groupService.uploadPhoto(this.uploadPhoto)
                    .then((data) => {
                        this.uploadPhoto.title = null;
                        this.uploadPhoto.image = null;
                        this.uploadPhoto.description = null;
                        this.imagePhotoBlob = '';
                        this.showPhotoModal = false;
                        this.LoadPhotos();
                    });
                // then reset everything
            } else {
                this.showPhotoModal = false;
                swal({
                title: 'Oopsie!',
                text: `Please enter a title for the photo.`,
                type: 'warning',
                allowOutsideClick: false,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Okay',
                customClass: 'overEverything',
                });
            }
            // console.log(response);
        } catch (error) {
            // an error
        }
    }

    // photo stuff

    // Below are methods related to AWS and such
    public formatFileName(filename) {
      const date = moment().format('YYYYMMDD');
      const randomString = Math.random().toString(24).substring(3, 10);
      const cleanerFilename = filename.toLowerCase().replace(/[^a-z0-9]/g, '-');
      // const characterName = this.createCharacter.name.toLowerCase().replace(/\s/g, '-');
      // the newFileName is also for back-end and amazon s3
      // please use: characters/{character name}/profile
      const newFileName = `${date}-${randomString}-${cleanerFilename}`;
      // console.log(newFileName)
      return newFileName.substring(0, 60);
    }

    // File input upload
    public onFileImageSelected(event) {
      // Reference to the DOM input element
      // console.log(event.target.files[0]);
      this.selectedFileImage = event.target.files[0];
      const input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // get name
        this.selectedPhotoImageName = event.target.files[0].name;
        // create a new FileReader to read this image and convert to base64 format
        const reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e: any) => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageBlob
          try {
            this.imagePhotoBlob = e.target.result;
            // console.log(this.imagePhotoBlob);
            this.selectPhotoURL = this.imagePhotoBlob;
            // console.log(this.selectPhotoURL);
          } catch (error) {
              // error
          }
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    }

    public async FileS3Upload(fileBlob, filename, filetype, filecharactername, filesubroot,
    filemainroot,
    imagePrefix,
    anumber,
    ) {
        // console.log('s3upload');
        // console.log(this.uploadPhoto.title);
      if (this.uploadPhoto.title === null) {
        // this.formErrorBool = true;
        // this.formError = 'Hey! The character needs a name first!';
        return;
      }
      const newFileFolder = this.formatFileName(filecharactername);
      const NewcharacterName = this.$route.params.url.toLowerCase().replace(/\s/g, '_');
      const newImageName = (imagePrefix + '_' + newFileFolder + '_' + filename).toLowerCase()
        .replace(/[^a-z0-9.]/g, '-').replace(/\s/g, '_');
      // let's make the url first and then upload
      if (anumber === 1) {
        // for the image, be relative to the group
        // console.log('in anumber1');
        // added /photos
        this.completeImageURL = AmazonHelper.AmazonS3URLMaker(filemainroot,
        NewcharacterName, filesubroot + '/photos', newImageName);
        console.log(this.completeImageURL);
      }
      const response = await myAmazonS3Service.s3GroupPhotoPutSigner({
        variables: {
          filebody: fileBlob,
          filename: newImageName,
          filetype,
          filecharname: this.groupPageURL,
          filesubroot: filesubroot + '/photos',
          filefolder: newFileFolder,
          filemainroot,
          groupPageURL: this.groupPageURL,
          userId: this.$store.state.user.uuid,
          groupId: this.groupPageURL,
          isPhoto: true,
        },
      }); // TODO:
      console.log(response);
      // return completeURL
    }

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }
}
</script>

<style scoped lang="scss">

.overEverything {
    z-index: 99999999;
}

.photoTitle {
    color: rgba(18, 89, 221, 0.678);
    font-size: 1.2em;
    font-weight: bold;
}

.imgbox {
    display: grid;
    height: 100%;
}

.center {
   max-width: 100%;
   max-height: 100vh;
   margin: auto;
}

.buttonOptions {
    z-index: 99999; 
    position: absolute;
    color: white;
    background: rgba($color: #000000, $alpha: 0.90)
}

.photoDims {
    width: 320px;
    height: 180px;
}

.paddingButtons {
    padding-left: 1.1em;
    padding-right: 1.1em;
}

</style>