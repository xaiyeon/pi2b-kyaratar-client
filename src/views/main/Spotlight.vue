<template>
    <div>
        <template v-if="serviceOkay">
            <q-layout>
                <q-page-container>
                    <q-page>
                        <div class="q-pa-md">
                            <div class="row">

                                    <div class="col-lg-3">
                                        <template>
                                            <div>
                                                <div class="titleSection">
                                                    Latest Headlines
                                                </div>
                                                <br>
                                                <div>
                                                    <skwheadlines />
                                                </div>
                                                <div>
                                                    <div class="shadow-7">
                                                        <div class="q-pa-sm">
                                                            <InFeedAdsense
                                                                data-ad-layout-key="-ef+6k-30-ac+ty"
                                                                data-ad-client="ca-pub-2205062591937598"
                                                                data-ad-slot="4372062573">
                                                            </InFeedAdsense>
                                                        </div>
                                                    </div>
                                                    <br>
                                                </div>
                                                <div>
                                                    <annnews />
                                                </div>
                                                <div>
                                                    <ignnews />
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                    <div class="col-lg-7">
                                        <template>
                                            <div class="titleSection">
                                                Spotlight
                                            </div>
                                            <div class="q-pa-md">
                                                <div v-if="mainCharacterSpotlight" class="row">
                                                    <div class="col-lg-8 shadow-5">
                                                        <div>
                                                            <div class="mainbg" v-bind:style="[mainCharacterSpotlight.bannerImageURL != '' & mainCharacterSpotlight.bannerImageURL != null ? { backgroundImage: 'url(' + mainCharacterSpotlight.bannerImageURL + ')' } : { backgroundImage: 'url(' + require('@/assets/images/placeholder/default_bg_image.jpg') + ')' }]" >
                                                                <div class="q-pa-lg">
                                                                    <div>
                                                                        <q-chip color="blue-5">
                                                                            {{ mainCharacterSpotlight.MainCategory.name }}
                                                                        </q-chip>
                                                                        <div class="flex row wrap" style="padding-left: 0.5em;">
                                                                            <div class="q-pa-sm" v-for="(tag, index) in mainCharacterSpotlight.Tags" :key="index">
                                                                                <q-chip color="black">
                                                                                    {{ tag.name }}
                                                                                </q-chip>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="hvr-bubble-right">
                                                                        <img class="avaCharaImg responsive" :src="mainCharacterSpotlight.avatarImageURL" alt="">
                                                                        <q-tooltip class="customtooltip" anchor="center right" self="center middle" :offset="[210, 50]">
                                                                            <div >
                                                                                <b>Who is this?</b>
                                                                                {{ mainCharacterSpotlight.background }}
                                                                            </div>
                                                                        </q-tooltip>
                                                                    </div>
                                                                    <div class="shadow-5 backName">
                                                                        <div class="charaNameLink characterName" @click="navigateToCharacter('character', mainCharacterSpotlight.id, mainCharacterSpotlight.slug, mainCharacterSpotlight.uuid)">
                                                                            <center>#{{ mainCharacterSpotlight.rank }} | {{ mainCharacterSpotlight.name }}</center>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4">
                                                        <div class="row q-pa-md q-ma-sm shadow-4 hvr-shutter-in-vertical" v-for="(character, index) in subCharacterSpotlight" :key="index">
                                                            <div class="col-lg-12">
                                                                <span>
                                                                    <div class="flex">
                                                                        <div class="avaCharaImgSmall">
                                                                            <img class="responsive" :src="character.avatarImageURL" alt="">
                                                                        </div>
                                                                        <q-chip square color="blue-5">
                                                                            {{ character.MainCategory.name }}
                                                                        </q-chip>
                                                                    </div>
                                                                    <br>
                                                                    <div class="charaNameLink hvr-bob" @click="navigateToCharacter('character', character.id, character.slug, character.uuid)">
                                                                        #{{ character.rank }} | {{ character.name }}
                                                                    </div>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br>
                                                <div class="row">
                                                    <div class="col-lg-8">
                                                        <div>
                                                            main guild
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4">
                                                        <div class="row">
                                                            <div class="col-lg-12">
                                                                sub guilds
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br>
                                                <gss />
                                                <br>
                                                <div class="row">
                                                    <div class="col-lg-12 shadow-5">
                                                        <q-alert icon="person" color="black">Newly Added Characters 
                                                                    <q-btn round dense color="dark" icon="info">
                                                                        <q-tooltip anchor="bottom middle" self="top middle">
                                                                            Double click on a character to check it out!
                                                                        </q-tooltip>
                                                                    </q-btn>
                                                        </q-alert>
                                                        <div>
                                                            <newlyaddedcharacters />
                                                        </div>
                                                    </div>
                                                </div>
                                                <br>
                                                <div class="row">
                                                    <div class="col-lg-12">
                                                        <q-alert icon="image" color="black">Newly Added Character Images</q-alert>
                                                    </div>
                                                </div>
                                                <br>
                                                <div class="row">
                                                    <div class="col-lg-12">
                                                        <q-alert icon="video_label" color="black">Newly Added Character Videos</q-alert>
                                                    </div>
                                                </div>
                                                <br>
                                                <div class="row">
                                                    <div class="col-lg-12">
                                                        <q-alert icon="flash_on" color="black">Newly Battle Ready Characters</q-alert>
                                                    </div>
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                    <div class="col-lg-2">
                                        <template>
                                                <div class="titleSection">
                                                    Trending Characters
                                                </div>
                                                <div>
                                                    <trendingcharacters />
                                                </div>
                                        </template>
                                        <hr>
                                        <template>
                                                <div class="titleSection">
                                                    Popular Characters
                                                    
                                                </div>
                                                <div>
                                                    <popularcharacters />
                                                </div>
                                        </template>
                                        <hr>
                                        <template>
                                            <div class="titleSection">
                                                Affiliates & Sponsors
                                            </div>
                                        </template>
                                    </div>

                            </div>
                        </div>
                    </q-page>
                </q-page-container>
            </q-layout>
        </template>
        <template v-else>
            <server-down/>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import NotAvailable from '../../components/_shared/NotAvailable.vue';
