<template>
    <div>
        <template>
            <q-layout>
                <q-page>
                    <div class="q-pa-md">
                        <div class="row">
                            <div class="col-lg-12">
                                <div>
                                    Your Character Suggestions Overview
                                </div>
                                <div>
                                    <br>
                                    <q-collapsible :opened="a = false" class="shadow-3" icon="view_headline" label="Suggestion Form">
                                        <div class="shadow-5 q-pa-md">
                                            <div>
                                                Suggest a character!
                                            </div>
                                            <div>
                                                <br>
                                                <q-input type="textarea" rows="6" v-model="characterSugObj.form" float-label="Give character name and why should we add?" placeholder="Why?"></q-input>
                                                <br>
                                                <q-input type="textarea" rows="2" v-model="characterSugObj.note" float-label="A personal note" placeholder=""></q-input>
                                                <br>
                                                <q-input type="text" v-model="characterSugObj.imageLink" float-label="An image link to character" placeholder=""></q-input>
                                                <br>
                                                <q-input type="text" v-model="characterSugObj.sourceLink" float-label="A reference link to about the character" placeholder=""></q-input>
                                                <br>
                                                <q-btn color="green-7" label="Submit" @click="submit()"></q-btn>
                                                <q-btn color="red-8" label="Reset" @click="resetForm()"></q-btn>
                                            </div>
                                        </div>
                                    </q-collapsible>
                                </div>
                                <br>
                                <div>
                                    <q-pagination
                                    class="shadow-4"
                                    v-model="pagination.pageNumber"
                                    color="blue-5"
                                    :min="1"
                                    :max="pagination.maxPages"
                                    :max-pages="10"
                                    boundary-links
                                    />
                                </div>
                                <br>
                                <div v-if="characterSuggestions">
                                    <div class="row wrap">
                                        <div class="col-* flex wrap">
                                            <div class="q-pa-sm">
                                                <q-table
                                                    title="Your Character Suggestions"
                                                    :data="tableData"
                                                    :columns="columns"
                                                    row-key="uuid"
                                                    selection="single"
                                                    :selected.sync="selected"
                                                >

                                                    <q-tr slot="header" slot-scope="props">
                                                        <q-th auto-width>
                                                        <q-checkbox
                                                            v-if="props.multipleSelect"
                                                            v-model="props.selected"
                                                            indeterminate-value="some"
                                                        />
                                                        </q-th>
                                                        <q-th v-for="col in props.cols" :key="col.name" :props="props">
                                                        {{ col.label }}
                                                        </q-th>
                                                    </q-tr>

                                                    <template slot="body" slot-scope="props">
                                                        <q-tr :props="props">
                                                        <q-td auto-width>
                                                            <q-checkbox color="primary" v-model="props.selected" />
                                                        </q-td>
                                                        <q-td key="uuid" :props="props">{{ props.row.uuid }}</q-td>

                                                        <q-td key="form" :props="props">
                                                            <q-checkbox color="primary" v-model="props.expand" checked-icon="remove" unchecked-icon="add" class="q-mr-md" />
                                                            {{ props.row.form.toString().substring(0,22) }}...
                                                        </q-td>

                                                        <q-td key="note" :props="props">{{ props.row.note.toString().substring(0,22) }}...</q-td>
                                                        <q-td key="imageLink" :props="props">{{ props.row.imageLink.toString().substring(0,22) }}</q-td>
                                                        <q-td key="sourceLink" :props="props">{{ props.row.sourceLink.toString().substring(0,22) }}</q-td>
                                                        <q-td key="isAccept" :props="props">{{ props.row.isAccept }}</q-td>
                                                        <q-td key="isStatus" :props="props">{{ props.row.isStatus }}</q-td>
                                                        <q-td key="createdAt" :props="props">{{ props.row.createdAt }}</q-td>
                                                        <q-td key="updatedAt" :props="props">{{ props.row.updatedAt }}</q-td>
                                                        <!-- <q-td key="updatedAt" :props="props">
                                                            <q-chip small square color="amber">{{ props.row.updatedAt }}</q-chip>
                                                        </q-td> -->
                                                        </q-tr>
                                                        <q-tr v-show="props.expand" :props="props">
                                                        <q-td colspan="100%">
                                                            <div class="row">
                                                                <div class="col-">
                                                                    <div class="responsive">
                                                                        <div class="text-left">
                                                                            Form: {{ props.row.form }}
                                                                            <br>
                                                                            Note: {{ props.row.note }}
                                                                            <br>
                                                                            ImageLink: <a target="_blank" :href="props.row.imageLink">Image</a>
                                                                            <br>
                                                                            SourceLink: <a target="_blank" :href="props.row.sourceLink">Source</a>
                                                                            <br>
                                                                            isAccept: {{ props.row.isAccept }}
                                                                            <br>
                                                                            isStatus: {{ props.row.isStatus }}
                                                                            <br>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </q-td>
                                                        </q-tr>
                                                    </template>

                                                </q-table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </q-page>
            </q-layout>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import SuggestionsService from '@/_services/suggestionService.ts';
