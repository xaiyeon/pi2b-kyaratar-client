<template>
    <div>
        <q-layout>
            <div class="q-pa-lg">
                <div class="row">
                    <div class="col-md-6">
                        <div class="toptitle">Edit Character</div>
                        <div>
                            <p>Editing a character means that there was more to offer to the database. We
                            appreciate those that can add more and check for the validity of our data. If valid, 
                            you will be awarded more points!
                            </p>
                        </div>
                        <div>
                            <q-input v-model="editCharacter.name" type="text" float-label="Name" maxlength="64"/>
                            <q-input v-model="editCharacter.slug" :readonly="true" type="text" float-label="Slug Name"/>
                            <q-input v-model="editCharacter.altName" type="text" float-label="Alternative Name" maxlength="64"/>
                            <q-input v-model="editCharacter.background" type="textarea" float-label="Description"/>
                            <q-input v-model="editCharacter.backgroundSource" type="text" float-label="Description Source" maxlength="64"/>
                            <q-input v-model="editCharacter.shortInfo" type="textarea" float-label="Short Intro" maxlength="100"/>
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
                            <q-btn color="purple-6 whiten" label="Save" @click="Save">
                            </q-btn>
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
import character from '@/_router/character';

// TODO: check for edge cases...
@Component
export default class EditCharacter extends Vue {
    // form specific
    public formError: any = null;
    public formErrorBool = false;
    public checkboxCreate = false;
    // an array to store all the errors lol
    public formErrorArray: any[] = [];

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
    public editCharacter = {
        name: '',
        slug: '',
        altName: '',
        background: '',
        backgroundSource: '',
        shortInfo: '',
        iconImageURL: '',
        avatarImageURL: '',
        bannerImageURL: '',
        isPublic: false,
        fk_mainCategoryId: null,
    };
    public slugPreview = '';

    // watching description length
    @Watch('editCharacter.description', { immediate: true })
    public onChangeD(value: any) {
        // we just watch it
        // console.log(this.editCharacter.description.length);
    }

    @Watch('selectCategory', { immediate: true })
    public onChange(value: any) {
        this.editCharacter.fk_mainCategoryId = value.slice(0, 36);
        // console.log(parseInt(this.selectCategory, 10));
    }

    @Watch('editCharacter.name', { immediate:  true })
    public onChangeS(value: any) {
        this.slugPreview = this.editCharacter.name;
        // create the slug
        const slugFromName = this.editCharacter.name.toLowerCase().replace(/\s/g, '-');
        this.slugPreview = slugFromName;
        this.editCharacter.slug = slugFromName;
    }

    // Here we do some pre-fetching to display
    public async beforeCreate() {
        // load up the main categories
        try {
            const mcatResponse = (await MCategoryService.index()).data;
            mcatResponse.forEach((element) => {
                const sId = element.uuid.toString();
                const completeValue = sId + element.name;
                this.categoryOptions.push({ label: element.name, value: completeValue });
                // console.log(completeValue);
            });
            // console.log(this.categoryOptions[0].value);
        } catch (error) {
            // error
        }
        // load up the character
        try {
            const characterId = this.$store.state.route.params.characterId;
            const charaSlug = this.$store.state.route.params.slug;
            const fkmCategoryId = this.$store.state.route.params.fkmCategoryId;
            this.editCharacter = (await CharacterService.show(characterId, charaSlug, charaSlug)).data[0];
            // now we assign photo name?
            this.selectedIconImageName = this.editCharacter.iconImageURL;
            this.selectedAvatarImageName = this.editCharacter.avatarImageURL;
            this.selectedBannerImageName = this.editCharacter.bannerImageURL;
            const matchCatWithSelect = this.editCharacter.fk_mainCategoryId;
            // now for image blob and image itself
            this.imageIconBlob = this.editCharacter.iconImageURL;
            this.imageAvatarBlob = this.editCharacter.avatarImageURL;
            this.imageBannerBlob = this.editCharacter.bannerImageURL;
            // console.log(matchCatWithSelect);
            this.categoryOptions.forEach((element) => {
                // console.log(element);
                const filter = parseInt(element.value, 10);
                // console.log(filter);
                if (filter === matchCatWithSelect) {
                    this.selectCategory = element.value;
                }
            });
            // console.log(this.editCharacter);
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
            this.editCharacter.iconImageURL = this.imageIconBlob;
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
            this.editCharacter.avatarImageURL = this.imageAvatarBlob;
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
            this.editCharacter.bannerImageURL = this.imageBannerBlob;
          } catch (error) {
              // error
          }
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    }

    // Amazon S3 things...
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
      if (this.editCharacter.name == null) {
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
      // console.log(response.data);
      // console.log(response.data.url);
      return response.data.url;
    }

    public async Save() {
        try {
            let dbIconURL: any;
            let dbAvatarURL: any;
            let dbBannerURL: any;
            // First check if there is no picture and then do those methods
            if (this.editCharacter.iconImageURL !== undefined) {
            // if we have something we want to overwrite
            // ignore object could be null
                if (this.selectedFileIcon !== null) {
                    const Iconname = this.selectedFileIcon.name;
                    const IconType = this.selectedFileIcon.type;
                    const Iconfile = this.imageIconBlob;
                    // now upload images and get URLs
                    // will be inside promise functions
                    dbIconURL = await this.FileS3Upload(Iconfile, Iconname, IconType,
                        this.editCharacter.name, 'profile', 'characters', 'icon', 1).then((data) => {
                            // console.log(data);
                            this.editCharacter.iconImageURL = data;
                            // console.log('hello hello');
                            // console.log(this.editCharacter.iconImageURL);
                        });
                }
            } else {
                dbIconURL = this.editCharacter.iconImageURL;
            }
            if (this.editCharacter.avatarImageURL !== undefined) {
            // if we have something we want to overwrite
            // ignore object could be null
                if (this.selectedFileAvatar !== null) {
                    const Rendername = this.selectedFileAvatar.name;
                    const RenderType = this.selectedFileAvatar.type;
                    const Renderfile = this.imageAvatarBlob;
                    dbAvatarURL = await this.FileS3Upload(Renderfile, Rendername, RenderType,
                        this.editCharacter.name, 'profile', 'characters', 'avatar', 2);
                    this.editCharacter.avatarImageURL = dbAvatarURL;
                }
            } else {
                dbAvatarURL = this.editCharacter.avatarImageURL;
            }
            if (this.editCharacter.bannerImageURL !== undefined) {
            // if we have something we want to overwrite
            // ignore object could be null
                if (this.selectedFileBanner !== null) {
                    const Bannername = this.selectedFileBanner.name;
                    const BannerType = this.selectedFileBanner.type;
                    const Bannerfile = this.imageBannerBlob;
                    dbBannerURL = await this.FileS3Upload(Bannerfile, Bannername, BannerType,
                    this.editCharacter.name, 'profile', 'characters', 'banner', 3);
                    this.editCharacter.bannerImageURL = dbBannerURL;
                }
            } else {
                dbBannerURL = this.editCharacter.bannerImageURL;
            }
            // console.log('RUN RUN RUN');
            // console.log(this.editCharacter.iconImageURL);
            const response = await (CharacterService.put(this.editCharacter));
            // console.log(response);
        } catch (error) {
            // console.log(error);
            // error
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