<template>
    <div class="shadow-6">
        <q-card>
            <div class="mylamebg">
                <div class="row gutter wrap justify-stretch">
                    <div class="col-auto">
                        <slot>Nothing defined</slot>
                        <div class="outercontent">
                            <div style="cursor: pointer;" @click="navigateTo({
                                name: 'character',
                                params: {
                                    characterId: favCharacter.id,
                                    slug: favCharacter.slug,            
                                }
                            })">
                                <div v-if="favCharacter.name.length > 10" class="namewidth text-center">
                                    <div class="namefixin">{{ favCharacter.name.substring(0,10) + '...' }}</div>
                                </div>
                                <div v-else class="namewidth text-center">
                                    <div class="namefixin">{{ favCharacter.name }}</div>
                                </div>
                                    <img class="responsive imageFixer" :src="favCharacter.avatarImageURL" :alt="favCharacter.name" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </q-card>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

// Here we only pass character object from an array
@Component
export default class CharacterFavoriteCard extends Vue {
    // data can just be define here using public

    @Prop({default: null})
    public favCharacter: any;

    public navigateTo(e) {
        this.$router.push(e);
    }
}
</script>

<style scoped lang="scss">

.outercontent{
    overflow: hidden;
}

.namefixin {
    background: rgba(0,0,0,0.8);
}

.namewidth {
    text-shadow: 2px 2px rgb(85, 4, 4);
    width: 120px;
    padding-top: 142px;
    position: absolute;
    z-index: 4;
    font-weight: bold;
    overflow: hidden;
}

.mylamebg {
    display: inline-block;
    background: rgba(0,0,0,0.7);
    color: white;
    min-width: 120px;
}

.imageFixer {
    height: 180px;
    width: 120px;
}


</style>