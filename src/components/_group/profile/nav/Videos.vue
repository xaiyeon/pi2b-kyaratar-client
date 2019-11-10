<template>
    <div>
        <q-page>
            <q-toolbar>
                <q-toolbar-title>
                    Videos
                </q-toolbar-title>
            </q-toolbar>
            <!-- <div class="profiletitle">
                
            </div> -->
            <div class="row">
                <div class="col-lg-6">
                    <easy-panel title="Group Activity">
                        <!-- <div v-html="puser[0].about">
                        </div> -->
                        <p>testing1</p>
                    </easy-panel>
                </div>
            </div>
        </q-page>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import EasyPanel from './../../../_shared/EasyPanel.vue';

// use this as copy and paste for making .vue files, change name
@Component({
    components: {
        EasyPanel,
    },
})
export default class GroupVideos extends Vue {
    @Prop({default: () => []})
    public pGroup!: any;

    public mounted() {
        this.pGroup = this.$route.params.group;
        // console.log(this.pGroup);
        // console.log(this.$route.params.group);
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