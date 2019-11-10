<template>
    <div>
        <q-layout>
            <div class="row">
                <div class="col">
                    <characterlayout :characterL="character" :modesChild="modes" :fkMainCategory="fkMainCategory">
                    </characterlayout>
                </div>
            </div>
        </q-layout>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import CharacterLayout from '../../components/_character/CharacterLayout.vue';
import CharacterService from '../../_services/characterService';
import MCategoryService from '../../_services/mcategoryService';
import { CharacterModel } from '../../_models/Character';
import ConsoleClear from '@/static/helpers/consoleClear';

// use this as copy and paste for making .vue files, change name
@Component({
    components: {
        characterlayout: CharacterLayout,
    },
})
export default class ViewCharacter extends Vue {
    // data can just be define here using public
    public character = {};
    public modes = { view: true, edit: false };
    public fkMainCategory = {};

    // watch the route and fetch data again if url changes
    @Watch('$route', { immediate: true })
    public async onPropertyChange(value: any) {
        // refetch new data
        // this.fetchData();
    }

    public navigateTo(e) {
        this.$router.push(e);
    }

    // character
    public async mounted() {
        const characterId = this.$store.state.route.params.characterId;
        const uuid = this.$store.state.route.params.uuid;
        // console.log(characterId);
        const charaSlug = this.$store.state.route.params.slug;
        const fkmCategoryId = this.$store.state.route.params.fkmCategoryId;
        // console.log(fkmCategoryId);
        this.character = (await CharacterService.show(characterId, charaSlug, uuid)).data;
        // console.log(this.character);
        // console.log(this.character[0].Tags[0].name);
    }

    public async getMainCategory() {
        try {
            // const characterL: CharacterModel = this.character;
            // const fkmCategoryId = this.character.fk_mainCategoryId;
            // console.log(fkmCategoryId);
            // this.fkMainCategory = (await MCategoryService.show(fkmCategoryId)).data;
        } catch (error) {
            // nothing
        }
    }

    // fetches character and category
    public async fetchData() {
        const characterId = this.$store.state.route.params.characterId;
        const charaSlug = this.$store.state.route.params.slug;
        const fkmCategoryId = this.$store.state.route.params.fkmCategoryId;
        this.character = (await CharacterService.show(characterId, charaSlug, fkmCategoryId)).data;
    }

}
</script>

<style scoped lang="scss">

</style>