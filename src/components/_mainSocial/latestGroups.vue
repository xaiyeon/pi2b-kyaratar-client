<template>
    <div>
        <div class="q-pa-md">
            <h5 style="font-weight: bold;">Newest Groups</h5>
            <div v-if="groups !== undefined || groups !== null">
                <q-carousel class="text-white shadow-7" height="30em" :arrows=true>
                    <q-carousel-slide class="row flex-center" v-for="(group, index) in groupsOnly" :key="index" :img-src="group.imageURL">
                        <div style="cursor: pointer;" @click="navigateToGroup('group', group.id, group.pageURL)">
                            <div class="absolute-bottom custom-caption">
                                <div class="q-display-1">{{ group.name }}</div>
                                <div class="q-headline">Group Leader: {{ group.leader.username }}</div>
                            </div>
                        </div>
                    </q-carousel-slide>
                </q-carousel>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { PaginationModel } from '../../_helper_models/PaginationModel';
import moment from 'moment';
import _ from 'underscore';
import groupService from '../../_services/groupService';

// also known as Newest Groups
@Component
export default class MainSocialLatestGroups extends Vue {
    // using an interface for PaginationModel for groups and included data
    public groups: PaginationModel = null;
    public groupsOnly: any[] = null;

    @Watch('groups', { immediate: true })
    public onChangeG(value: any) {
        this.groups = value;
    }

    public async beforeCreate() {
        try {
            const response = (await groupService.index({
                page: 1,
                items: 50,
            })).data;
            this.groups = response;
            this.groupsOnly = response.result;
            // console.log(this.groupsOnly);
            // console.log(this.groupsOnly[0]);
            // console.log(this.groups.result[0].User.username);
            // console.log(response);
            // console.log(response.result);
        } catch (error) {
            console.log(error);
        }
    }

    public navigateToGroup(namex, id, urlx) {
        this.$router.push({
            name: namex,
            params: {
                groupId: id,
                url: urlx,
            },
        });
    }

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }
}
</script>

<style scoped lang="scss">

.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background: rgba(0, 0, 0, 0.5);
}

</style>