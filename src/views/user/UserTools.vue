<template>
    <div>
        <template v-if="isUserLoggedIn">
            <q-page>
                <q-toolbar>
                    <q-btn-group push>
                        <q-btn-dropdown color="primary" label="User">
                            <!-- dropdown content -->
                            <q-list link v-if="this.$store.state.userRole.rank < 6">
                                <q-item @click.native="selectTools('user_o')">
                                <q-item-main>
                                    <q-item-tile label @click.native="navigateTo('user-overview')">Overview</q-item-tile>
                                </q-item-main>
                                </q-item>
                                <q-item @click.native="userTools">
                                    <q-item-main>
                                        <q-item-tile label>Manage</q-item-tile>
                                    </q-item-main>
                                </q-item>
                                <q-item @click.native="userTools">
                                    <q-item-main>
                                        <q-item-tile label>Create</q-item-tile>
                                    </q-item-main>
                                </q-item>
                                <q-item @click.native="userTools">
                                <q-item-main>
                                    <q-item-tile label>Review</q-item-tile>
                                </q-item-main>
                                </q-item>
                                <q-item @click.native="userTools">
                                    <q-item-main>
                                        <q-item-tile label>Edit</q-item-tile>
                                    </q-item-main>
                                </q-item>
                            </q-list>
                        </q-btn-dropdown>
                        <q-btn-dropdown color="primary" label="Character">
                            <!-- dropdown content -->
                            <q-list link>
                                <q-item v-if="this.$store.state.userRole.rank < 6" @click.native="navigateTo('character-overview')">
                                <q-item-main>
                                    <q-item-tile label>Overview</q-item-tile>
                                </q-item-main>
                                </q-item>
                                <q-item v-if="this.$store.state.userRole.rank < 8" @click.native="characterTools(8)">
                                    <q-item-main>
                                        <q-item-tile label>Manage</q-item-tile>
                                    </q-item-main>
                                </q-item>
                                <q-item v-if="this.$store.state.userRole.rank < 6" @click.native="characterTools">
                                    <q-item-main>
                                        <q-item-tile label>Create</q-item-tile>
                                    </q-item-main>
                                </q-item>
                                <q-item v-if="this.$store.state.userRole.rank < 6" @click.native="characterTools">
                                <q-item-main>
                                    <q-item-tile label>Review</q-item-tile>
                                </q-item-main>
                                </q-item>
                                <q-item v-if="this.$store.state.userRole.rank < 8" @click.native="characterTools">
                                    <q-item-main>
                                        <q-item-tile label>Edit</q-item-tile>
                                    </q-item-main>
                                </q-item>
                                <q-item v-if="this.$store.state.userRole.rank < 11" @click.native="characterTools">
                                    <q-item-main>
                                        <q-item-tile label>Forms</q-item-tile>
                                    </q-item-main>
                                </q-item>
                                <q-item v-if="this.$store.state.userRole.rank <= 17" @click.native="navigateTo('suggest-character')">
                                    <q-item-main>
                                        <q-item-tile label>Suggest</q-item-tile>
                                    </q-item-main>
                                </q-item>
                            </q-list>
                        </q-btn-dropdown>
                        <q-btn-dropdown color="primary" label="Main Category">
                            <!-- dropdown content -->
                            <q-list link>
                                <q-item v-if="this.$store.state.userRole.rank < 5" @click.native="navigateTo('maincategory-overview')">
                                <q-item-main>
                                    <q-item-tile label>Overview</q-item-tile>
                                </q-item-main>
                                </q-item>
                                <q-item v-if="this.$store.state.userRole.rank < 7" @click.native="mainCategoryTools">
                                    <q-item-main>
                                        <q-item-tile label>Manage</q-item-tile>
                                    </q-item-main>
                                </q-item>
                                <q-item v-if="this.$store.state.userRole.rank < 5" @click.native="mainCategoryTools">
                                    <q-item-main>
                                        <q-item-tile label>Create</q-item-tile>
                                    </q-item-main>
                                </q-item>
                                <q-item v-if="this.$store.state.userRole.rank < 10" @click.native="mainCategoryTools">
                                <q-item-main>
                                    <q-item-tile label>Review</q-item-tile>
                                </q-item-main>
                                </q-item>
                                <q-item v-if="this.$store.state.userRole.rank < 7" @click.native="mainCategoryTools">
                                    <q-item-main>
                                        <q-item-tile label>Edit</q-item-tile>
                                    </q-item-main>
                                </q-item>
                                <q-item v-if="this.$store.state.userRole.rank < 11" @click.native="mainCategoryTools">
                                    <q-item-main>
                                        <q-item-tile label>Forms</q-item-tile>
                                    </q-item-main>
                                </q-item>
                                <q-item v-if="this.$store.state.userRole.rank <= 17" @click.native="mainCategoryTools">
                                    <q-item-main>
                                        <q-item-tile label>Suggest</q-item-tile>
                                    </q-item-main>
                                </q-item>
                            </q-list>
                        </q-btn-dropdown>
                        <q-btn-dropdown color="primary" label="Tag">
                            <!-- dropdown content -->
                            <q-list link>
                                <q-item v-if="this.$store.state.userRole.rank < 5" @click.native="navigateTo('tag-overview')">
                                <q-item-main>
                                    <q-item-tile label>Overview</q-item-tile>
                                </q-item-main>
                                </q-item>
                                <q-item v-if="this.$store.state.userRole.rank < 7" @click.native="tagTools">
                                    <q-item-main>
                                        <q-item-tile label>Manage</q-item-tile>
                                    </q-item-main>
                                </q-item>
                                <q-item v-if="this.$store.state.userRole.rank < 4" @click.native="tagTools">
                                    <q-item-main>
                                        <q-item-tile label>Create</q-item-tile>
                                    </q-item-main>
                                </q-item>
                                <q-item v-if="this.$store.state.userRole.rank < 11" @click.native="tagTools">
                                <q-item-main>
                                    <q-item-tile label>Review</q-item-tile>
                                </q-item-main>
                                </q-item>
                                <q-item v-if="this.$store.state.userRole.rank < 7" @click.native="tagTools">
                                    <q-item-main>
                                        <q-item-tile label>Edit</q-item-tile>
                                    </q-item-main>
                                </q-item>
                                <q-item v-if="this.$store.state.userRole.rank < 11" @click.native="tagTools">
                                    <q-item-main>
                                        <q-item-tile label>Forms</q-item-tile>
                                    </q-item-main>
                                </q-item>
                                <q-item v-if="this.$store.state.userRole.rank <= 17" @click.native="navigateTo('suggest-tag')">
                                    <q-item-main>
                                        <q-item-tile label>Suggest</q-item-tile>
                                    </q-item-main>
                                </q-item>
                            </q-list>
                        </q-btn-dropdown>
                        <q-btn-dropdown color="primary" label="Invite Key">
                            <!-- dropdown content -->
                            <q-list link>
                                <q-item v-if="this.$store.state.userRole.rank < 6" @click.native="navigateTo('invitekey-overview')">
                                <q-item-main>
                                    <q-item-tile label>Overview</q-item-tile>
                                </q-item-main>
                                </q-item>
                                <q-item v-if="this.$store.state.userRole.rank <= 17" @click.native="navigateTo('invitekey-general')">
                                    <q-item-main>
                                        <q-item-tile label>General</q-item-tile>
                                    </q-item-main>
                                </q-item>
                            </q-list>
                        </q-btn-dropdown>
                        <q-btn-dropdown color="primary" label="Photos and Videos">
                            <!-- dropdown content -->
                            <q-list link>
                                <q-item v-if="this.$store.state.userRole.rank < 6">
                                <q-item-main>
                                    <q-item-tile label>Users</q-item-tile>
                                    <q-btn-dropdown color="primary" label="Photos and Videos">
                                        <q-item v-if="this.$store.state.userRole.rank < 8" @click.native="navigateTo('characterphotos')">
                                        <q-item-main>
                                            <q-item-tile class="itemlabel" label>Photo Overview</q-item-tile>
                                        </q-item-main>
                                        </q-item>
                                        <q-item v-if="this.$store.state.userRole.rank < 8" @click.native="navigateTo('charactervideos')">
                                        <q-item-main>
                                            <q-item-tile class="itemlabel" label>Video Overview</q-item-tile>
                                        </q-item-main>
                                        </q-item>
                                    </q-btn-dropdown>
                                </q-item-main>
                                </q-item>
                                <q-item v-if="this.$store.state.userRole.rank < 6">
                                <q-item-main>
                                    <q-item-tile label>Characters</q-item-tile>
                                    <q-btn-dropdown color="primary" label="Photos and Videos">
                                        <q-item v-if="this.$store.state.userRole.rank < 8" @click.native="navigateTo('characterphotos')">
                                        <q-item-main>
                                            <q-item-tile class="itemlabel" label>Photo Overview</q-item-tile>
                                        </q-item-main>
                                        </q-item>
                                        <q-item v-if="this.$store.state.userRole.rank < 8" @click.native="navigateTo('charactervideos')">
                                        <q-item-main>
                                            <q-item-tile class="itemlabel" label>Video Overview</q-item-tile>
                                        </q-item-main>
                                        </q-item>
                                    </q-btn-dropdown>
                                </q-item-main>
                                </q-item>
                            </q-list>
                        </q-btn-dropdown>
                    </q-btn-group>
                </q-toolbar>
                <!-- This below toolbar will show up depending on what the user selects. -->
                <!-- <div class="row" v-if="isUserLoggedIn">
                    <div class="col">
                        <div class="q-pa-lg">
                            Current Tool:
                            <template>
                                <span v-for="(i, index) in whatLink" :key="index">
                                    <span v-if="i.enable">
                                        {{ i.toolname }}
                                    </span>
                                </span>
                            </template>
                            <div>
                                <p>Welcome <span class="usernameS">{{ $store.state.user.displayName }}</span> the {{ this.$store.state.userRole.title }}</p>
                            </div>
                        </div>
                        <template v-if="whatLink[0].enable">
                            <user-overview />
                        </template>
                        <template v-if="whatLink[6].enable">
                            <character-overview />
                        </template>
                        <template v-if="whatLink[13].enable">
                            <main-category-overview />
                        </template>
                        <template v-if="whatLink[20].enable">
                            <tag-overview />
                        </template>
                        <template v-if="whatLink[27].enable">
                            <invite-key-overview />
                        </template>
                        <template v-if="whatLink[36].enable">
                            <character-photo-and-video-overview />
                        </template>
                    </div>
                </div> -->
            <template>
                <router-view />
            </template>
            </q-page>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import EasyPanel from './../../components/_shared/EasyPanel.vue';
