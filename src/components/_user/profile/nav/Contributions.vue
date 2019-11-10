<template>
    <div>
        <q-page>
            <q-toolbar>
                <q-toolbar-title>
                    Contributions
                </q-toolbar-title>
            </q-toolbar>
            <!-- <div class="profiletitle">
                
            </div> -->
            <easy-panel :title="firstTitle">
                <div>
                    <not-available />
                </div>    
            </easy-panel>
        </q-page>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import EasyPanel from './../../../_shared/EasyPanel.vue';
import NotAvailable from './../../../_shared/NotAvailable.vue';
import UserService from '@/_services/userService';

// use this as copy and paste for making .vue files, change name
@Component({
    components: {
        EasyPanel,
        NotAvailable,
    },
})
export default class Contributions extends Vue {
    @Prop({default: { options: Object }})
    public puser!: any;

    public usertemp;
    // data can just be define here using public
    public firstTitle = '';

    public async beforeCreate() {
        try {
            // console.log(this.$route.params.username);
            const response = (await UserService.show(this.$route.params.username)).data;
            this.usertemp = response;
            this.firstTitle = 'What ' + this.usertemp[0].displayName + ' has done for Kyaratar!';
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

<style lang="scss">

</style>