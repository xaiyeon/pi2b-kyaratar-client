<template>
    <div>
        <q-layout>
            <q-page-container>
                <q-page>
                    <q-toolbar>
                        Welcome user {{ this.$store.state.user.displayName }}
                    </q-toolbar>
                    <div class="q-pa-lg">
                        <p>Here is your customized home overview.</p>
                        <div>
                            Not available yet...
                        </div>
                        <div>
                            <template>
                                <vchart :chartData="chartData"></vchart>
                            </template>
                        </div>
                    </div>
                    <br>

                </q-page>
            </q-page-container>
        </q-layout>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

// use this as copy and paste for making .vue files, change name
@Component({
    // components: {
    //     vchart: VChart,
    // },
})
export default class HomeLoggedIn extends Vue {
    // data can just be define here using public

    public chartData = {
        chartType: 'barChart',
        selector: 'chart',
        title: 'Student Grades',
        subtitle: '2018 - 2019',
        width: 600,
        height: 300,
        data: [98, 76, 85, 87, 63, 65, 90],
    };

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }
}
</script>

<style scoped lang="scss">

</style>