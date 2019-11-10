<template>
    <div>
        <div v-for="(character, index) in foundCharacters" :key="index">
            <div class="row rowsizer extrapadding">
                <div class="col">
                    <div style="cursor: pointer;" @click="navigateToCharacter('character', character.id, character.slug)">
                    <q-card class="hero-card" fluid v-bind:style="{ backgroundImage: 'url(' + character.bannerImageURL + ')' }">
                        <q-card-main>
                            <div class="blackshadow">
                                <div style="padding: 1em 1em 1em 1em;">
                                    <div class="row">
                                        <div class="col-auto">
                                            <p class="herotitle">{{ character.name }}</p>
                                            <div>
                                                <img :src="character.avatarImageURL" style="height:100px; width: 100px;" alt="">
                                            </div>
                                        </div>
                                        <div class="col offset-1">
                                            <!-- <q-btn color="primary" label="View"
                                            @click="navigateToCharacter('character', character.id, character.slug)"
                                            /> -->
                                        </div>
                                    </div>                                   
                                </div>
                            </div>
                        </q-card-main>
                    </q-card>
                    </div>
                    <q-tooltip class="customtooltip" anchor="bottom middle" self="top middle">
                        <div >
                            <b>What is this?</b> <span> Type: </span>
                            <template v-if="character.MainCategory.name !== null">
                                <q-chip v-if="character.MainCategory.name !== null" color="primary" text-color="white"> {{ character.MainCategory.name }}</q-chip>
                            </template>
                            <br>
                            {{ character.background }}
                        </div>
                    </q-tooltip>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import QuickSearchService from '../../_services/quickSearchService';
import MCategoryService from '../../_services/mcategoryService';
import { ViewChildModal } from '../../_helper_models/ViewChildModal';

// use this as copy and paste for making .vue files, change name
@Component
export default class CharacterSearchCard extends Vue {
    @Prop({default: null})
    public foundCharacters: any;

    @Prop({default: null})
    public modesChild!: ViewChildModal;

    @Watch('foundCharacters', {immediate: true})
    public async matchedCharacters(value: any) {
        if (this.modesChild.view) {
            // console.log('charactersearch card');
            // console.log(this.foundCharacters);
            // console.log(this.foundCharacters[0].name);
            this.foundCharacters = value;
        }
        if (this.foundCharacters.length === null) {
            this.foundCharacters = null;
        }
    }

    // ref: https://alligator.io/vuejs/typescript-class-components/
    // @Watch('$route.query.search', { immediate: true })
    // public async handler(value: any) {
    //     // console.log('character card search');
    //     if (this.modesChild.view) {
    //         this.charactersCards = (await CharacterService.search2(value)).data;
    //     }
    //     // console.log(this.charactersCards);
    //     // console.log(this.charactersCards.id);
    //     // console.log(this.charactersCards[0].MainCategory.name);
    // }

    public navigateToCharacter(url, cid, cslug) {
        // console.log(cid);
        // You can also access store, so when navigating you store new values in state.
        // this.$route.params.characterId = cid;
        // this.$route.params.slug = cslug;
        this.$router.push({
            name: url,
            params: {
                characterId: cid,
                slug: cslug,
            },
        });
    }

    public navigateTo(e) {
        this.$router.push({
            name: e,
        });
    }

    private async mounted() {
        try {
            // this.categories = (await MCategoryService.index()).data;
            // console.log(this.categories[0].name);
        } catch (error) {
            // console.log(error);
        }
    }
}
</script>

<style scoped lang="scss">

.rowsizer {
    width: auto;
}

.extrapadding {
    padding: 1em 1em 1em 1em;
}

.herotitle{
    color: black;
    font-size: 26px;
    font-weight: bold;
}

.hero-card {
  height: auto;
  width: 70vw;
  margin: 0;
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.blackshadow {
  background: rgba(255, 255, 255, 0.85)
}

.customtooltip {
    color: white;
    width: 50vw;
    margin: 1em 1em 1em 1em;
}

</style>