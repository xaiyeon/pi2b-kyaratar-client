<template>
    <div>
        <div v-for="(character, index) in characters" :key="index">
            <div class="hvr-grow charlink" @click="navigateToCharacter('character', character.id, character.slug, character.uuid)" >{{ character.name }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import CharacterService from '@/_services/characterService';

// use this as copy and paste for making .vue files, change name
@Component
export default class TrendingCharacters extends Vue {
    // data can just be define here using public
    public characters = [];

    public async mounted() {
        try {
            const response = (await CharacterService.getTrending()).data;
            this.characters = response;
            console.log(response);
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

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }
}
</script>

<style scoped lang="scss">

.charlink {

}

.charlink:hover {
    cursor: pointer;
    color: rgb(0, 84, 153);
}

</style>