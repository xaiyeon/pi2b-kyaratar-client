<template>
    <div>
        <div class="row">
            <div class="col-md-3">
                <div>
                    <img class="responsive imagemax" src="@/assets/images/sketch/kyara-m-soul.png" alt="">
                </div>
            </div>
            <div class="col-md-9">
                <div class="q-pa-lg">
                <h4>Become A Kyatain! (part of official team)</h4>
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

@Component({
    components: {
        notavailable: NotAvailable,
    },
})
export default class BecomeAKyatain extends Vue {
    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }
}
</script>

<style scoped lang="scss">

</style>