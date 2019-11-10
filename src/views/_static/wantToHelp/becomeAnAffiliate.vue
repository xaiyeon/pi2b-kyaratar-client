<template>
    <div>
        <div class="row">
            <div class="col-md-3">
                <div>
                    <img class="responsive imagemax" src="@/assets/images/sketch/kyara-m-do-it.png" alt="">
                </div>
            </div>
            <div class="col-md-9">
                <div class="q-pa-lg">
                <h4>Become An Affiliate</h4>
                <notavailable />
                <div style="height: 500px"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import NotAvailable from '@/components/_shared/NotAvailable.vue';

// use this as copy and paste for making .vue files, change name
@Component({
    components: {
        notavailable: NotAvailable,
    },
})
export default class BecomeAnAffiliate extends Vue {
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