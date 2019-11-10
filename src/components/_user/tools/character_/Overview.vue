<template>
    <div>
        <template v-if="this.$store.state.userRole.rank < 5">
            <div>
                <div class="q-pa-md">
                    <q-btn to="/character/tool/add" label="Create new">
                    </q-btn>
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
                                <q-btn color="purple" label="Edit" 
                                @click="navigateToEdit()">

                                </q-btn>
                                <q-btn label="!isPublic" @click="persistCharacterChange('isPublic')">

                                </q-btn>
                                
                                <q-btn label="!isEditable" @click="persistCharacterChange('isEditable')">
                                </q-btn>

                                <q-btn v-if="this.$store.state.userRole.rank < 7" label="!isDeletable" @click="persistCharacterChange('isDeletable')">
                                </q-btn>

                                <q-btn color="red" label="Delete" @click.native="deleteChara(selected[0])">
                                </q-btn>

                                <q-btn color="blue-grey" v-if="this.$store.state.userRole.rank < 5" label="GenerateStats" @click="persistCharacterChange('GenerateStats')">
                                </q-btn>

                            </div>
                        </q-alert>

                    </div>
                </template>    
                <q-table
                    title="Characters"
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
import CharacterService from './../../../../_services/characterService';
import swal from 'sweetalert2';
import router from '@/_router/router';
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
export default class CharacterOverview extends Vue {
    public tableData = [];
    public selected: any[] = [];
    public reallyDelete = false;
    public forsureDelete = false;

    public isPublicCharacter = {
        uuid: '',
        approvedBy: this.$store.state.user.displayName,
        isPublic: true,
    };

    public isEditableCharacter = {
        uuid: '',
        isEditable: true,
    };

    public isDeletableCharacter = {
        uuid: '',
        isDeletable: true,
    };

