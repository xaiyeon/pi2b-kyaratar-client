<template>
    <div>
        <q-page>
            <q-toolbar>
                <q-toolbar-title>
                    Overview
                </q-toolbar-title>
            </q-toolbar>
            <!-- <div class="profiletitle">
                
            </div> -->
            <div class="row">
                <div class="col-lg-6">
                    <easy-panel title="Information">
                        <!-- <div v-html="puser[0].about">
                        </div> -->
                        <template v-if="pGroupX">
                            <p><span style="font-weight:bold;">Name: </span> {{ pGroupX.name }}</p>
                            <p><span style="font-weight:bold;">Status: </span> {{ pGroupX.status }}</p>
                            <p><span style="font-weight:bold;">Type: </span> {{ pGroupX.type }}</p>
                            <p><span style="font-weight:bold;">Alternative Name: </span> {{ pGroupX.altName }}</p>
                            <p><span style="font-weight:bold;">Created At: </span> {{ pGroupX.createdAt }}</p>
                            <p><span style="font-weight:bold;">Date Started: </span> {{ pGroupX.dateStarted }}</p>
                            <p><span style="font-weight:bold;">Website URL: </span> {{ pGroupX.siteURL }}</p>
                            <p><span style="font-weight:bold;">SSN URL 1: </span> {{ pGroupX.snURL }}</p>
                            <p><span style="font-weight:bold;">SSN URL 2: </span> {{ pGroupX.snURL2 }}</p>
                            <p><span style="font-weight:bold;">View Count: </span> {{ pGroupX.viewCount }}</p>
                        </template>
                    </easy-panel>
                </div>
            </div>
        </q-page>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import EasyPanel from './../../../_shared/EasyPanel.vue';
import GroupService from '@/_services/groupService';

// use this as copy and paste for making .vue files, change name
@Component({
    components: {
        EasyPanel,
    },
})
export default class GroupOverview extends Vue {
    @Prop({default: () => []})
    public pGroup!: any;

    public pGroupX = null;

    public async mounted() {
        // this.pGroupX = this.$route.params.group;
        try {
            const ThegroupURL = this.$store.state.route.params.url;
            // this.pGroupX = this.$store.state.route.params.pGroup;
            console.log(this.$store.state.route.params.pGroup);
            this.pGroupX = this.$store.state.route.params.pGroup;
            // this.pGroupX = (await GroupService.show(ThegroupURL)).data[0];
            // console.log(this.pGroup);
            // console.log(this.$route.params.group);
        } catch (err) {
            // error
        }
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