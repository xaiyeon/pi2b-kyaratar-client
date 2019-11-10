<template>
    <div>
        <template v-if="serviceOkay">
            <q-layout>
                <q-layout-header>
                    <q-toolbar color="tertiary">
                        <q-toolbar-title class="q-headline q-pa-md">
                            Social Community Activity
                        </q-toolbar-title>
                    </q-toolbar>
                </q-layout-header>
                <q-page-container>
                    <q-page>
                        <div>
                            <div class="row">
                                <div class="col-lg-4">
                                    <main-social-latest-groups />
                                </div>
                                <div class="col-lg-4">
                                    <p>coming soon...</p>
                                </div>
                                <div class="col-lg-4">
                                    <p>coming soon...</p>
                                </div>
                            </div>
                        </div>
                    </q-page>
                </q-page-container>
            </q-layout>
        </template>
        <template v-else>
            <server-down/>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { PaginationModel } from '../../_helper_models/PaginationModel';
import moment from 'moment';
import _ from 'underscore';
import groupService from '../../_services/groupService';
import MainSocialLatestGroups from '../../components/_mainSocial/latestGroups.vue';
import APICheckService from '../../_services/apiCheckService';

@Component({
    components: {
        MainSocialLatestGroups,
    },
})
export default class Social extends Vue {
    public serviceOkay = false;
    public checkerObjects = {
        serviceStatus: false,
        message: 'checking...',
    };

    public async mounted() {
        // do a request to the back-end server to fetch characters by date
        try {
            const serviceStatusResponse = (await APICheckService.check(this.checkerObjects)).data;
            // console.log(serviceStatus);
            this.serviceOkay = serviceStatusResponse.serviceStatus;
            // console.log(this.serviceOkay);
        } catch (error) {
            // error
            // console.log(error);
        }
    }

    // // using an interface for PaginationModel for groups and included data
    // public groups: PaginationModel = null;

    // @Watch('groups', { immediate: true })
    // public onChangeG(value: any) {
    //     this.groups = value;
    // }

    // public async beforeCreate() {
    //     try {
    //         const response = (await groupService.index({
    //             page: 1,
    //             items: 50,
    //         })).data;
    //         this.groups = response;
    //         console.log(this.groups.result[0].User.username);
    //         console.log(response);
    //         // console.log(response.result);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }
}
</script>

<style scoped lang="scss">

</style>