import UserOverview from './../../components/_user/tools/user_/Overview.vue';
import CharacterOverview from './../../components/_user/tools/character_/Overview.vue';
import MainCategoryOverview from './../../components/_user/tools/mainCategories_/Overview.vue';
import TagOverview from './../../components/_user/tools/tags_/Overview.vue';
import InviteKeyOverview from './../../components/_user/tools/invitekey_/Overview.vue';
import CharacterPhotoAndVideoOverview from './../../components/_user/tools/photosAndVideos/Overview.vue';
import { mapState } from 'vuex';

// use this as copy and paste for making .vue files, change name
@Component({
    components: {
        EasyPanel,
        UserOverview,
        CharacterOverview,
        MainCategoryOverview,
        TagOverview,
        InviteKeyOverview,
        CharacterPhotoAndVideoOverview,
    },
    computed: {
        ...mapState([
            'isUserLoggedIn',
            'user',
        ]),
    },
})
export default class UserTools extends Vue {
    // data can just be define here using public
    public firstTitle = this.$store.state.user.displayName + `'s User Tools!`;
    // If you already computed it like above, no need to initialize
    // public isUserLoggedIn = false;
    public user: any;

    // checking things
    public mounted() {
        // console.log(this.user);
    }

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }

}
</script>

<style lang="scss">

.itemlabel:hover {
    cursor: pointer;
    color: rgb(38, 95, 218);
}

.itemlabel {
    cursor: pointer;
}

.usernameS {
    color: rgb(187, 28, 28);
    font-weight: bold;
}

</style>