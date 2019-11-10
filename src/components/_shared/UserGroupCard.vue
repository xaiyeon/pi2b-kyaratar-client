<template>
    <div>
        <div>
            <div class="row">
                <template v-if="groupArray">
                    <div class="col" v-for="(group, index) in groupArray" :key="index">
                        <template>
                            <q-card inline class="q-ma-sm shadow-5">
                                <q-card-main>
                                    <div style="cursor: pointer;" @click="navigateToGroup(group.Group.pageURL)">
                                        <div class="row">
                                            <div class="col-3">
                                                <div v-if="isRealUser" class="buttonOptions q-pa-sm">
                                                    <q-btn
                                                    color="amber-9"
                                                    size="xs"
                                                    icon="arrow_drop_down"
                                                    round
                                                    >
                                                    <q-popover>
                                                        <!--
                                                        The DOM element(s) that make up the popup,
                                                        in this case a list:
                                                        -->
                                                        <q-list separator link>
                                                        <!-- notice `v-close-overlay` which closes popover -->
                                                        <q-item v-close-overlay>
                                                            Delete
                                                        </q-item>
                                                        </q-list>
                                                    </q-popover>
                                                    </q-btn>
                                                </div>
                                            </div>
                                            <div class="col-auto">
                                                <div style="text-align: center;">
                                                    <p>{{ group.Group.name }}</p>
                                                </div>
                                                <div style="text-align: center;">
                                                    <img class="responsive fluid" style="width:5vw; height:4vw" :src="group.Group.imageURL" alt="">
                                                </div>                                        
                                                <div>
                                                    <div v-if="group.Group.length > 12">
                                                        <p style="color: black; display: inline;">{{ group.Group.altName.substring(0,9) + '...' }}</p>
                                                    </div>
                                                    <div v-else>
                                                        <p style="color: black; display: inline;">{{ group.Group.altName }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </q-card-main>
                            </q-card>
                        </template>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import GroupService from '@/_services/groupService';

// use this as copy and paste for making .vue files, change name
@Component
export default class UserGroupCard extends Vue {
    @Prop({default: { options: Object }})
    public puser!: any;

    public groupArray = null;

    public async mounted() {
        try {
            const username = this.$route.params.username;
            console.log(username);
            const response = (await GroupService.getGroupAssociations(username)).data;
            this.groupArray = response;
            console.log(this.groupArray[0].Group.name);
            console.log(this.groupArray);
        } catch (error) {
            // error
        }
    }

    public navigateToGroup(g) {
        this.$router.push({
            name: 'group',
            params: {
                url: g,
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

</style>