    public statsGenerateCharacter = {
        uuid: '',
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
        name: 'name',
        required: true,
        label: 'Name',
        align: 'left',
        field: 'name',
        sortable: true,
      },
      {
        name: 'slug',
        required: true,
        label: 'slug',
        align: 'left',
        field: 'slug',
        sortable: false,
      },
      {
        name: 'altName',
        required: true,
        label: 'Alt Name',
        align: 'left',
        field: 'altName',
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
        name: 'isBattleReady',
        required: true,
        label: 'isBattleReady',
        align: 'left',
        field: 'isBattleReady',
        sortable: true,
      },
      {
        name: 'isStatReady',
        required: true,
        label: 'isStatReady',
        align: 'left',
        field: 'isStatReady',
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

    @Watch('selected', { immediate: true })
    public onChangeS(value: any) {
        console.log(this.selected);
        if (this.selected) {
            // console.log(this.selected[0].uuid);
        }
    }

    @Watch('tableData', { immediate: true })
    public async onChangeData(value: any) {
        this.tableData = value;
    }

    public async loadData() {
        try {
            const response = (await CharacterService.index2({
                page: 1,
                items: 50,
            })).data;
            this.tableData = response.result;
        } catch (error) {
            // error
        }
    }

    public async mounted() {
        try {
            this.loadData();
        } catch (error) {
            console.log(error);
        }
    }

    // TODO: Why is the url incorrect...
    public navigateToEdit() {
        // console.log(this.selected[0].uuid);
        // console.log(this.selected[0].slug);
        const cId = this.selected[0].uuid;
        const cSlug = this.selected[0].slug;
        this.$router.push(
            {
                name: 'character-edit',
                params: {
                    characterId: cId,
                    slug: cSlug,
                },
            },
        );
    }

    // once we destroy this page make the switch
    // /character/:characterId/:slug/edit


    public async persistCharacterChange(mode) {
        if (mode === 'isPublic') {
          this.isPublicCharacter.uuid = this.selected[0].uuid;
          this.isPublicCharacter.isPublic = !this.selected[0].isPublic;
          console.log(this.isPublicCharacter);
          await CharacterService.put(this.isPublicCharacter).then(() => {
            const toast = (swal as any).mixin({
              toast: true,
              position: 'bottom-end',
              showConfirmButton: false,
              timer: 3000,
            });
            toast({
              type: 'success',
              title: 'Character isPublic changed!',
            });
          },
          );
          // reload it
          // TODO: pagination must match!
            try {
                const response = (await CharacterService.index2({
                    page: 1,
                    items: 50,
                })).data;
                // console.log(response);
                this.tableData = response.result;
            } catch (error) {
                console.log(error);
            }
        }
        if (mode === 'isEditable') {
          this.isEditableCharacter.uuid = this.selected[0].uuid;
          this.isEditableCharacter.isEditable = !this.selected[0].isEditable;
          await CharacterService.put(this.isEditableCharacter).then(() => {
            const toast = (swal as any).mixin({
              toast: true,
              position: 'bottom-end',
              showConfirmButton: false,
              timer: 3000,
            });
            toast({
              type: 'success',
              title: 'Character isEditable changed!',
            });
          },
          );
          // reload it
          // TODO: pagination must match!
            try {
                const response = (await CharacterService.index2({
                    page: 1,
                    items: 50,
                })).data;
                // console.log(response);
                this.tableData = response.result;
            } catch (error) {
                console.log(error);
            }
        }
        // for deletable
        if (mode === 'isDeletable') {
          this.isDeletableCharacter.uuid = this.selected[0].uuid;
          this.isDeletableCharacter.isDeletable = !this.selected[0].isDeletable;
          await CharacterService.put(this.isDeletableCharacter).then(() => {
            const toast = (swal as any).mixin({
              toast: true,
              position: 'bottom-end',
              showConfirmButton: false,
              timer: 3000,
            });
            toast({
              type: 'success',
              title: 'Character isDeletable changed!',
            });
          },
          );
          // reload it
          // TODO: pagination must match!
            try {
                const response = (await CharacterService.index2({
                    page: 1,
                    items: 50,
                })).data;
                // console.log(response);
                this.tableData = response.result;
            } catch (error) {
                console.log(error);
            }
        }
        if (mode === 'GenerateStats') {
            // generate stats
            const cstatsGenerateCharacter = {
                uuid: this.selected[0].uuid,
                isStatReady: true,
            };
          await CharacterService.put(cstatsGenerateCharacter).then(() => {
            const toast = (swal as any).mixin({
              toast: true,
              position: 'bottom-end',
              showConfirmButton: false,
              timer: 3000,
            });
            toast({
              type: 'success',
              title: 'Character stats have been generated!',
            });
          },
          );
          // reload it
          // TODO: pagination must match!
            try {
                const response = (await CharacterService.index2({
                    page: 1,
                    items: 50,
                })).data;
                // console.log(response);
                this.tableData = response.result;
            } catch (error) {
                console.log(error);
            }
        }
    }

    // Methods below
    protected async deleteChara(theItem) {
        // now we delete character
        try {
            const TempName = theItem.name;
            swal({
            title: 'Are you sure?',
            text: `You won't be able to revert this!`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            }).then(async (result) => {
                try {
                    if (result.value) {
                        const response = await CharacterService.delete(theItem.uuid).then((done) => {
                            this.loadData();
                            swal(
                            'Deleted!',
                            `The Character with name: ${TempName}.`,
                            'success',
                            );
                        });
                    }
                } catch (error) {
                    const status = error.response.status;
                    if (status === 403) {
                        swal({
                            title: 'Sorry Master',
                            text: `It seems Character: ${theItem.name}, cannot be deleted`,
                            type: 'error',
                            confirmButtonText: 'Okay',
                        });
                    }
                }
            });
            // console.log(response.data);
        } catch (error) {
            // if it's a 403 then we know it's isDelete false
            // console.log(error.response.status);
            const status = error.response.status;
            if (status === 403) {
                swal({
                    title: 'Sorry Master',
                    text: `It seems Character: ${theItem.name}, cannot be deleted`,
                    type: 'error',
                    confirmButtonText: 'Okay',
                });
            }
        }

    }
}
</script>

<style scoped lang="scss">

</style>