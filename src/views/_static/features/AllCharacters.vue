<template>
    <div>
        <div class="row">
            <div class="col-md-3">
                <div>
                    <img class="responsive imagemax" src="@/assets/images/sketch/kyara-m-gravure.png" alt="">
                </div>
            </div>
            <div class="col-md-9">
                <div class="q-pa-lg">
                <h4>All Characters</h4>
                <p>
                    Yes, all characters. You can even submit yourself if you want to. All future characters will
                    be given random stats based on methods such as sentimental analysis from machine learning or other methods!
                    Find out what characters are your favorite and how they compare to characters you probably never heard of.
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
export default class AllCharacters extends Vue {
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