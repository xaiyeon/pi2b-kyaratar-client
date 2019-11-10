<template>
    <div>
        <q-page>
            <q-toolbar>
                <q-toolbar-title>
                    The Group's Rules
                </q-toolbar-title>
            </q-toolbar>
            <!-- <div class="profiletitle">
                
            </div> -->
            <div class="row" v-if="PGroupData">
                <div class="col-lg-6">
                    <easy-panel title="The Rules">
                        <template v-if="PGroupData.rules === null || PGroupData.rules === undefined">
                            <p>There are no rules.</p>
                        </template>
                        <template v-else>
                            <div v-html="PGroupData.rules">
                            </div>
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
export default class GroupRules extends Vue {
    @Prop({default: () => []})
    public pGroup!: any;

    public PGroupData = null;

    public async mounted() {
        const whatGroup = this.$route.params.url;
        try {
            const responseData = (await GroupService.show(whatGroup, 'noCount')).data;
            // console.log(responseData[0]);
            this.PGroupData = responseData[0];
            console.log(this.PGroupData);
        } catch (error) {
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