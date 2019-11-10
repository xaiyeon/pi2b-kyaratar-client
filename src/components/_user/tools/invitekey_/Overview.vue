<template>
    <div>
        <template v-if="this.$store.state.userRole.rank < 5">
            <div>
                <div class="q-pa-md">
                    <q-btn label="Create new" @click="createOpen = true">
                    </q-btn>
                </div>
                <template>
                    <q-modal v-model="createOpen" :no-backdrop-dismiss="false">
                        <div class="q-pa-lg">
                            <invite-key-create :createOpen="createOpen" />
                            <br>
                            <q-btn
                            color="primary"
                            @click="createOpen = false"
                            label="Close"
                            />
                        </div>
                    </q-modal>
                </template>
                <template v-if="selected.length > 0">
                    <div class="q-pa-lg">
                        <q-alert type="info">
                            <div class="q-pa-md">
                                What to do with selected?
                                UUID: {{ selected[0].uuid }} | 
                                Secret: {{ selected[0].uuidSecret }}
                            </div>
                            <div>
                                <q-btn color="purple" label="Edit">

                                </q-btn>
                                <q-btn label="!isPublic">

                                </q-btn>
                                <q-btn label="!isEditable">

                                </q-btn>
                                <q-btn v-if="user.fk_userRoleId < 7" label="!isDeletable">
                                </q-btn>

                                <q-btn color="red" label="Delete" @click.native="deleteMCat(selected[0])">

                                </q-btn>
                            </div>
                        </q-alert>

                    </div>
                </template>    
                <q-table
                    title="Invite Keys"
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
import invitekeyService from './../../../../_services/invitekeyService';
import swal from 'sweetalert2';
import InviteKeyCreate from './Create.vue';
import { mapState } from 'vuex';

@Component({
    components: {
        InviteKeyCreate,
    },
    computed: {
        ...mapState([
            'isUserLoggedIn',
            'user',
        ]),
    },
})
export default class InviteKeyOverview extends Vue {
    // for modals and things
    public createOpen: boolean = false;

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
        name: 'uuidSecret',
        required: true,
        label: 'uuidSecret',
        align: 'left',
        field: 'uuidSecret',
        sortable: true,
      },
      {
        name: 'code',
        required: true,
        label: 'Key Code',
        align: 'left',
        field: 'code',
        sortable: true,
      },
      {
        name: 'issuerId',
        required: true,
        label: 'issuerId',
        align: 'left',
        field: 'issuerId',
        sortable: true,
      },
      {
        name: 'receiverId',
        required: true,
        label: 'receiverId',
        align: 'left',
        field: 'receiverId',
        sortable: true,
      },
      {
        name: 'inUse',
        required: true,
        label: 'inUse',
        align: 'left',
        field: 'inUse',
        sortable: true,
      },
      {
        name: 'claimDate',
        required: true,
        label: 'Claim Date',
        align: 'left',
        field: 'claimDate',
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

    @Watch('createOpen', { immediate: true })
    public onChangeKey(value: any) {
        // reload keys,
        this.loadKeys();
    }

    public async mounted() {
        try {
            this.loadKeys();
        } catch (error) {
            console.log(error);
        }
    }

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }

    public async loadKeys() {
        try {
            // TODO: add pagination later...
            const response = (await invitekeyService.index2({
                page: 1,
                items: 50,
            })).data;
            // console.log(response);
            this.tableData = response.result;
            // console.log(response.result);
        } catch (error) {
            // an error
        }
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
            `The Invite Key with UUID: ${theItem.uuid}.`,
            'success',
            );
        }
        });
    }

}
</script>

<style scoped lang="scss">

</style>