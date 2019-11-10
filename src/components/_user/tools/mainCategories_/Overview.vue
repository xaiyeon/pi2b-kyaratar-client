<template>
    <div>
        <template v-if="this.$store.state.userRole.rank < 5">
            <div>
                <div class="q-pa-md">
                    <q-btn label="Create new">
                    </q-btn>
                </div>
                <template v-if="selected.length > 0">
                    <div class="q-pa-lg">
                        <q-alert type="info">
                            <div class="q-pa-md">
                                What to do with selected?
                                ID: {{ selected[0].id }} | 
                                Name: {{ selected[0].name }}
                            </div>
                            <div>
                                <q-btn color="purple" label="Edit">

                                </q-btn>
                                <q-btn label="!isPublic">

                                </q-btn>
                                <q-btn label="!isEditable">

                                </q-btn>
                                <q-btn v-if="$store.state.userRole.rank < 6" label="!isDeletable">
                                </q-btn>
                                <q-btn color="red" label="Delete" @click.native="deleteMCat(selected[0])">

                                </q-btn>
                            </div>
                        </q-alert>

                    </div>
                </template>    
                <q-table
                    title="Main Categories"
                    :data="tableData"
                    :columns="columns"
                    row-key="uuid"
                    selection="single"
                    :selected.sync="selected"
                />
            </div>
        </template>
        <template v-else>
            <user-rank-denial />
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import MainCategoryService from './../../../../_services/mcategoryService';
import swal from 'sweetalert2';
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
export default class MainCategoryOverview extends Vue {
    // data can just be define here using public
    public tableData = [];
    public selected = [];
    public reallyDelete = false;
    public forsureDelete = false;

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

    public async mounted() {
        try {
            const response = (await MainCategoryService.index2({
                page: 1,
                items: 50,
            })).data;
            console.log(response);
            this.tableData = response.result;
            console.log(response.result);
        } catch (error) {
            console.log(error);
        }
    }

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }

    // Methods below
    protected deleteMCat(theItem) {
        swal({
        title: 'Are you sure?',
        text: `You won't be able to revert this!`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
        if (result.value) {
            swal(
            'Deleted!',
            `The Main Category with name: ${theItem.name}.`,
            'success',
            );
        }
        });
    }

}
</script>

<style scoped lang="scss">

</style>