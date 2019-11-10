<template>
    <div>
        <div class="carouselInset" >
            <carousel :autoplay="true" :navigateTo="carouselNav" :scrollPerPage="false" :perPageCustom="[[300, 1], [480, 1], [630, 2], [800, 2], [900, 3], [1124, 3], [1500, 4], [1800, 5]]" :navigationEnabled="true" :paginationEnabled="false">
                <slide  v-for="character in characters" :key="character.id">
                    <div class="shadow-4 cardspacing">
                        <div class="row">
                            <div class="col">
                                <div class="itemdisplay" v-on:dblclick="navigateToCharacter('character', character.id, character.slug, character.uuid)">
                                    <div>
                                        <img class="mainbg" :src="character.avatarImageURL" alt="">
                                    </div>
                                    <div>
                                        <div class="overlayBG">
                                            {{ character.name }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </slide>
            </carousel>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import CharacterService from '@/_services/characterService';

// use this as copy and paste for making .vue files, change name
@Component
export default class BoilerPlate extends Vue {
    // data can just be define here using public
    public visibleL = false;
    public carouselNav: number = 1;
    public characters: any = [];

    public async mounted() {
        // do a request to the back-end server to fetch characters by date
        const blank = ''; // TODO: Not sure if work, might need to redo back-end as own function for fetching all
        try {
            this.characters = (await CharacterService.index(blank)).data;
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
}
</script>

<style scoped lang="scss">

.itemdisplay {
    opacity: 1;
}

.itemdisplay:hover {
    cursor: pointer;
    opacity: 0.85;
    -webkit-transition-duration: .3s;
    transition-duration: .3s;
    -webkit-transition-property: opacity;
    transition-property: opacity;
    -webkit-transition-timing-function: ease-in-out;
    transition-timing-function: ease-in-out;    
}

.overlayBG {
    font-size: 1.1em;
    background: rgba(12, 12, 12, 0.85);
    color: white;
    vertical-align: bottom;
    text-shadow: rgba(0,0,0,.90) 1px 1px 0;
    position: relative;
    top: -20px;
    overflow: hidden;
}

.avatarImage {
    overflow: hidden;
}

.mainbg {
    width: 100%;
    height: 220px;
    background: center;
    background-size: cover;
}

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