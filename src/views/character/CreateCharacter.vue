<template>
    <div>
        <q-layout>
            <div class="q-pa-lg">
                <div class="row">
                    <div class="col-md-6">
                        <div class="toptitle">Creating a character</div>
                        <div>
                            <p>Please be sure to fill out the form to the best of your abilities!
                                There is a small preview right below to see what your page for the character
                                could look like. If everything seems okay to you, then you can submit it. By submitting
                                the data, you will be held responsible for it as it gets reviewed by core members.
                            </p>
                        </div>
                        <div>
                            <q-input v-model="createCharacter.name" type="text" float-label="Name" maxlength="64"/>
                            <q-input v-model="createCharacter.slug" :readonly="true" type="text" float-label="Slug Name"/>
                            <q-input v-model="createCharacter.altName" type="text" float-label="Alternative Name" maxlength="64"/>
                            <div class="shadow-4">
                                <br>
                                <p>Describe the person in two sentences in looks. Two sentences in personality. Then 1 good event, and 1 bad event about them.</p>
                                <br>
                                <q-input v-model="createCharacter.description" type="textarea" float-label="Description" maxlength="1024"/>
                                <q-input v-model="createCharacter.descriptionSource" type="text" float-label="Description Source" maxlength="64"/>
                                <br>
                            </div>
                                <q-input v-model="createCharacter.background" type="textarea" float-label="Background" maxlength="1024"/>
                                <q-input v-model="createCharacter.backgroundSource" type="text" float-label="Background Source" maxlength="64"/>
                            <q-input v-model="createCharacter.shortInfo" type="textarea" float-label="Short Intro" maxlength="100"/>
                            <q-select v-model="selectCategory" float-label="Select Main Category" :options="categoryOptions"/>
                            <br/>
                            <div class="q-pa-lg">
                                <div>
                                    Selected File: {{ selectedIconImageName }}
                                </div>
                                <div class='jbtn-file'>Browse for icon image
                                    <input type="file" accept="image/*" @change="onFileIconSelected">
                                </div>
                            </div>
                            <div class="q-pa-lg">
                                <div>
                                    Selected File: {{ selectedAvatarImageName }}
                                </div>
                                <div class='jbtn-file'>Browse for avatar image
                                    <input type="file" accept="image/*" @change="onFileAvatarSelected">
                                </div>
                            </div>
                            <div class="q-pa-lg">
                                <div>
                                    Selected File: {{ selectedBannerImageName }}
                                </div>
                                <div class='jbtn-file'>Browse for banner image
                                    <input type="file" accept="image/*" @change="onFileBannerSelected">
                                </div>                                
                            </div>
                        </div>
                        <div>
                            <q-checkbox v-model="checkboxCreate" label="It is ready" />
                            <div class="q-pt-md">

                            </div>
                            <q-btn color="purple-6 whiten" label="Save" @click="createNewCharacter">
                            </q-btn>
                        </div>
                        <div>
                            <div v-if="formErrorBool" class="q-pa-lg">
                                <q-alert type="alert">
                                    {{ formError }}
                                </q-alert>
                            </div>
                            <template v-if="lazyError">
                                <p>{{ lazyErrorMessage }}</p>
                            </template>    
                            <template v-if="formErrorBool">
                                <p v-for="(error, index) in formErrorArray" :key="index">
                                    {{ error }}
                                </p>
                            </template>
                        </div>
                    </div>
                    <div class="col-md-6 leftborderyea">
                        <div class="toptitle">
                            Lazy Preview
                        </div>
                        <div class="q-pa-lg">
                            <div class="q-pa-lg">
                                <p>Icon Image</p>
                                <img class="responsive imagefixer" :src="imageIconBlob" alt="">
                            </div>
                            <div class="q-pa-lg">
                                <p>Avatar Image</p>
                                <img class="responsive imagefixer" :src="imageAvatarBlob" alt="">
                            </div>
                            <div class="q-pa-lg">
                                <p>Banner Image</p>
                                <img class="responsive imagefixer" :src="imageBannerBlob" alt="">
                            </div>
                        </div>
                    </div>                
                </div>
            </div>
        </q-layout>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import moment from 'moment';
import CharacterService from '@/_services/characterService';
import MCategoryService from '@/_services/mcategoryService';
import myAmazonS3Service from '@/_services/myAmazons3Service';
import AmazonHelper from '@/static/helpers/amazons3';
import swal from 'sweetalert2';

// use this as copy and paste for making .vue files, change name
@Component
export default class CreateCharacter extends Vue {
    // other form vars
    public selectCategory = '';
    public categoryOptions: any[] = [];

