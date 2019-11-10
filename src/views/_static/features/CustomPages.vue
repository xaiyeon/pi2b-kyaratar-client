<template>
    <div>
        <div class="row">
            <div class="col-md-3">
                <div>
                    <img class="responsive imagemax" src="@/assets/images/sketch/kyara-m-paper.png" alt="">
                </div>
            </div>
            <div class="col-md-9">
                <div class="q-pa-lg">
                <h4>Custom Pages</h4>
                <p>
                    Once you create your user or account, you will also be able to set and create your custom page!
                    A custom page will allow you to submit one of each of the following; html, css, and maybe js file.
                    So now you can personalize a one page for yourself and it will use your KyaratarTag in the url!
                    Show off your uniqueness or not.
                </p>
                <div style="height: 500px"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

// use this as copy and paste for making .vue files, change name
@Component
export default class CustomPages extends Vue {
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