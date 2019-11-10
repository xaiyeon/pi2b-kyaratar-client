<template>
    <div>
        <template>
            <div>
                <q-layout>
                    <q-layout-header>
                        <q-toolbar color="tertiary">
                            <div class="row inline flex-center">
                                <div class="col-auto">
                                    <q-toolbar-title class="q-headline q-pa-md">
                                        <span style="font-size: 1.1em; font-weight: 500;">Character Rankings
                                            <q-btn round dense color="dark" icon="info">
                                                <q-tooltip anchor="bottom middle" self="top middle">
                                                    Rankings are updated once a day.
                                                </q-tooltip>
                                            </q-btn>
                                        </span> 
                                        <br>
                                    </q-toolbar-title>
                                </div>
                                <div class="col-auto q-pa-md">
                                    <q-btn
                                        text-color="black"
                                        :glossy="true"
                                        color="amber"
                                        @click="showLeft = !showLeft"
                                        icon="menu"
                                        label="Menu"
                                    />
                                </div>
                            </div>
                        </q-toolbar>
                    </q-layout-header>
                    <q-page-container>
                        <q-page>
                            <q-layout>
                                <!-- Left Side Drawer, Only show certain things unless logged in user is part of the group -->
                                <q-layout-drawer side="left" v-model="showLeft">
                                    <q-list no-border link inset-separator>
                                    <q-list-header>Filter Menu</q-list-header>
                                    <q-item>
                                        <q-input type="number" v-model="filterObj.maxRankRange" float-label="Max Rank Range" placeholder="Max" />
                                        <q-input type="number" v-model="filterObj.minRankRange" float-label="Low Rank Range" placeholder="Min" />
                                    </q-item>
                                    <div class="q-pa-md">
                                        <q-select multiple v-model="filterObj.categories" float-label="Select a Category" :options="categoryOptions"/>
                                    </div>
                                    <q-item>
                                        <q-checkbox v-model="pagination.isfilter" label="Enable" />
                                        <div class="q-pl-md"></div>
                                        <q-btn label="Filter" @click="getCharacterRanked()"></q-btn>
                                    </q-item>
                                    </q-list>
                                </q-layout-drawer>
                                <q-page-container>
                                    <q-page>
                                        <div class="row">
                                            <div class="col-lg-12">

                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-12">
                                                <div style="text-align: center;">
                                                    <center>
                                                        <br>
                                                    <q-pagination
                                                    v-model="pagination.pageNumber"
                                                    color="purple"
                                                    :min="1"
                                                    :max="pagination.maxPages"
                                                    :max-pages="8"
                                                    boundary-links
                                                    />
                                                    </center>
                                                    <div v-for="(character, index) in characters" :key="index" 
                                                    class="row shadow-6 q-ma-md"
                                                    >
                                                        <div class="col-lg-12 q-pa-md">
                                                            <div class="flex">
                                                                <div>
                                                                    <q-chip class="shadow-1" square color="primary">{{ character.rank }}</q-chip>
                                                                </div>
                                                                <div class="flex">
                                                                    <div style="min-width: 50vw;">
                                                                        <div class="flex">
                                                                        <div style="float: left;" class="flex">
                                                                            <img class="fiximage" :src="character.avatarImageURL" alt="">
                                                                        </div>
                                                                        <div class="flex q-pa-sm" style="font-size: 1.1em; font-weight: 400;">
                                                                            <span class="charName" style="cursor:pointer;" @click="navigateToCharacter('character', character.id, character.slug, character.uuid)">{{ character.name }}</span>
                                                                        </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="q-pl-lg">

                                                                    </div>
                                                                    <div>
                                                                        <div style="color: blue; padding-right: 1.4em;">
                                                                            {{ character.viewCount}}
                                                                            <br />
                                                                            <span style="font-size: 0.75em;">Views</span>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div style="color: red; padding-right: 1.4em;">
                                                                            {{ character.favoriteCount}}
                                                                            <br />
                                                                            <span style="font-size: 0.75em;">Favorites</span>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div style="color: purple; padding-right: 1.4em;">
                                                                            {{ character.likeCount}}
                                                                            <br />
                                                                            <span style="font-size: 0.75em;">Likes</span>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div style="color: black; padding-right: 1.4em;">
                                                                            <span style="font-size:1.1em;">{{ character.score}}</span>
                                                                            <br />
                                                                            <span style="font-size: 0.75em;">Total Score</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <center>
                                                        <br>
                                                    <q-pagination
                                                    v-model="pagination.pageNumber"
                                                    color="purple"
                                                    :min="1"
                                                    :max="pagination.maxPages"
                                                    :max-pages="8"
                                                    boundary-links
                                                    />
                                                    </center>
                                                    <br>
                                                </div>
                                            </div>
                                        </div>
                                    </q-page>
                                </q-page-container>
                            </q-layout>
                        </q-page>
                    </q-page-container>
                </q-layout>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import CharacterService from '@/_services/characterService';
import MCategoryService from '@/_services/mcategoryService';

// use this as copy and paste for making .vue files, change name
@Component
export default class CharacterRankings extends Vue {
    public showLeft = false;
    public maxRange = 0;

    public categoryOptions: any[] = [];

    public characters = [];
    public characterCount = 0;

    // pagination for character with filters
    public pagination = {
        pageNumber: 1,
        itemsPerPage: 10,
        maxPages: null,
        isfilter: false,
    };

    public filterObj = {
        maxRankRange: 0,
        minRankRange: 0,
        categories: [],
    };

    @Watch('pagination.pageNumber', { immediate: true })
    public onChangePage(value: any) {
        this.pagination.pageNumber = value;
        // console.log(this.pagination);
        // console.log(this.pagination.pageNumber);
        this.getCharacterRanked();
    }

    public async getCharacterRanked() {
        try {
            if (this.pagination.isfilter) {
                // uuid extract for main category
                let originalCatSelection = [];
                const tempCats = [];
                originalCatSelection = this.filterObj.categories;
                this.filterObj.categories.forEach((element) => {
                    // console.log(element.slice(0, 36));
                    tempCats.push(element.slice(0, 36));
                });
                this.filterObj.categories = [];
                this.filterObj.categories = tempCats;
                this.characters = [];
                // after empty we repopulate
                const response = (await CharacterService.getRanks(
                this.pagination.pageNumber,
                this.pagination.itemsPerPage,
                this.pagination.isfilter,
                this.filterObj,
                )).data;
                this.characters = response.result;
                this.pagination.maxPages = response.pages;
                this.characterCount = response.count;
                // empty
                this.filterObj.categories = originalCatSelection;
            } else {
                const response = (await CharacterService.getRanks(
                this.pagination.pageNumber,
                this.pagination.itemsPerPage,
                this.pagination.isfilter,
                this.filterObj,
                )).data;
                this.characters = response.result;
                this.pagination.maxPages = response.pages;
                this.characterCount = response.count;
            }
            // console.log(response[0]);
        } catch (error) {
            // error
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

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }

    // Here we do some pre-fetching to display
    public async beforeCreate() {
        // load up the main categories
        try {
            const mcatResponse = (await MCategoryService.index()).data;
            mcatResponse.forEach((element) => {
                const sId = element.uuid.toString();
                // console.log(sId);
                const completeValue = sId + element.name;
                this.categoryOptions.push({ label: element.name, value: completeValue });
                // console.log(completeValue);
            });
            // console.log(this.categoryOptions[0].value);
        } catch (error) {
            // error
        }
    }

}
</script>

<style scoped lang="scss">

.fiximage {
    width:3vw;
    height:8vh;
}

.charName:hover {
    color: rgb(150, 21, 133);
}

</style>