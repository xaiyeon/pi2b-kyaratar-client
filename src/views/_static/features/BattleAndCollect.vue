<template>
    <div>
        <div class="row">
            <div class="col-md-3">
                <div>
                    <img class="responsive imagemax" src="@/assets/images/sketch/kyara-m-question.png" alt="">
                </div>
            </div>
            <div class="col-md-9">
                <div class="q-pa-lg">
                <h4>Battle and Collect?</h4>
                <p>
                    Battle other user's and account's set teams. 
                    Collect characters from all sorts of mediums.
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
export default class BattleAndCollect extends Vue {
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