    // for url generating
    public completeIconURL = '';
    public completeAvatarURL = '';
    public completeBannerURL = '';
    // Upload with normal file input form
    public selectedFileIcon = null;
    public imageIconBlob = '';
    public selectedIconImageName = '';
    // avatar
    public selectedFileAvatar = null;
    public imageAvatarBlob = '';
    public selectedAvatarImageName = '';
    // banner
    public selectedFileBanner = null;
    public imageBannerBlob = '';
    public selectedBannerImageName = '';

    // object where we store user input and alter as well to persist to db.
    public createCharacter = {
        name: '',
        slug: '',
        altName: '',
        background: '',
        backgroundSource: '',
        description: '',
        descriptionSource: '',
        shortInfo: '',
        iconImageURL: '',
        avatarImageURL: '',
        bannerImageURL: '',
        isPublic: false,
        submittedBy: this.$store.state.user.displayName,
        fk_mainCategoryId: '',
        fk_userId: this.$store.state.user.id,
    };
    public slugPreview = '';

    // form specific
    public formError: any = null;
    public formErrorBool = false;
    public checkboxCreate = false;
    // an array to store all the errors lol
    public formErrorArray: any[] = [];
    // lazy error
    public lazyError = false;
    public lazyErrorMessage = 'Please fill out the entire form.';

    // watching description length
    @Watch('createCharacter.description', { immediate: true })
    public onChangeD(value: any) {
        // we just watch it
        // console.log(this.createCharacter.description.length);
    }

    @Watch('selectCategory', { immediate: true })
    public onChange(value: any) {
        // console.log(parseInt(this.selectCategory, 10));
    }

    @Watch('createCharacter.name', { immediate:  true })
    public onChangeS(value: any) {
        this.slugPreview = this.createCharacter.name;
        // create the slug
        const slugFromName = this.createCharacter.name.toLowerCase().replace(/\s/g, '-');
        this.slugPreview = slugFromName;
        this.createCharacter.slug = slugFromName;
    }

    // Here we do some pre-fetching to display
    public async beforeCreate() {
        // load up the main categories
        try {
            const mcatResponse = (await MCategoryService.index()).data;
            mcatResponse.forEach((element) => {
                const sId = element.uuid.toString();
                console.log(sId);
                const completeValue = sId + element.name;
                this.categoryOptions.push({ label: element.name, value: completeValue });
                // console.log(completeValue);
            });
            // console.log(this.categoryOptions[0].value);
        } catch (error) {
            // error
        }
    }

