<template>
    <div>
        <template v-if="serviceOkay">
            <q-layout>
                <q-layout-header>
                    <q-toolbar color="tertiary">
                        <q-toolbar-title class="q-headline q-pa-md">
                            Newest Characters
                        </q-toolbar-title>
                    </q-toolbar>
                </q-layout-header>
                <q-page-container>
                    <q-page>
                        <div class="carouselInset" >
                            <carousel :navigateTo="carouselNav" :scrollPerPage="false" :perPageCustom="[[300, 1], [480, 1], [630, 2], [800, 2], [900, 3], [1124, 3], [1500, 5], [1800, 6]]" :navigationEnabled="true">
                                <slide  v-for="character in characters" :key="character.id">
                                    <div class="shadow-4 cardspacing">
                                        <div class="row">
                                            <div class="col">
                                                <q-card flat inline class="q-ma-sm no-margin full-height">
                                                <q-card-media>
                                                    <img :src="character.avatarImageURL" style="max-height: 15.2em;">
                                                    <q-card-title slot="overlay">
                                                        {{ character.name }}
                                                    <q-tooltip anchor="bottom middle" self="top middle">
                                                        {{ character.moralityAlign }}
                                                    </q-tooltip>
                                                    <span slot="subtitle">
                                                        {{ character.altName }}
                                                    </span>
                                                    </q-card-title>
                                                </q-card-media>
                                                <q-card-main :style="{ border: character.moralityColor + ' ' + 'solid 5px' }" class="fit">
                                                    <p>
                                                        <q-chip icon="remove_red_eye">{{ character.viewCount }}</q-chip>
                                                        <template v-if="character.isStatReady">
                                                            <q-chip square color="secondary" icon="check" class="shadow-1">SR</q-chip>
                                                            <q-tooltip anchor="bottom middle" self="top middle">
                                                                Status Ready
                                                            </q-tooltip>
                                                        </template>
                                                    </p>
                                                    <p class="fixshortdesc">{{ character.shortInfo }}</p>
                                                    <q-card-actions>
                                                        <q-btn color="primary" label="View"
                                                        @click="navigateToCharacter('character', character.id, character.slug, character.uuid)"
                                                        />
                                                        <!-- <q-btn color="primary" label="Favorite" />
                                                        <q-btn color="primary" label="Battle" /> -->
                                                    </q-card-actions>
                                                </q-card-main>
                                                </q-card>
                                            </div>
                                        </div>
                                    </div>
                                </slide>
                            </carousel>  
                        </div>
                        <q-inner-loading :visible="visibleL">
                        <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
                        </q-inner-loading>
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
import { Carousel, Slide } from 'vue-carousel';
import CharacterService from '../../_services/characterService';
import Panel from '../../components/_shared/Panel.vue';

@Component({
    components: {
        latestpanel: Panel,
    },
})
export default class Characters extends Vue {
    public titlex = 'Kyaratar';
    public visibleL = false;
    public carouselNav: number = 1;
    public characters: any = [];
    public serviceOkay = false;
    // public title() {
    //     console.log();
    //     return `All Characters — ${this.titlex}`;
    // }

    // for the character styling
    public moralityColorStyle = '';

    public async mounted() {
        // do a request to the back-end server to fetch characters by date
        const blank = ''; // TODO: Not sure if work, might need to redo back-end as own function for fetching all
        try {
            this.characters = (await CharacterService.index(blank)).data;
            this.serviceOkay = true;
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

}
</script>

<style scoped lang="scss">

div.q-card-media-overlay.absolute-bottom {
    background: rgba(0,0,0,0.70) !important;
}

.carouselInset {
    margin: 3em 3em 3em 3em;
}

.cardspacing {
    margin-left: 0.5em;
    margin-right: 0.5em;
}

.customheight {
    min-height: 10em;
}

.fixshortdesc {
    min-height: 8em;
}

</style>
