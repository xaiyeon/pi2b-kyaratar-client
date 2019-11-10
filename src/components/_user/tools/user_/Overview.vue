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
                                Name: {{ selected[0].username }}
                            </div>
                            <div>
                                <q-btn v-if="this.$store.state.userRole.rank < 5" color="purple" label="Edit">
                                </q-btn>
                                <q-btn label="!is_Verified">
                                </q-btn>
                                <q-btn v-if="this.$store.state.userRole.rank < 5" label="!is_Partner">
                                </q-btn>
                                <q-btn label="!is_Helper" @click="persistUserChange('isHelper')">
                                </q-btn>
                                <q-btn label="!is_Donator">
                                </q-btn>
                                <q-btn v-if="this.$store.state.userRole.rank < 5" label="!is_Editable">
                                </q-btn>
                                <q-btn v-if="this.$store.state.userRole.rank < 5" label="!is_Deletable">
                                </q-btn>
                                <q-btn color="red" label="Delete" @click.native="deleteChara(selected[0])">

                                </q-btn>
                            </div>
                        </q-alert>

                    </div>
                </template>    
                <q-table
                    title="Users"
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
import UserService from './../../../../_services/userService';
import swal from 'sweetalert2';
import { mapState } from 'vuex';
import userService from './../../../../_services/userService';

// use this as copy and paste for making .vue files, change name
@Component({
    computed: {
        ...mapState([
            'isUserLoggedIn',
            'user',
        ]),
    },
})
export default class UserOverview extends Vue {
    // data can just be define here using public
    public tableData = [];
    public selected = [];
    public reallyDelete = false;
    public forsureDelete = false;

    public isVerifiedUser = {
        uuid: '',
        isVerified: true,
    };

    public isHelperUser = {
        uuid: '',
        isHelper: true,
    };

    public isDonatorUser = {
        uuid: '',
        isDonator: true,
    };

    public isDeletableUser = {
        uuid: '',
        isDeletable: true,
    };

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
        name: 'status',
        required: true,
        label: 'Status',
        align: 'left',
        field: 'status',
        sortable: true,
      },
      {
        name: 'username',
        required: true,
        label: 'Username',
        align: 'left',
        field: 'username',
        sortable: true,
      },
      {
        name: 'displayName',
        required: true,
        label: 'Display Name',
        align: 'left',
        field: 'displayName',
        sortable: true,
      },
      {
        name: 'birthDate',
        required: true,
        label: 'Birth Date',
        align: 'left',
        field: 'birthDate',
        sortable: true,
      },
      {
        name: 'kyaratarBytes',
        required: true,
        label: 'Kyaratar Bytes',
        align: 'left',
        field: 'kyaratarBytes',
        sortable: true,
      },
      {
        name: 'kyaratarTag',
        required: true,
        label: 'Kyaratar Tag',
        align: 'left',
        field: 'kyaratarTag',
        sortable: true,
      },
      {
        name: 'isUserPin',
        required: true,
        label: 'isUserPin',
        align: 'left',
        field: 'isUserPin',
        sortable: true,
      },
      {
        name: 'privacyCode',
        required: true,
        label: 'Privacy Code',
        align: 'left',
        field: 'privacyCode',
        sortable: true,
      },
      {
        name: 'isVerified',
        required: true,
        label: 'isVerified',
        align: 'left',
        field: 'isVerified',
        sortable: true,
      },
      {
        name: 'isPartner',
        required: true,
        label: 'isPartner',
        align: 'left',
        field: 'isPartner',
        sortable: true,
      },
      {
        name: 'isHelper',
        required: true,
        label: 'isHelper',
        align: 'left',
        field: 'isHelper',
        sortable: true,
      },
      {
        name: 'isDonator',
        required: true,
        label: 'isDonator',
        align: 'left',
        field: 'isDonator',
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
        name: 'lastOnlineDate',
        required: true,
        label: 'Last Online Date',
        align: 'left',
        field: 'lastOnlineDate',
        sortable: true,
      },
      {
        name: 'viewCount',
        required: true,
        label: 'View Count',
        align: 'left',
        field: 'viewCount',
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

    public async persistUserChange(mode) {
        if (mode === 'isHelper') {
          this.isHelperUser.uuid = this.selected[0].uuid;
          this.isHelperUser.isHelper = !this.selected[0].isHelper;
          console.log(this.isHelperUser);
          try {
            await UserService.toolPut(this.isHelperUser).then(() => {
                const toast = (swal as any).mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3000,
                });
                toast({
                type: 'success',
                title: 'User isHelper changed!',
                });
            },
            );
            // reload it
            // TODO: pagination must match!
                try {
                    const response = (await userService.index2({
                        page: 1,
                        items: 50,
                    })).data;
                    // console.log(response);
                    this.tableData = response.result;
                } catch (error) {
                    console.log(error);
                }
          } catch (error0) {
              // error
          }
        }
    }

    public async mounted() {
        try {
            let theRealData;
            const response = await UserService.index2({
                page: 1,
                items: 50,
            }).then((resultData) => {
                console.log(resultData.data.result);
                const filterData = resultData.data.result;
                filterData.forEach((element) => {
                    if (element.username === this.$store.state.user.username) {
                        // example for removing unwanted element in array
                        // Array Remove
                        const index = filterData.indexOf(element);
                        filterData.splice(index, 1);
                    }
                // when done
                console.log(filterData);
                theRealData = filterData;
                this.tableData = theRealData;
            });
            });
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
            `The User with name: ${theItem.name}.`,
            'success',
            );
        }
        });
    }

}
</script>

<style scoped lang="scss">

</style>
