<template>
    <div>
        <q-layout>
            <q-toolbar color="primary">
                Social Manager
            </q-toolbar>
            <q-page-container class="q-pa-lg">
                <q-page>
                    <div class="row">
                        <div class="col-lg-6">
                            <h4>Ongoing Activity</h4>
                        </div>
                        <div class="col-lg-6">
                            <h4>User Relation (Current Friends)</h4>
                            <currentfriends />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <h4>Messages (Inbox)</h4>
                        </div>
                        <div class="col-lg-6">
                            <h4>User Relation (Friend Requests)</h4>
                            <socialrequests />
                        </div>
                    </div>
                </q-page>
            </q-page-container>
        </q-layout>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import SocialRequests from '@/components/_user/socialManager/socialRequests.vue';
import CurrentFriends from '@/components/_user/socialManager/currentFriends.vue';

// use this as copy and paste for making .vue files, change name
@Component({
    components: {
        socialrequests: SocialRequests,
        currentfriends: CurrentFriends,
    },
})
export default class ManageSocial extends Vue {
    // data can just be define here using public

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }
}
</script>

<style scoped lang="scss">

</style>