import SKWHeadlines from '../../components/_main/spotlight/SunKoiWishHeadlines.vue';
import PopularCharacters from '../../components/_main/spotlight/PopularCharacters.vue';
import TrendingCharacters from '../../components/_main/spotlight/TrendingCharacters.vue';
import spotlightService from '@/_services/spotlightService.ts';
import NewlyAddedCharacters from '../../components/_main/spotlight/NewlyAddedCharacters.vue';
import GroupSectionSpotlight from '../../components/_main/spotlight/GroupsSectionSpotlight.vue';
import AnnNews from '../../components/_main/spotlight/ANNNews.vue';
import IGNNews from '../../components/_main/spotlight/IGNNews.vue';
import APICheckService from '../../_services/apiCheckService';

@Component({
    components: {
        NotAvailable,
        skwheadlines: SKWHeadlines,
        popularcharacters: PopularCharacters,
        trendingcharacters: TrendingCharacters,
        newlyaddedcharacters: NewlyAddedCharacters,
        gss: GroupSectionSpotlight,
        annnews: AnnNews,
        ignnews: IGNNews,
    },
})
export default class Spotlight extends Vue {
    public serviceOkay = false;
    public mainCharacterSpotlight = null;
    public subCharacterSpotlight = [];
    public checkerObjects = {
        serviceStatus: false,
        message: 'checking...',
    };

  public async mounted() {
        try {
            const serviceStatusResponse = (await APICheckService.check(this.checkerObjects)).data;
            // console.log(serviceStatus);
            this.serviceOkay = serviceStatusResponse.serviceStatus;
            // console.log(this.serviceOkay);
        } catch (error) {
            // error
            // console.log(error);
        }
        try {
            const response = (await spotlightService.characterSpotlight()).data;
            this.mainCharacterSpotlight = response[0];
            let tempChara = response;
            tempChara = tempChara.shift();
            this.subCharacterSpotlight = tempChara;
            // console.log(this.mainCharacterSpotlight);
            this.subCharacterSpotlight = response;
            // console.log(response);
        } catch (error) {
            // an error
        }
  }

    public navigateToCharacter(url, cid, cslug, xuuid) {
        // console.log(cid);
        // You can also access store, so when navigating you store new values in state.
        // this.$route.params.characterId = cid;
        // this.$route.params.slug = cslug;
        this.$router.push({
            name: url,
            params: {
                uuid: xuuid,
                slug: cslug,
            },
        });
    }

}
</script>

<style>

.customtooltip {
    width: 20vw;
}

.mainbg {
    background-size: cover;
}

.charaNameLink:hover {
    cursor: pointer;
    color: rgb(250, 119, 228);
}

.backName {
    background: rgba(5, 5, 5, 0.8);
}

.avaCharaImgSmall {
    width: 60px;
    height: 60px;
    overflow: hidden;
}

.characterName {
    color: white;
    font-size: 1.6em;
    font-weight: bold;
}

.avaCharaImg {
    width: 300px;
    max-height: 300px;
    height: 250px;
}

.titleSection {
    font-size: 1.2em;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
}

</style>
