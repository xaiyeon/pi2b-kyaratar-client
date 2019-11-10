<template>
    <div>
        <template v-if="this.$store.state.userRole.rank < 5">
            <div>
                <div class="q-pa-md">
                    <q-btn label="Create new" @click="toggleCreateForm()">
                    </q-btn>
                    <template v-if="toggleForm">
                        <div>
                            <br>
                            Create a new tag
                            <div class="q-pa-sm">
                                <br>
                                Fill out the below
                                <br>
                                <q-input v-model="newObj.name" type="text" float-label="Name" maxlength="64"/>
                                <q-input v-model="newObj.description" type="textarea" float-label="Description" maxlength="1024"/>
                                <br>
                                <br>
                                <q-btn color="green-5" label="Submit" @click="submit()"> </q-btn>
                                <q-btn color="red-5" label="Reset" @click="toggleCreateForm()"> </q-btn>
                            </div>
                        </div>
                    </template>
                </div>
                <template v-if="selected.length > 0">
                    <div class="q-pa-lg">
                        <q-alert type="info">
                            <div class="q-pa-md">
                                What to do with selected?
                                ID: {{ selected[0].uuid }} | 
                                Name: {{ selected[0].name }}
                            </div>
                            <div>
                                <q-btn color="purple" label="Edit">

                                </q-btn>
                                <q-btn label="!isPublic" @click.native="isReverseOption(0, selected[0].isPublic, selected[0].uuid, 'isPublic')">

                                </q-btn>
                                <q-btn label="!isEditable" @click.native="isReverseOption(0, selected[0].isEditable, selected[0].uuid, 'isEditable')">

                                </q-btn>
                                <q-btn v-if="$store.state.userRole.rank < 6" label="!isDeletable" @click.native="isReverseOption(0, selected[0].isDeletable, selected[0].uuid, 'isDeletable')">
                                </q-btn>
                                <q-btn color="red" label="Delete" @click.native="deleteData(0, selected[0].name, selected[0].uuid)">

                                </q-btn>
                            </div>
                        </q-alert>

                    </div>
                </template>
                <template>
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
                    <q-table
                        ref="table"
                        title="Tags"
                        :data="tableData"
                        :columns="columns"
                        row-key="uuid"
                        selection="single"
                        :selected.sync="selected"
                        :loading="loading"
                    />
                </template>
            </div>
        </template>
        <template v-else>
            <user-rank-denial />
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import TagService from './../../../../_services/tagService';
import swal from 'sweetalert2';
import moment from 'moment';
import { mapState } from 'vuex';

// use this as copy and paste for making .vue files, change name
@Component({
    computed: {
        ...mapState([
            'isUserLoggedIn',
            'user',
        ]),
    },
})
export default class TagOverview extends Vue {
    // data can just be define here using public
    public tableData = [];
    public selected = [];
    public reallyDelete = false;
    public forsureDelete = false;

    public pagination = {
        pageNumber: 1,
        itemsPerPage: 50,
        maxPages: null,
    };

    // public serverPagination: {
    //     page: number,
    //     rowsNumber: number,
    // };

    // for creating a new tag
    public toggleForm = false;

    public newObj = {
        name: '',
        description: '',
        slug: '',
    };

    public filter = '';
    public loading = false;

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
        name: 'name',
        required: true,
        label: 'Name',
        align: 'left',
        field: 'name',
        sortable: true,
      },
      {
        name: 'isPublic',
        required: true,
        label: 'isPublic',
        align: 'left',
        field: 'isPublic',
        sortable: true,
      },
      {
        name: 'isEditable',
        required: true,
        label: 'isEditable',
        align: 'left',
        field: 'isEditable',
        sortable: true,
      },
      {
        name: 'isDeletable',
        required: true,
        label: 'isDeletable',
        align: 'left',
        field: 'isDeletable',
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

    @Watch('pagination.pageNumber', { immediate: true })
    public onChangePage(value: any) {
        this.pagination.pageNumber = value;
        // console.log(this.pagination);
        // console.log(this.pagination.pageNumber);
        this.tableData = [];
        this.loadData();
    }

    public mounted() {
        // this.serverPagination.rowsNumber = 3;
        // this.serverPagination.page = 1;
        // this.request({
        //     pagination: this.serverPagination,
        //     filter: this.filter,
        // });
        this.loadData();
    }

    // for creating
    public async submit() {
        try {
            this.newObj.slug = this.newObj.name;
            const response = (await TagService.post(this.newObj)).data;
            this.newObj.name = '';
            this.newObj.description = '';
            this.newObj.slug = '';
            this.loadData();
        } catch (error) {
            // an error
        }
    }

    public toggleCreateForm() {
        this.toggleForm = !this.toggleForm;
    }

    public async loadData() {
        try {
            let tempData;
            const response = (await TagService.index2(
                null, this.pagination.pageNumber, this.pagination.itemsPerPage)).data;
            console.log(response);
            tempData = response.result;
            this.pagination.maxPages = response.pages;
            let x = 0;
            tempData.forEach((sugg) => {
                sugg.updatedAt = moment(sugg.createdAt.toString().slice(0, 10),
                ['MM-DD-YYYY', 'YYYY-MM-DD']).format('MMMM Do YYYY');
                sugg.isView = false;
                sugg.keyNumber = x;
                x += 1;
            });
            this.tableData = tempData;
            // this.request({
            //     pagination: this.serverPagination,
            //     filter: this.filter,
            // });
            // console.log(response.result);
        } catch (error) {
            console.log(error);
        }
    }

    // THIS TODO: wtf is wrong with this? f it
    // not using
    // public async request({ pagination, filter }) {
    //   this.loading = true;
    //   const response = (await TagService.index2(null,
    //     this.serverPagination.page,
    //     this.serverPagination.rowsNumber)).data;
    //     this.serverPagination = pagination;
    //     this.serverPagination.rowsNumber = response.count;
    //     this.tableData = response.result;
    //   this.loading = false;
    // }

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }

    // Methods below

    // keyNumber, the opposite of current value, uuid, string option
    public async isReverseOption(e, isWhat, id, opt) {
        // here we will take the boolean value make an object for the inverse of it
        // use the keyNumber and pass a string for the button binding
        try {
            const dataObj: any = {};
            if (opt === 'isPublic') {
                dataObj.uuid = id;
                dataObj.isPublic = !isWhat;
            }
            if (opt === 'isEditable') {
                dataObj.uuid = id;
                dataObj.isEditable = !isWhat;
            }
            if (opt === 'isDeletable') {
                dataObj.uuid = id;
                dataObj.isDeletable = !isWhat;
            }
            this.selected = [];
            const response = (await TagService.put(dataObj)).data;
            this.loadData();
        } catch (error) {
            // an error
        }
    }

    // keyNumber, uuid
    protected async deleteData(e, title, id) {
        // we check isDeletable and the uuid associated
        try {
            const vidObj: any = {};
            const TempName = title;
            if (this.$store.state.userRole.rank < 6 && e) {
                vidObj.uuid = id;
                swal({
                title: 'Are you sure?',
                text: `Delete ${TempName}, you won't be able to revert this!`,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
                }).then(async (result) => {
                    if (result.value) {
                        // const response = (await TagService.cVideoDelete(vidObj));
                        // console.log(response);
                        this.loadData();
                        swal(
                        'Deleted!',
                        `The tag with name: ${TempName}.`,
                        'success',
                        );
                    }
                });
            }
        } catch (error) {
            console.log(error);
            // an error
        }
    }

}
</script>

<style scoped lang="scss">

</style>