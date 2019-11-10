<template>
    <div>
        <q-page>
            <q-toolbar>
                <q-toolbar-title>
                    Favorite Characters
                </q-toolbar-title>
            </q-toolbar>
            <div v-if="favoritesArray.length > 0">
                <div class="q-pa-lg">
                    <div class="row gutter wrap justify-stretch">
                        <div class="col-auto q-pa-md shadow-5" v-for="(fav, index) in favoritesArray" :key="index">
                            <div v-if="$store.state.isUserLoggedIn && isRealUser" class="buttonOptions q-pa-sm">
                                <q-btn
                                color="amber-9"
                                size="xs"
                                icon="arrow_drop_down"
                                round
                                @click="userOptions"
                                >
                                <q-popover>
                                    <!--
                                    The DOM element(s) that make up the popup,
                                    in this case a list:
                                    -->
                                    <q-list separator link>
                                    <!-- notice `v-close-overlay` which closes popover -->
                                    <q-item v-close-overlay @click.native="navigateToTCFEdit('true-character-favorite-edit', fav.uuid)">
                                        Edit
                                    </q-item>
                                    </q-list>
                                </q-popover>
                                </q-btn>
                            </div>
                            <favoritecharactercard :favCharacter="fav.Character">
                                <div class="q-pa-sm text-left insidefix">
                                </div>
                            </favoritecharactercard>
                            <q-tooltip class="customtooltip" anchor="bottom middle" self="top middle">
                                <div >
                                    <template v-if="fav.name !== null">
                                        <b>{{ fav.name }}</b>
                                    </template>
                                    <br>
                                    {{ fav.note }}
                                </div>
                            </q-tooltip>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="q-pa-lg nothingyo">
                    <h4>This user has no favorites yet!</h4>
                </div>
            </div>
        </q-page>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import EasyPanel from './../../../_shared/EasyPanel.vue';
import NotAvailable from './../../../_shared/NotAvailable.vue';
import FavoriteCharacterCard from '@/components/_shared/CharacterFavoriteCard.vue';
import UserService from '@/_services/userService';
import TrueCharacterFavoriteService from '@/_services/trueCharacterFavoriteService';

// use this as copy and paste for making .vue files, change name
@Component({
    components: {
        EasyPanel,
        NotAvailable,
        favoritecharactercard: FavoriteCharacterCard,
    },
    computed: {
        // eh
    },
})
export default class Favorites extends Vue {
    @Prop({default: { options: Object }})
    public puser!: any;
    public isRealUser = false;
    // data can just be define here using public
    public firstTitle = '';
    public favoritesArray = [];

    public EditFavorite() {
        console.log('edit favorite');
    }

    public userOptions() {
        console.log('hello');
    }

    public mounted() {
        // a
    }

    public async beforeCreate() {
        try {
            // const response = (await UserService.show(this.$route.params.username)).data;
            // this.user = response;
            // this.user[0].displayName + `'s`
            this.firstTitle = 'Character' + ' Favorites';
            // next we will pull our favorites based on the current user
            const userfaveCharas = (await TrueCharacterFavoriteService.own(this.$route.params.username)).data;
            this.favoritesArray = userfaveCharas;
            if (this.$store.state.user.uuid === this.favoritesArray[0].fk_userId) {
                this.isRealUser = true;
            }
            // console.log(this.favoritesArray);
            // console.log(userfaveCharas);
        } catch (error) {
            // error
        }
    }

    public navigateToTCFEdit(url, tcfId) {
        this.$router.push({
            name: url,
            params: {
                trueCharacterFavoriteId: tcfId,
            },
        });
    }

    public navigateTo(url) {
        this.$router.push({
            name: url,
        });
    }
}
</script>

<style lang="scss">

.buttonOptions {
    z-index: 99999; 
    position: absolute;
}

.insidefix {
    width: 100%;
    position: absolute;
}

.nothingyo {
    color: white;
    background: rgba(0,0,0,0.8);
}

</style>