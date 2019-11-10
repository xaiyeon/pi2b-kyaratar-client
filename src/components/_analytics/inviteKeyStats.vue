<template>
    <div>
        <template>
            <vue-frappe
                    id="invitekeychart"
                    :labels="[
                        'Total Keys', 'Used Keys', 'Available Keys',
                    ]"
                    title="Invite Key Chart"
                    type="pie"
                    :height="500"
                    :colors="['#1AA8E7', '#06D71F', '#D70642']"
                    :dataSets="this.invitekeyData">
            </vue-frappe>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Chart from 'vue2-frappe';

// use this as copy and paste for making .vue files, change name
@Component
export default class InviteKeyStats extends Vue {
    @Prop({default: null})
    public invitekeyData: any[];

    // @Watch('invitekeyData', { immediate: true, deep: true })
    // public change(value: any) {
    //     this.invitekeyData = value;
    // }

    public mounted() {
        // console.log('subcomp');
        // console.log(this.invitekeyData);
        // this.change(this.invitekeyData);
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