<template>
    <div>
        <div>
            <q-page>
            <q-toolbar>
                <q-toolbar-title>
                    Social Activity
                </q-toolbar-title>
            </q-toolbar>
                <!-- <div class="profiletitle">
                    
                </div> -->
                <easy-panel :title="friendTitle">
                    <div>
                        <userfriendscard :puser="puser" />
                    </div>    
                </easy-panel>
                <easy-panel :title="groupTitle">
                    <div>
                        <usergroupcard :puser="puser" />
                    </div>    
                </easy-panel>
            </q-page>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import EasyPanel from './../../../_shared/EasyPanel.vue';
import NotAvailable from './../../../_shared/NotAvailable.vue';
import UserService from '@/_services/userService';
import UserFriendCards from '@/components/_shared/UserFriendCards.vue';
import UserGroupCard from '@/components/_shared/UserGroupCard.vue';

// use this as copy and paste for making .vue files, change name
@Component({
    components: {
        EasyPanel,
        NotAvailable,
        userfriendscard: UserFriendCards,
        usergroupcard: UserGroupCard,
    },
})
export default class Social extends Vue {
    @Prop({default: { options: Object }})
    public puser!: any;

    public usertemp;
    public friendTitle = '';
    public groupTitle = '';

    public async beforeCreate() {
        try {
            const response = (await UserService.show(this.$route.params.username)).data;
            this.usertemp = response;
            this.friendTitle = this.usertemp[0].displayName + `'s` + ' Friends';
            this.groupTitle = this.usertemp[0].displayName + `'s` + ' Groups';
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

.pageFixHeight {
    height: 40vh;
    margin-bottom: 2em;
}

</style>