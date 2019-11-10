<template>
    <div>
        <template>
            <div class="q-pa-lg">
                <p>Feature coming soon.</p>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

// use this as copy and paste for making .vue files, change name
@Component
export default class MediaPhotos extends Vue {
    // data can just be define here using public
    @Prop({default: { options: Object }})
    public characterL!: any;

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }
}
</script>

<style scoped lang="scss">

</style>