import moment from 'moment';

// use this as copy and paste for making .vue files, change name
@Component
export default class CharacterSuggest extends Vue {
    // data can just be define here using public
    public userId = '';
    public characterSuggestions = [];

    // table stuff
    public tableData = [];
    public selected = [];
    public columns = [
      {
        name: 'uuid',
        required: true,
        label: 'UUID',
        align: 'left',
        field: 'uuid',
        sortable: true,
      },
      {
        name: 'form',
        required: false,
        label: 'Form',
        align: 'left',
        field: 'form',
        sortable: false,
      },
      {
        name: 'note',
        required: false,
        label: 'Note',
        align: 'left',
        field: 'note',
        sortable: false,
      },
      {
        name: 'imageLink',
        required: false,
        label: 'imageLink',
        align: 'left',
        field: 'imageLink',
        sortable: false,
      },
      {
        name: 'sourceLink',
        required: false,
        label: 'sourceLink',
        align: 'left',
        field: 'sourceLink',
        sortable: false,
      },
      {
        name: 'isAccept',
        required: false,
        label: 'isAccept',
        align: 'left',
        field: 'isAccept',
        sortable: true,
      },
      {
        name: 'isStatus',
        required: true,
        label: 'isStatus',
        align: 'left',
        field: 'isStatus',
        sortable: true,
      },
      {
        name: 'createdAt',
        required: true,
        label: 'Created Date',
        align: 'left',
        field: 'createdAt',
        sortable: true,
      },
      {
        name: 'updatedAt',
        required: true,
        label: 'Updated Date',
        align: 'left',
        field: 'updatedAt',
        sortable: true,
      },
    ];

    public pagination = {
        pageNumber: 1,
        itemsPerPage: 10,
        maxPages: null,
    };

    public characterSugObj = {
        form: '',
        note: '',
        imageLink: '',
        sourceLink: '',
        type: 'character',
        fk_userId: this.$store.state.user.uuid,
    };

    @Watch('pagination.pageNumber', { immediate: true })
    public onChangePage(value: any) {
        this.pagination.pageNumber = value;
        // console.log(this.pagination);
        // console.log(this.pagination.pageNumber);
        this.tableData = [];
        this.loadCharacterSuggestion();
    }

    public async submit() {
        if (this.characterSugObj.form !== '') {
            try {
                const response = (await SuggestionsService.create(this.characterSugObj)).data;
                // console.log(response);
                this.loadCharacterSuggestion();
            } catch (error) {
                // an error
            }
        }
    }

    public resetForm() {
        this.characterSugObj.form = '';
        this.characterSugObj.note = '';
        this.characterSugObj.imageLink = '';
        this.characterSugObj.sourceLink = '';
    }

    public async mounted() {
        this.userId = this.$store.state.user.uuid;
        this.loadCharacterSuggestion();
    }

    public async loadCharacterSuggestion() {
        try {
            const typeMode = 'character';
            const response = (await SuggestionsService.getUserIndex(
                this.userId, typeMode, this.pagination.pageNumber, this.pagination.itemsPerPage)).data;
            console.log(response);
            this.characterSuggestions = response.result;
            this.pagination.maxPages = response.pages;
            let x = 0;
            this.characterSuggestions.forEach((sugg) => {
                sugg.updatedAt = moment(sugg.createdAt.toString().slice(0, 10),
                ['MM-DD-YYYY', 'YYYY-MM-DD']).format('MMMM Do YYYY');
                sugg.isView = false;
                sugg.keyNumber = x;
                x += 1;
            });
            this.tableData = this.characterSuggestions;
        } catch (error) {
            // an error
        }
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