<template>
    <div class="shadow-4">
        <div v-if="characterL[0]">
            <div class="hero-banner" v-bind:style="{ backgroundImage: 'url(' + characterL[0].bannerImageURL + ')' }">
                <div class="hero-photo">
                    <img style="width: 220px; height: 280px" :src="characterL[0].avatarImageURL" alt="characterL.avatarImageURL">
                </div>
            </div>
            <div class="spacer">
                <div class="colorSpacer"></div>
                <div class="row">
                    <div class="col">
                        <div class="row">
                            <div class="col-md-auto">
                                <img :style="{ border: characterL[0].moralityColor + ' ' + 'solid 5px' }" :src="characterL[0].iconImageURL" class="squareIcon float-left" alt="">
                            </div>
                            <div class="col-md-auto">
                                <div style="padding-left: 1em;">
                                    <h4>
                                        {{ characterL[0].altName }}
                                    </h4>
                                    <h5>
                                        {{ characterL[0].name }}
                                    </h5>
                                </div>
                                <div class="flex row wrap" style="padding-left: 1em;">
                                    <div class="q-pa-sm" v-for="(tag, index) in characterL[0].Tags" :key="index">
                                        <q-chip color="black">
                                            {{ tag.name }}
                                        </q-chip>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                
                            </div>
                            <div class="col-md-2">
                                <div class="q-pa-sm">
                                    <q-chip style="cursor: pointer;" @click="goToUserProfile(characterL[0].submittedBy)" >Submitted by: {{ characterL[0].submittedBy }}</q-chip>
                                </div>
                                <div class="q-pa-sm">
                                    <q-chip >Approved by: {{ characterL[0].approvedBy}}</q-chip>
                                </div>
                                <span>
                                    <q-btn-group>
                                        <template v-if="isUserLoggedIn">
                                                <q-btn color="red" @click="favorite(characterL[0].uuid)" v-if="!UserFavorite">
                                                    Favorite
                                                </q-btn>                                            
                                                <q-btn color="primary" @click="unfavorite(characterL[0].uuid)" v-else>
                                                    Unfavorite
                                                </q-btn>                                             
                                        </template>
                                        <template v-if="modesChild.edit != true && isUserLoggedIn && $store.state.userRole.rank < 5">
                                            <div style="">
                                                <q-btn color="purple" class="purple darken-2 white--text"
                                                @click="navigateTo({
                                                    name:'character-edit',
                                                    params: {
                                                        characterId: characterL[0].id,
                                                        slugName: characterL[0].slug,
                                                    }
                                                })"
                                                >Mod Edit
                                                </q-btn>
                                            </div>
                                        </template>
                                        <template v-if="modesChild.edit != true && isUserLoggedIn && $store.state.userRole.rank < 9 && characterL[0].isEditable">
                                            <div style="">
                                                <q-btn color="purple" class="purple darken-2 white--text"
                                                @click="navigateTo({
                                                    name:'character-edit',
                                                    params: {
                                                        characterId: characterL[0].id,
                                                        slugName: characterL[0].slug,
                                                    }
                                                })"
                                                >Edit
                                                </q-btn>
                                            </div>
                                        </template>
                                    </q-btn-group>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col" glossy align="justify">
                    <q-tabs>
                        <q-tab default name="overview" slot="title" icon="person" label="Overview" />
                        <q-tab name="status" slot="title" icon="search" label="Status" />
                        <q-tab name="media" slot="title" icon="art_track" label="Media" />
                        <q-tab name="fanmedia" slot="title" icon="art_track" label="Fan Media" />
                        <q-tab name="statistics" slot="title" icon="timeline" label="Statistics" />

                        <q-tab-pane name="overview">
                            <div class="row">
                                <div class="col-md-12">
                                    <p>
                                        {{ characterL[0].name }} is considered a/an 
                                        <span v-if="fkMainCategory">
                                            <q-chip square color="primary">{{ characterL[0].MainCategory.name }}</q-chip>
                                                <q-tooltip class="customtooltip" anchor="bottom middle" self="top middle">
                                                    <div >
                                                        <b>What is this?</b>
                                                        <br>
                                                        {{ characterL[0].MainCategory.description }}
                                                    </div>
                                                </q-tooltip>
                                        </span> character.
                                    </p>
                                    <div class="q-pa-md">
                                        <div class="overviewTitle">
                                            Background
                                        </div>
                                        {{ characterL[0].background }}
                                        <br />
                                        <p><span style="font-weight: bold">Source: </span>({{ characterL[0].backgroundSource }})</p>
                                    </div>                                    
                                </div>
                            </div>
                        </q-tab-pane>
                        <q-tab-pane name="status">
                            <div>
                                <p class="subtitlesC">Character Base Stats and Details</p>
                                <hr>
                                <div class="">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="attributesstyle">
                                                <div class="substylestats">
                                                    Morality Alignment Classification:
                                                </div>
                                                <span>
                                                    {{ characterL[0].moralityAlign }}
                                                </span>
                                                <div class="substylestats">
                                                    Labels:
                                                </div>
                                                <span v-for="(label ,index) in JSON.parse(characterL[0].labels)" :key="index">
                                                    <span>{{ label.name }} ({{ label.score }}), </span>
                                                </span>
                                                <hr>
                                                <div class="statsheading">Stats</div>
                                                <br>
                                                <div class="substylestats">
                                                    Health Points (HP):
                                                </div>
                                                <span>
                                                    {{ Number(characterL[0].healthPoints).toFixed(2) }}
                                                </span>
                                                <div class="substylestats">
                                                    Aura Points (AP):
                                                </div>
                                                <span>
                                                    {{ Number(characterL[0].auraPoints).toFixed(2) }}
                                                </span>
                                                <div class="substylestats">
                                                    Attack Points (ATK):
                                                </div>
                                                <span>
                                                    {{ Number(characterL[0].attackPoints).toFixed(2) }}
                                                </span>
                                                <div class="substylestats">
                                                    Magic Attack Points (MTK):
                                                </div>
                                                <span>
                                                    {{ Number(characterL[0].magicAttackPoints).toFixed(2) }}
                                                </span>
                                                <div class="substylestats">
                                                    Strength Points (STR):
                                                </div>
                                                <span>
                                                    {{ Number(characterL[0].strengthPoints).toFixed(2) }}
                                                </span>
                                                <div class="substylestats">
                                                    Intelligence Points (INT):
                                                </div>
                                                <span>
                                                    {{ Number(characterL[0].intelligencePoints).toFixed(2) }}
                                                </span>
                                                <div class="substylestats">
                                                    Defense Points (DEF):
                                                </div>
                                                <span>
                                                    {{ Number(characterL[0].defensePoints).toFixed(2) }}
                                                </span>
                                                <div class="substylestats">
                                                    Magic Defense Points (MDEF):
                                                </div>
                                                <span>
                                                    {{ Number(characterL[0].magicDefensePoints).toFixed(2) }}
                                                </span>
                                                <div class="substylestats">
                                                    Dextirity Points (DEX):
                                                </div>
                                                <span>
                                                    {{ Number(characterL[0].dextirityPoints).toFixed(2) }}
                                                </span>
                                                <div class="substylestats">
                                                    Luck Points (LUK):
                                                </div>
                                                <span>
                                                    {{ Number(characterL[0].luckPoints).toFixed(2) }}
                                                </span>
                                                <div class="substylestats">
                                                    Evasion Points (EVA):
                                                </div>
                                                <span>
                                                    {{ Number(characterL[0].evasionPoints).toFixed(2) }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </q-tab-pane>
                        <q-tab-pane name="media">
                            <div>
                                <p class="subtitlesC">Photos</p>
                                <hr>
                                <mediaphotos :characterL="characterL[0]" />
                            </div>
                            <div>
                                <p class="subtitlesC">Videos</p>
                                <hr>
                                <mediavideos :characterL="characterL[0]" />
                            </div>
                        </q-tab-pane>
                        <q-tab-pane name="fanmedia">

                        </q-tab-pane>
                        <q-tab-pane name="statistics">
                            <statistics :characterL="characterL[0]"/>
                        </q-tab-pane>
                    </q-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import swal from 'sweetalert2';
import MCategoryService from '../../_services/mcategoryService';
import Panel from '../_shared/Panel.vue';
import { CharacterModel } from '../../_models/Character';
import { MainCategoryModel } from '../../_models/MainCategory';
import { ViewMode } from '../../_helper_models/ViewMode';
// import ToolTipX from '../_shared/ToolTipX.vue'
import { mapState } from 'vuex';
import TrueCharacterFavoriteService from '../../_services/trueCharacterFavoriteService';
import MediaPhotos from './mediaPhotos.vue';
import MediaVideos from './mediaVideos.vue';
import Statistics from './statistics.vue';
import moment from 'moment';

// use this as copy and paste for making .vue files, change name
@Component({
    computed: {
        ...mapState([
            'isUserLoggedIn',
            'user',
        ]),
    },
    components: {
        mediaphotos: MediaPhotos,
        mediavideos: MediaVideos,
        statistics: Statistics,
    },
})
export default class CharacterLayout extends Vue {
    // Props passed to
    // Take note, we are passing an object from the parent to this layout for use!
    @Prop({default: { options: Object }})
    public characterL!: CharacterModel;

    @Prop({default: null})
    public modesChild!: ViewMode;

    @Prop({default: { options: Object }})
    public fkMainCategory!: MainCategoryModel;

    public labelArray = [];

    // data can just be define here using public
    public realCharacteruuid = null;
    public character;
    public UserFavoriteId;
    public UserFavorite = false;
    public UserFavoriteData;
    public UserLoggedIn;
    public doOnce: boolean = false;

    public characterTabs = [
        {key: 1, head: 'Overview', title: 'Description'},
        {key: 2, head: 'Status', title: 'Status'},
        {key: 3, head: 'Media', title: 'Photos'},
        {key: 4, head: 'Fan Media', title: 'Fan Art'},
        {key: 5, head: 'Statistics', title: 'Analysis'},
    ];

    // for checking favorite
    public userfaveChara = {
        uuid: '',
    };

    // watching character
    @Watch('characterL', { immediate: true })
    public async onPropertyChange(value: any) {
      if (this.$store.state.isUserLoggedIn) {
          try {
            this.checkIfFavorite();
          } catch (error) {
              // error
          }
      }
    }

    @Watch('userfaveChara', { immediate: true })
    public DataFavChange(value: any) {
        this.userfaveChara = value;
    }

    @Watch('UserFavorite', { immediate: true })
    public favChange(value: any) {
        this.UserFavorite = value;
    }

    // TODO: figure out dates conversion problem
    // @Watch('charaCreateDate', { immediate: true })
    // public charaCreateChange(value: any) {
    //     this.charaCreateDate = value;
    //     this.ccharaCreateDate = moment(this.charaCreateDate, ['MM-DD-YYYY', 'YYYY-MM-DD']).format('MMMM Do YYYY');
    // }

    public beforeCreate() {
        //
        try {
            // try
        } catch (error) {
            // and error
        }
    }

    public mounted() {
        try {
            this.labelArray = JSON.parse(this.characterL[0].labels);
            console.log(this.labelArray);
            this.realCharacteruuid = this.characterL[0].uuid;
            // only if logged in
            if (this.$store.state.isUserLoggedIn) {
                // console.log('hello');
                this.checkIfFavorite();
            }
        } catch (error) {
            // error
        }
    }

    public async checkIfFavorite() {
        try {
            console.log('checkiffavorite');
            // TODO: this returns NOTHING
            // console.log(this.$route.params.characterId); // this unedfined!, maybe try a different life  hook
            // we can use the character slug, get the uuid from it and use that.
            this.userfaveChara = (await TrueCharacterFavoriteService.index({
                fk_characterId: this.characterL[0].uuid,
            })).data[0];
            // console.log(this.userfaveChara);
            // console.log(userfaveChara);
            // console.log(userfave); // TODO: also undefined...
            if (this.userfaveChara) {
                this.UserFavoriteId = this.userfaveChara.uuid;
                this.UserFavorite = true;
                // console.log(this.UserFavorite);
            } else {
                this.UserFavoriteId = this.userfaveChara.uuid;
                this.UserFavorite = false;
            }
        } catch (error) {
            // console.log(error);
        // do error
        }
    }

    // https://router.vuejs.org/guide/essentials/passing-props.html#object-mode
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
        this.$router.push(e);
    }

    // user favorite character
    public async favorite(characterUUID) {
      // use uid instead
      // console.log(this.characterL.id);
      // console.log(characterUUID);
      try {
        const UserFavoriteDataX = (await TrueCharacterFavoriteService.post({
          fk_characterId: characterUUID,
        })).data;
        this.UserFavorite = true;
        // console.log('favorited');
        // console.log(UserFavoriteDataX);
        // so once we favorite we give it the id
        this.UserFavoriteId = UserFavoriteDataX.uuid;
        swal({
          position: 'center',
          type: 'success',
          title: 'Look Master!',
          text: 'Master, character ' + this.characterL[0].name + ' added to favorites!',
          showConfirmButton: false,
          timer: 3000,
        });
      } catch (error) {
        // something
      }
    }

    // user will unfavorite character
    public async unfavorite(characterUUID) {
      try {
        const charObj = {
            fk_characterId: this.realCharacteruuid,
            tcfuuid: characterUUID,
        };
        const deleteNow = (await TrueCharacterFavoriteService.delete(charObj)).data;
        this.UserFavorite = false;
      } catch (error) {
        // an error
      }
    }

}
</script>

<style scoped lang="scss">

.overviewTitle {
    font-size: 1.1em;
    font-weight: 600;
    padding-bottom: 0.5em;
}

.statsheading {
    font-size: 1.2em;
    font-weight: 700;
}

.substylestats {
    font-size:1.1em;
    font-weight: 600;
}

.subtitlesC {
    font-size: 1.8em;
    font-weight: bold;
}

.hero-banner {
  height: 400px;
  width: 100%;
  margin: 0;
  background-position: 50% 30%;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.hero-photo {
  position: absolute;
  top: -7%;
  left: 2%;
  transform: translate(10%, 67%);
  color: white;
  width: 100px;
  height: 250px;
}

.spacer{
    margin: 1em 1em 1em 1em;
    padding: 0.5em 0.5em 0.5em 0.5em;
}

.squareIcon{
    width: 150px;
    height: 180px;
}

.colorSpacer {
    min-width: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 1.0);
}

.customtooltip {
    color: white;
    width: 30vw;
    margin: 1em 1em 1em 1em;
}

h4 {
  color: #000;
  margin-top: 20%;
  margin-bottom: 0;
}

h5 {
  margin-top: -0.2em;
  line-height: 1em;
}

</style>