    // File input upload
    public onFileIconSelected(event) {
      // Reference to the DOM input element
      // console.log(event.target.files[0]);
      this.selectedFileIcon = event.target.files[0];
      const input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // get name
        this.selectedIconImageName = event.target.files[0].name;
        // create a new FileReader to read this image and convert to base64 format
        const reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e: any) => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageBlob
          try {
            this.imageIconBlob = e.target.result;
            this.createCharacter.iconImageURL = this.imageIconBlob;
          } catch (error) {
              // error
          }
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    }

    public onFileAvatarSelected(event) {
      // Reference to the DOM input element
      // console.log(event.target.files[0]);
      this.selectedFileAvatar = event.target.files[0];
      const input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // get name
        this.selectedAvatarImageName = event.target.files[0].name;
        // create a new FileReader to read this image and convert to base64 format
        const reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e: any) => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageBlob
          try {
            this.imageAvatarBlob = e.target.result;
            this.createCharacter.avatarImageURL = this.imageAvatarBlob;
          } catch (error) {
              // error
          }
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    }

    public onFileBannerSelected(event) {
      // Reference to the DOM input element
      // console.log(event.target.files[0]);
      this.selectedFileBanner = event.target.files[0];
      const input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // get name
        this.selectedBannerImageName = event.target.files[0].name;
        // create a new FileReader to read this image and convert to base64 format
        const reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e: any) => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageBlob
          try {
            this.imageBannerBlob = e.target.result;
            this.createCharacter.bannerImageURL = this.imageBannerBlob;
          } catch (error) {
              // error
          }
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    }

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

    public async FileS3Upload(fileBlob, filename, filetype, filecharactername, filesubroot,
    filemainroot,
    imagePrefix,
    anumber,
    ) {
      if (this.createCharacter.name == null) {
        this.formErrorBool = true;
        this.formError = 'Hey! The character needs a name first!';
        return;
      }
      const newFileFolder = this.formatFileName(filecharactername);
      const NewcharacterName = filecharactername.toLowerCase().replace(/\s/g, '_');
      const newImageName = (imagePrefix + '_' + newFileFolder + '_' + filename).toLowerCase()
        .replace(/[^a-z0-9.]/g, '-').replace(/\s/g, '_');
      // let's make the url first and then upload
      if (anumber === 1) {
        this.completeIconURL = AmazonHelper.AmazonS3URLMaker(filemainroot,
        NewcharacterName, filesubroot, newImageName);
      }
      if (anumber === 2) {
        this.completeAvatarURL = AmazonHelper.AmazonS3URLMaker(filemainroot,
        NewcharacterName, filesubroot, newImageName);
      }
      if (anumber === 3) {
        this.completeBannerURL = AmazonHelper.AmazonS3URLMaker(filemainroot,
        NewcharacterName, filesubroot, newImageName);
      }
      const response = await myAmazonS3Service.s3PutSigner({
        variables: {
          filebody: fileBlob,
          filename: newImageName,
          filetype,
          filecharname: filecharactername,
          filesubroot,
          filefolder: newFileFolder,
          filemainroot,
        },
      }); // TODO: same with typescript remove .data
      // return completeURL
    }

    public async createNewCharacter() {
      // call API
      try {
        if (this.checkboxCreate) {
          // set true because of checker
          // this.character.isPublic = true
          // for images we will store them in database and store that url
          // check if there are image first
          if (this.createCharacter.name === '') {
            this.formErrorBool = true;
            this.formError = 'You are missing the name.';
          }
          if (this.selectedFileIcon == null || this.selectedFileAvatar == null || this.selectedFileBanner == null) {
            this.formErrorBool = true;
            this.formError = this.formError + ' ' + 'You are missing some images darling...';
            return;
          }
          // ignore object could be null
          const Iconname = this.selectedFileIcon.name;
          const IconType = this.selectedFileIcon.type;
          const Iconfile = this.imageIconBlob;

          const Rendername = this.selectedFileAvatar.name;
          const RenderType = this.selectedFileAvatar.type;
          const Renderfile = this.imageAvatarBlob;

          const Bannername = this.selectedFileBanner.name;
          const BannerType = this.selectedFileBanner.type;
          const Bannerfile = this.imageBannerBlob;

          // uploads after success
          // now upload images and get URL, will be inside promise functions
          const dbIconURL = this.FileS3Upload(Iconfile, Iconname, IconType,
            this.createCharacter.name, 'profile', 'characters', 'icon', 1);
          const dbAvatarURL = this.FileS3Upload(Renderfile, Rendername, RenderType,
            this.createCharacter.name, 'profile', 'characters', 'avatar', 2);
          const dbBannerURL = this.FileS3Upload(Bannerfile, Bannername, BannerType,
            this.createCharacter.name, 'profile', 'characters', 'banner', 3);

          this.createCharacter.iconImageURL = this.completeIconURL;
          this.createCharacter.avatarImageURL = this.completeAvatarURL;
          this.createCharacter.bannerImageURL = this.completeBannerURL;
          // console.log(this.character.bannerImageURL)

          // set category
          // category split up to 36 characters for uuid.
          this.createCharacter.fk_mainCategoryId = this.selectCategory.slice(0, 36);

          // create the slug
          const slugFromName = this.createCharacter.name.toLowerCase().replace(/\s/g, '-');
          this.createCharacter.slug = slugFromName;

          // set back to false for isPublic and other bools
          this.createCharacter.isPublic = false;
          this.formErrorBool = false;
          await CharacterService.post(this.createCharacter).then(() => {
            const toast = (swal as any).mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
            });
            toast({
              type: 'success',
              title: 'Character submitted successfully!',
            });
            // now redirect to tool?
            this.lazyError = false;
            this.$router.push({
                name: 'user-tools',
                params: {
                    username: this.$store.state.user.username,
                },
            });
            // this.clearForm();
          },
          );
        } else {
          swal({
            title: 'Error!',
            text: 'You must check the confirm checkbox above for confirmation!',
            type: 'error',
            confirmButtonText: 'I understand.',
          });
        }
      } catch (err) {
        this.lazyError = true;
        const statusCode = err.response.request.status;
        let dateTime = new Date('2015-06-17 14:24:36').toString();
        dateTime = moment(dateTime).format('YYYY-MM-DD HH:mm:ss');
        const errorItem = { date: dateTime, status: statusCode, error: err.response.data.error };
        // console.log(errorItem)
        this.formErrorArray.push(errorItem);
        // console.log(this.formErrorArray)
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

.toptitle {
    font-weight: bold;
    font-size: 1.2em;
}

.leftborderyea {
    border-left: 2px solid black;
    padding: 0em 1em 0em 1em;
}

.imagefixer {
    max-height: 200px;
}

.jbtn-file {
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border: 2px solid black;
}

.jbtn-file input[type=file] {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    text-align: right;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;
    cursor: inherit;
    display: block;
}
</style>