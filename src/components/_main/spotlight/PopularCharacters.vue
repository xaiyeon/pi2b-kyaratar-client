<template>
    <div>
        <div v-for="(character, index) in characters" :key="index">
            <div class="hvr-grow charlink" @click="navigateToCharacter('character', character.id, character.slug, character.uuid)">{{ character.name }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import CharacterService from '@/_services/characterService';

// use this as copy and paste for making .vue files, change name
@Component
export default class PopularCharacters extends Vue {
    public characters = [];

    public async mounted() {
        try {
            const response = (await CharacterService.getPopular()).data;
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

.charlink:hover {
    cursor: pointer;
    color: rgb(202, 3, 186);
}

</style>