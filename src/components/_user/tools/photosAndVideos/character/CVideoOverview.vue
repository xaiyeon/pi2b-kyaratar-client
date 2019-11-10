<template>
    <div>
        <template v-if="this.$store.state.userRole.rank < 5">
            <div>
                <div class="q-pa-lg">
                    Character Videos Overview
                </div>
                <div>
                    <div>
                        <div>
                            <q-pagination
                            class="shadow-4"
                            v-model="pagination.pageNumber"
                            color="purple"
                            :min="1"
                            :max="pagination.maxPages"
                            :max-pages="10"
                            boundary-links
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div v-for="(video, index) in videos" :key="index" class="col-* flex inline no-wrap q-pa-sm">
                            <div class="shadow-6 q-pa-md">
                                <div class="flex inline">
                                    <div class="smallerImage">
                                        <q-btn class="shadow-7" color="white" style="position: absolute" flat push icon="more_vert">
                                            <q-popover
                                            >
                                                <q-list link style="min-width: 100px">
                                                <q-item @click.native="isReverseOption(video.keyNumber, video.isPublic, video.uuid, 'isPublic')">
                                                    <q-item-main label="isPublic" />
                                                </q-item>
                                                <q-item @click.native="isReverseOption(video.keyNumber, video.isEditable, video.uuid, 'isEditable')">
                                                    <q-item-main label="isEditable" />
                                                </q-item>
                                                <q-item v-if="$store.state.userRole.rank < 6" @click.native="isReverseOption(video.keyNumber, video.isDeletable, video.uuid, 'isDeletable')">
                                                    <q-item-main label="isDeletable" />
                                                </q-item>
                                                </q-list>
                                            </q-popover>
                                        </q-btn>
                                        <img class="responsive" :src="video.Character.avatarImageURL" alt="">
                                    </div>
                                    <div style="padding-left: 1.1em;" >
                                        Title: {{ video.title }}
                                        <br>
                                        Character: {{ video.Character.name }}
                                        <br>
                                        Submitted by: {{ video.User.username }}
                                        <br>
                                        <hr>
                                        Data: <br>
                                        isPublic - {{ video.isPublic }}
                                        <br>
                                        isEditable - {{ video.isEditable }}
                                        <br>
                                        isDeletable - {{ video.isDeletable }}

                                        <div>
                                            <q-btn label="View" color="grey-9">
                                            <!-- Direct child of target -->
                                            <q-popover>
                                                <div class="q-pa-md">
                                                    Thumb Image
                                                    <br>
                                                    <img class="smallVideoImage" :src="video.imageURL" alt="">
                                                    <br>
                                                </div>
                                                <div>
                                                    <div class="q-pa-md">
                                                        <div class="q-video" style="width: 426px; height: 240px">
                                                        <iframe
                                                            width="640"
                                                            height="360"
                                                            allow="autoplay; encrypted-media"
                                                            :src="video.videoURL"
                                                            frameborder="0"
                                                            allowfullscreen
                                                        ></iframe>
                                                        </div>
                                                        <br>
                                                    </div>
                                                </div>
                                            </q-popover>
                                            </q-btn>
                                            <q-btn color="red" @click="deleteVideo(video.keyNumber, video.title, video.uuid)" label="Delete">

                                            </q-btn>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <user-rank-denial />
        </template>
    </div>    
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import pandvToolService from './../../../../../_services/photoAndVideoToolService';
import moment from 'moment';
import swal from 'sweetalert2';

// use this as copy and paste for making .vue files, change name
@Component
export default class CVideoOverview extends Vue {
    // data can just be define here using public
    public videos = [];

    public pagination = {
        pageNumber: 1,
        itemsPerPage: 30,
        maxPages: null,
    };

    // keyNumber, uuid
    public async deleteVideo(e, title, id) {
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
                        const response = (await pandvToolService.cVideoDelete(vidObj));
                        console.log(response);
                        this.loadVideos();
                        swal(
                        'Deleted!',
                        `The Character Video with title: ${TempName}.`,
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

    // keyNumber, string, uuid
    public async isReverseOption(e, isWhat, id, opt) {
        // here we will take the boolean value make an object for the inverse of it
        // use the keyNumber and pass a string for the button binding
        try {
            const vidObj: any = {};
            if (opt === 'isPublic') {
                vidObj.uuid = id;
                vidObj.isPublic = !isWhat;
            }
            if (opt === 'isEditable') {
                vidObj.uuid = id;
                vidObj.isEditable = !isWhat;
            }
            if (opt === 'isDeletable') {
                vidObj.uuid = id;
                vidObj.isDeletable = !isWhat;
            }
            const response = (await pandvToolService.cVideoPut(vidObj)).data;
            console.log(response);
            this.loadVideos();
        } catch (error) {
            // an error
        }
    }

    public async loadVideos() {
        try {
            const query = {
                requestType: '',
            };
            const response = (await pandvToolService.cVideoIndex(query,
                this.pagination.pageNumber, this.pagination.itemsPerPage)).data;
            this.videos = response.result;
            this.pagination.maxPages = response.pages;
            let x = 1;
            this.videos.forEach((video) => {
                video.createdAt = moment(video.createdAt.toString().slice(0, 10),
                ['MM-DD-YYYY', 'YYYY-MM-DD']).format('MMMM Do YYYY');
                video.isView = false;
                video.keyNumber = x;
                x += 1;
            });
        } catch (error) {
            // an error
        }
    }

    public async mounted() {
        try {
            // depends...
            this.loadVideos();
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

.smallVideoImage {
    width: 140px;
    height: 100px;    
}

.smallerImage {
    width: 140px;
    height: 100px;
}

</style>