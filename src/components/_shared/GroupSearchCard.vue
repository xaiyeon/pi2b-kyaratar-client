<template>
    <div>
        <div v-for="(g, index) in foundGroups" :key="index">
            <div class="row rowsizer extrapadding">
                <div class="col">
                    <div style="cursor: pointer;" @click="navigateToGroup(g.pageURL)">
                    
                    <q-card class="hero-card" fluid v-bind:style="[(g.imageURL != '' & g.imageURL != null) ? { backgroundImage: 'url(' + g.imageURL + ')' } : { backgroundImage: 'url(' + require('@/assets/images/placeholder/default_bg_image.jpg') + ')' }]">
                        <q-card-main>
                            <div class="blackshadow">
                                <div style="padding: 1em 1em 1em 1em;">
                                    <div class="row">
                                        <div class="col-auto">
                                            <p class="herotitle">{{ g.name }} <q-chip color="blue-8">{{ g.type.replace(/\w/, c => c.toUpperCase()) }}</q-chip</p>
                                            <div>
                                                <template v-if="g.imageURL === '' || g.imageURL === null">
                                                    <img class="userimagefix" src="@/assets/images/placeholder/default_profile_img.png" alt="">
                                                </template>
                                                <template v-else>
                                                    <img class="userimagefix" :src="g.imageURL" alt="">
                                                </template>
                                            </div>
                                        </div>
                                        <div class="col offset-1">
                                            <!-- <q-btn color="primary" label="View"
                                            @click="navigateToCharacter('character', character.id, character.slug)"
                                            /> -->
                                        </div>
                                    </div>                                   
                                </div>
                            </div>
                        </q-card-main>
                    </q-card>
                    </div>
                    <!-- <q-tooltip class="customtooltip" anchor="bottom middle" self="top middle">
                        <div >
                            <b>What role?</b> <span> Type: </span>
                            <template v-if="user.UserRoles.name !== null">
                                <q-chip v-if="character.MainCategory.name !== null" color="primary" text-color="white"> {{ character.MainCategory.name }}</q-chip>
                            </template>
                            <br>
                            {{ character.description }}
                        </div>
                    </q-tooltip> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import QuickSearchService from '../../_services/quickSearchService';
import MCategoryService from '../../_services/mcategoryService';
import { ViewChildModal } from '../../_helper_models/ViewChildModal';

// use this as copy and paste for making .vue files, change name
@Component
export default class GroupSearchCard extends Vue {
    @Prop({default: null})
    public foundGroups: any;

    @Prop({default: null})
    public modesChild!: ViewChildModal;

    @Watch('foundGroups', {immediate: true})
    public async matchedGroups(value: any) {
        if (this.modesChild.view) {
            // console.log('charactersearch card');
            // console.log(this.foundCharacters);
            // console.log(this.foundCharacters[0].name);
            this.foundGroups = value;
        }
        if (this.foundGroups.length === null) {
            this.foundGroups = null;
        }
    }

    public navigateToGroup(pageName) {
        this.$router.push({
            name: 'group',
            params: {
                url: pageName,
            },
        });
    }

    public navigateTo(e) {
        this.$router.push({
            name: e,
        });
    }

    private async mounted() {
        try {
            // console.log(this.foundUsers);
            // this.categories = (await MCategoryService.index()).data;
            // console.log(this.categories[0].name);
        } catch (error) {
            // console.log(error);
        }
    }
}
</script>

<style scoped lang="scss">

.userimagefix {
    height:100px; 
    width: 100px;    
}

.rowsizer {
    width: auto;
}

.extrapadding {
    padding: 1em 1em 1em 1em;
}

.herotitle{
    color: black;
    font-size: 26px;
    font-weight: bold;
}

.hero-card {
  height: auto;
  width: 70vw;
  margin: 0;
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.blackshadow {
  background: rgba(255, 255, 255, 0.85)
}

.customtooltip {
    color: white;
    width: 50vw;
    margin: 1em 1em 1em 1em;
}

</style>