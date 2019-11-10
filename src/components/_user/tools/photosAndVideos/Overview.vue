<template>
    <div>
        <q-page>
            <q-toolbar>
                <q-btn-group push>
                    <q-btn-dropdown color="primary" label="CPhotos">
                        <q-item v-if="this.$store.state.userRole.rank < 8" @click.native="navigateTo('characterphotos')">
                            <q-item-main>
                                <q-item-tile label>Overview</q-item-tile>
                            </q-item-main>
                        </q-item>
                    </q-btn-dropdown>
                    <q-btn-dropdown color="primary" label="CVideos">
                        <q-item v-if="this.$store.state.userRole.rank < 8" @click.native="navigateTo('charactervideos')">
                            <q-item-main>
                                <q-item-tile label>Overview</q-item-tile>
                            </q-item-main>
                        </q-item>
                    </q-btn-dropdown>
                </q-btn-group>
            </q-toolbar>
        </q-page>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import pandvToolService from './../../../../_services/photoAndVideoToolService';

// use this as copy and paste for making .vue files, change name
@Component
export default class PhotosAndVideoOverview extends Vue {
    // data can just be define here using public

    public async mounted() {
        try {
            // depends...
        } catch (error) {
            // an error
        }
    }

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }

}
</script>

<style scoped lang="scss">

</style>