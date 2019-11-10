<template>
    <div>
        <template>
            <q-layout>
                <q-page>
                    <div class="q-pa-md">
                        <div class="row">
                            <div class="col-lg-12">
                                <div>
                                    Your Tag Suggestions Overview
                                </div>
                                <div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </q-page>
            </q-layout>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

// use this as copy and paste for making .vue files, change name
@Component
export default class TagSuggest extends Vue {
    // data can just be define here using public

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }
}
</script>

<style scoped lang="scss">

</style>