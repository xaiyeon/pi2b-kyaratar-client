<template>
    <div>
        <q-btn color="tertiary" @click="openAndSearch" label="Q.Search" />
            <q-modal
                :no-route-dismiss="true"
                :no-esc-dismiss="true"
                :no-backdrop-dismiss="true"
                v-model="customDialogModel"
                enter-class="animated flipInX"
                leave-class="animated flipOutX"
                class="searchdialog"
            >
                <!-- This or use "title" prop on <q-dialog> -->
                <div class="row">
                    <div class="col-md-10">
                        <div class="q-pa-lg">
                            <span class="kindabold">Quick Search</span>
                            <br>
                            <q-select
                            v-model="selectedSearch"
                            float-label="Search what?"
                            radio
                            :options="selectOptions"
                            />
                            <q-input style="" v-model="search" type="text" float-label="Type here to search!" />
                            <br>
                            <p class="q-pl-lg q-pr-lg">Searching in... {{ selectedSearch }}</p>
                        </div>
                    </div>
                    <div class="col-auto">
                        <template>
                            <div class="right">
                                <q-btn color="red" label="X" @click.native="closeAndReset" />
                                <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
                                    Close search
                                </q-tooltip>
                            </div>    
                        </template>
                    </div>
                </div>
                <div class="bodydialogfix">
                    <template v-if="selectedSearch === 'users'">
                        <div>
                            <usersearchcard :foundUsers="userArray" :modesChild="modes">
                            </usersearchcard>
                        </div>
                    </template>
                    <template v-if="selectedSearch === 'characters'">
                        <div>
                            <charactersearchcard :foundCharacters="characterArray" :modesChild="modes">
                            </charactersearchcard>
                        </div>
                    </template>
                    <template v-if="selectedSearch === 'groups'">
                        <div>
                            <groupsearchcard :foundGroups="groupArray" :modesChild="modes">
                            </groupsearchcard>
                        </div>
                    </template>
                </div>
            </q-modal>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import QuickSearchService from '../../_services/quickSearchService';
import CharacterService from '../../_services/characterService';
import CharacterSearchCard from './CharacterSearchCard.vue';
import UserSearchCard from './UserSearchCard.vue';
import GroupSearchCard from './GroupSearchCard.vue';
import * as _ from 'lodash';
import quickSearchService from '../../_services/quickSearchService';

@Component({
    components: {
        charactersearchcard: CharacterSearchCard,
        usersearchcard: UserSearchCard,
        groupsearchcard: GroupSearchCard,
    },
})
export default class QuickSearch extends Vue {
    public selectOptions = [
        {
            label: 'Users',
            value: 'users',
        },
        {
            label: 'Characters',
            value: 'characters',
        },
        {
            label: 'Groups',
            value: 'groups',
        },
        {
            label: 'Guilds',
            value: 'guilds',
        },
        {
            label: 'Lists',
            value: 'lists',
        },
        {
            label: 'Categories',
            value: 'categories',
        },
        {
            label: 'Tags',
            value: 'tags',
        },
    ];
    public selectedSearch = null;
    public startSearch = false;
    public modes = { view: false, edit: false };
    // dialog show or hide
    public customDialogModel: boolean = false;
    public search: string = '';
    // arrays to search type
    public userArray = [];
    public characterArray = [];
    public groupArray = [];

    public debouncedSearchField = _.debounce((search) => {
        this.searchFinder(search);
    }, 700);

    // called in debounce for this context
    public async searchFinder(search) {
        if (this.startSearch) {
            // New way
            if (this.selectedSearch === 'characters') {
                const charaFound = ( await quickSearchService.qscharacter({
                    search: this.search,
                })).data;
                this.characterArray = charaFound;
                // console.log(charaFound);
                // console.log('next');
                // console.log(this.characterArray);
                // console.log('quick search character');
            }

            if (this.selectedSearch === 'users') {
                const userFound = ( await quickSearchService.qsuser({
                    search: this.search,
                })).data;
                this.userArray = userFound;
            }

            if (this.selectedSearch === 'groups') {
                const groupFound = ( await quickSearchService.qgroup({
                    search: this.search,
                })).data;
                this.groupArray = groupFound;
            }

        }
    }

    // opens modal for search
    public openAndSearch() {
        this.customDialogModel = true;
        this.modes.view = true;
        this.startSearch = true;
        // console.log(this.$route.name);
        // console.log(`router: ${this.$router}`);
    }

    // used for all search
    @Watch('search')
    public searchField(value: any) {
        // first check if modal is open
        if (this.startSearch) {
            // console.log('watching search');
            if (this.search !== '') {
                // console.log(`search started!: ${this.search}`);
                this.debouncedSearchField(value);
            }
        }
    }

    // watch option change
    @Watch('selectOptions', { immediate: true })
    public propChange(value: any) {
        // now clear
        this.ResetCards();
    }

    // NOT USED ANYMORE
    // @Watch('$route.query.search', { immediate: true })
    // public handler(value: any) {
    //     // first check if modal is open
    //     if (this.startSearch) {
    //         // console.log(`route query: ${this.$route.query.search}`);
    //         this.search = value;
    //     }
    // }

    // if route changes then we close
    @Watch('$route')
    public changeRoute(to, from) {
        // first check if modal is open
        if (this.startSearch) {
            this.closeAndReset();
            // console.log('changing route');
        }
    }

    public ResetCards() {
        this.userArray = [];
        this.characterArray = [];
    }

    public closeAndReset() {
        // empty everything
        this.selectedSearch = null;
        this.userArray = [];
        this.characterArray = [];
        this.search = '';
        this.startSearch = false;
        this.customDialogModel = false;
    }

    // not used here
    public navigateTo(e) {
        this.$router.push({
            name: e,
        });
    }
}
</script>

<style scoped lang="scss">

.kindabold {
    font-size: 1.2em;
    font-weight: 600;
}

.searchdialog {
    max-width: auto;    
}

.bodydialogfix {
    min-width: 30vw;
    max-width: 100vw;
    height: 90vh;
}

</style>
