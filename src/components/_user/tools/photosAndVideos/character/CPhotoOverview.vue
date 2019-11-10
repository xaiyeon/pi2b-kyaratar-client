<template>
    <div>
        <template v-if="this.$store.state.userRole.rank < 5">
            <div>
                <div class="q-pa-lg">
                    Character Photos Overview
                </div>
                <div>
                    <div>
                        <div>
                            <q-pagination
                            class="shadow-4"
                            v-model="pagination.pageNumber"
                            color="black-6"
                            :min="1"
                            :max="pagination.maxPages"
                            :max-pages="10"
                            boundary-links
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-*">

                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <user-rank-denial />
        </template>
    </div>

</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import pandvToolService from './../../../../../_services/photoAndVideoToolService';

// use this as copy and paste for making .vue files, change name
@Component
export default class CPhotoOverview extends Vue {
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