<template>
    <div>
        <q-page>
            <q-toolbar>
                <q-toolbar-title>
                    Dashboard
                </q-toolbar-title>
            </q-toolbar>
            <!-- <div class="profiletitle">
                
            </div> -->
            <div class="row">
                <div class="col-lg-6">
                    <easy-panel :title="firstTitle">
                        <div v-html="puser[0].about">
                        </div>    
                    </easy-panel>
                </div>
            </div>
        </q-page>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import EasyPanel from './../../../_shared/EasyPanel.vue';
import UserService from '@/_services/userService';

// use this as copy and paste for making .vue files, change name
@Component({
    components: {
        EasyPanel,
    },
})
export default class Contributions extends Vue {
    @Prop({default: { options: Object }})
    public puser!: any;

    public usertemp;
    // data can just be define here using public
    public firstTitle = '';

    public async beforeCreate() {
        // console.log(this.$route.params.username);
        const response = (await UserService.show(this.$route.params.username)).data;
        this.usertemp = response;
        this.firstTitle = 'About ' + this.usertemp[0].displayName;
    }

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }
}
</script>

<style lang="scss">

</style>