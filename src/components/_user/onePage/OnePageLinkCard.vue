<template>
    <div>
        <div>
            <div class="row">
                <template v-if="pageLinks">
                    <div class="col-* wrap flex" v-for="(link, index) in pageLinks.larray" :key="index">
                        <template>
                            <q-card inline class="q-ma-sm shadow-5">
                                <q-card-main>
                                    <div style="cursor: pointer;">
                                        <div class="row">
                                            <div class="col-auto wrap flex">
                                                <q-btn flat round style="position: absolute;" icon="info" color="black-2">
                                                <!-- Direct child of target -->
                                                <q-popover>
                                                    <div>
                                                        <div class="q-pa-md">
                                                            <div style="text-align: center;">
                                                                {{ link.heading }}
                                                            </div>
                                                            <br>
                                                            Added on: {{ link.createdAt }}
                                                            <br>
                                                            Description: {{ link.description }}
                                                        </div>
                                                    </div>
                                                </q-popover>
                                                </q-btn>
                                                <div style="text-align: center;">
                                                    <a target="_blank" :href="link.link">
                                                        <img class="responsive fluid" style="width:320px; height:120px" :src="link.imageURL" alt="">
                                                    </a>
                                                </div>                                        
                                                <div>
                                                <q-btn v-if="pageLinks.isEdit" @click="deleteLink(link.uuid, link)" color="red" label="X">
                                                </q-btn>
                                                <br>
                                                <q-btn v-if="pageLinks.isEdit"  color="purple" label="Edit" @click.native="photoOption(link.keyNumber)">
                                                </q-btn>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </q-card-main>
                            </q-card>
                        </template>
                    <template>
                        <q-modal minimized :content-css="{minWidth: '80vw', minHeight: '60vh'}" no-backdrop-dismiss="Mfalse" v-model="viewModal">
                            <q-modal-layout>
                                <q-btn color="red" label="X" @click="viewModal=false"></q-btn>
                                <div class="q-pa-md">
                                    <q-alert icon="image" color="green-4">Edit your link banner!
                                        <q-btn round dense color="dark" icon="info">
                                            <q-tooltip anchor="bottom middle" self="top middle">
                                                If you want to put a new image, just make a new link banner.
                                            </q-tooltip>
                                        </q-btn>
                                    </q-alert>
                                    <br>
                                        <div>
                                            <q-input v-model="pageLinks.larray[modalNumber].heading" float-label="Title" placeholder="Title" />
                                        </div>
                                        <div>
                                            <q-input type="number" v-model="pageLinks.larray[modalNumber].order" float-label="Order" placeholder="1" />
                                        </div>
                                        <div>
                                            <q-input v-model="pageLinks.larray[modalNumber].link" float-label="URL" placeholder="Title" />
                                        </div>
                                        <div>
                                            <q-input v-model="pageLinks.larray[modalNumber].description" float-label="Description" placeholder="Title" />
                                        </div>
                                        <!-- <div>
                                            <q-select
                                            v-model="linkObj.kind"
                                            :options="kindOptions"
                                            />
                                        </div>
                                        <div>
                                            <q-select
                                            v-model="MvideoObj.status"
                                            :options="statusOptions"
                                            />
                                        </div> -->
                                    <br>
                                    <q-btn @click="editSaveLink(pageLinks.larray[modalNumber], link.keyNumber)" label="Save"></q-btn>
                                </div>
                            </q-modal-layout>
                        </q-modal>
                    </template>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mapState } from 'vuex';
import swal from 'sweetalert2';
import moment from 'moment';
import { VueEditor } from 'vue2-editor';
import userService from '@/_services/userService';

// use this as copy and paste for making .vue files, change name
@Component
export default class OnePageLinkCard extends Vue {
    @Prop({default: { options: Object }})
    public pageLinks!: any;

    public editLinkModal = false;
    public modalNumber = 0;
    public viewModal = false;
    public Mfalse = false;

    // based on the index of the linkbanner array
    public async editSaveLink(theLinkObj, id) {
        try {
            // try
            console.log(theLinkObj);
            console.log(theLinkObj.heading);
            const response = await userService.updateLink(theLinkObj.uuid,
                theLinkObj).then((dataRes) => {
                    console.log(dataRes);
                    const toast = (swal as any).mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 4000,
                    });
                    toast({
                    type: 'success',
                    title: 'OnePageLink updated successfully!',
                    });
                });
        } catch (error) {
            // an error
        }
    }

    // for edit modal
    public photoOption(anum) {
        this.pageLinks.larray[anum].isView = false;
        this.pageLinks.larray.forEach((element) => {
            element.isView = false;
        });
        this.modalNumber = anum;
        console.log(anum);
        this.pageLinks.larray[anum].isView = true;
        this.viewModal = true;
        console.log(this.pageLinks.larray[anum].isView);
    }

    public async deleteLink(id, index) {
        try {
            // try this
            const body = {
                username: this.pageLinks.username,
                fk_userOnePageLinkId: this.pageLinks.fk_userOnePageLinkId,
            };
            console.log(body);
            const response = await userService.deleteLink(id, body).then(
                (result) => {
                    console.log(result);
                    delete this.pageLinks.larray[index];
                },
            );
        } catch (error) {
            // an error
        }
    }

    public async mounted() {
        try {
            // idk
            console.log(this.pageLinks);
        } catch (error) {
            // error
        }
    }

    public navigateToGroup(g) {
        this.$router.push({
            name: 'group',
            params: {
                url: g,
            },
        });
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