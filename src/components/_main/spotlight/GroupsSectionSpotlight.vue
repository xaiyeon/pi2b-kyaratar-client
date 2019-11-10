<template>
    <div>
        <div v-if="mainDataSpotlight" class="row">
            <div class="col-lg-8 shadow-5">
                <div>
                    <div class="mainbg" v-bind:style="[mainDataSpotlight.imageURL != '' & mainDataSpotlight.imageURL != null ? { backgroundImage: 'url(' + mainDataSpotlight.imageURL + ')' } : { backgroundImage: 'url(' + require('@/assets/images/placeholder/default_bg_image.jpg') + ')' }]" >
                        <div class="q-pa-lg">
                            <div>
                                <q-chip color="blue-5">
                                    {{ mainDataSpotlight.status }}
                                </q-chip>
                                <div class="flex row wrap" style="padding-left: 0.5em;">
                                    <div class="q-pa-sm">
                                        <q-chip color="black">
                                            {{ mainDataSpotlight.type }}
                                        </q-chip>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="q-ma-sm q-pa-sm">
                                        <span class="q-pa-sm" style="color: white; background: rgba(10,10,10,0.89)">
                                            Leader: {{ mainDataSpotlight.leader.displayName }}
                                        </span>
                                    </div>
                                    <img class="avaCharaImg responsive" :src="mainDataSpotlight.leader.profileImageURL" alt="">
                                </div>
                                <div class="col-lg-">
                                    <div>
                                    </div>
                                </div>
                            </div>
                            <div class="shadow-5 backName">
                                <div @click="navigateToGroup('group', mainDataSpotlight.id, mainDataSpotlight.pageURL)" class="charaNameLink characterName">
                                    <center># | {{ mainDataSpotlight.name }} | {{ mainDataSpotlight.memberCount }} Members</center>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="row q-pa-md q-ma-sm shadow-4 hvr-shutter-in-vertical" v-for="(data, index) in subDataSpotlight" :key="index">
                    <div class="col-lg-12">
                        <span>
                            <div class="flex">
                                <div class="avaCharaImgSmall">
                                    <img class="responsive" :src="data.avatarImageURL" alt="">
                                </div>
                                <q-chip square color="blue-5">
                                    {{ data.MainCategory.name }}
                                </q-chip>
                            </div>
                            <br>
                            <div class="charaNameLink hvr-bob" >
                                #{{ data.rank }} | {{ data.name }}
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import spotlightService from '@/_services/spotlightService.ts';

// use this as copy and paste for making .vue files, change name
@Component
export default class GroupsSectionSpotlight extends Vue {
    // data can just be define here using public
    public mainDataSpotlight = null;
    public subDataSpotlight = [];

    public async mounted() {
        try {
            const response = (await spotlightService.groupSpotlight()).data;
            this.mainDataSpotlight = response[0];
            let tempData = response;
            tempData = tempData.shift();
            this.subDataSpotlight = tempData;
            // console.log(this.mainCharacterSpotlight);
            this.subDataSpotlight = response;
            // console.log(response);
        } catch (error) {
            // an error
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

.avaCharaImg {
    width: 150px;
    max-height: 300px;
    height: 150px;
}

</style>