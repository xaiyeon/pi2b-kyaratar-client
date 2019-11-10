<template>
    <div>
        <template>
            <div class="row">
                <div class="col-lg-12">
                    <div class="q-ma-md">
                        <span>Total Video Count: </span>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

// use this as copy and paste for making .vue files, change name
@Component
export default class GroupVideos extends Vue {
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