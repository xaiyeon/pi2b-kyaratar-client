<template>
    <div>
        <q-page>
            <q-toolbar>
                <q-toolbar-title>
                    Photos
                </q-toolbar-title>
            </q-toolbar>
            <!-- <div class="profiletitle">
                
            </div> -->
            <grouphotossub :pGroup="pGroup" :pGroupId="pGroupId"/>
        </q-page>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import EasyPanel from './../../../_shared/EasyPanel.vue';
import GroupPhotosSub from '@/components/_group/profile/nav/layout/GroupPhotos.vue';

// use this as copy and paste for making .vue files, change name
@Component({
    components: {
        EasyPanel,
        grouphotossub: GroupPhotosSub,
    },
})
export default class GroupPhotos extends Vue {
    @Prop({default: () => []})
    public pGroup!: any;

    public pGroupId = null;

    public beforeCreate() {
        this.pGroupId = this.$route.params.groupId;
    }

    public mounted() {
        // console.log(this.$route.params.groupId);
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