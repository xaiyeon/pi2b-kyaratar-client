<template>
    <div>
        <template>
            <div class="q-pa-lg">
                <div>
                    <template v-if="isUserLoggedIn">
                        <q-btn @click="openUpload()" glossy icon="video_library" label="Add Video" ></q-btn>
                    </template>
                    <div>
                        <br>
                        <q-pagination
                        class="shadow-4"
                        v-model="pagination.pageNumber"
                        color="blue-6"
                        :min="1"
                        :max="pagination.maxPages"
                        :max-pages="10"
                        boundary-links
                        />
                    </div>
                </div>
                <br>
                <template v-if="characterVideos.length > 0">
                    <div class="row">
                        <div v-for="(video, index) in characterVideos" :key="index" class="col-* inline wrap q-pa-md">
                            <div class="q-pa-md darkBG">
                                <q-btn label="info" color="grey-9">
                                <!-- Direct child of target -->
                                <q-popover>
                                    <div>
                                        <div class="q-pa-md">
                                            {{ video.title }}
                                            <br>
                                            Added by {{ video.User.displayName }}
                                            <br>
                                            Added on {{ video.createdAt }}
                                        </div>
                                    </div>
                                </q-popover>
                                </q-btn>
                                <q-btn label="More" color="grey-9">
                                <!-- Direct child of target -->
                                <q-popover>
                                    <div>
                                        <div class="q-pa-md">
                                            <div>
                                                Description: 
                                            </div>
                                            <br>
                                            {{ video.description }}
                                            <br>
                                        </div>
                                    </div>
                                </q-popover>
                                </q-btn>
                                <div @click="updateVideoViewCount(video.uuid)">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <template>
                <q-modal minimized :content-css="{minWidth: '80vw', minHeight: '80vh'}" no-backdrop-dismiss="Mfalse" v-model="showUploadModal">
                    <q-modal-layout>
                        <q-btn color="red" label="X" @click="closeUploadModal()"></q-btn>
                        <div class="q-pa-md">
                            Add or upload video (we only support a few video platforms)
                            <br>
                                <div>
                                    <q-input v-model="MvideoObj.title" float-label="Video Title" placeholder="Title" />
                                </div>
                                <div>
                                    <q-input v-model="MvideoObj.videoURL" float-label="Video URL" placeholder="Title" />
                                </div>
                                <div>
                                    <q-input v-model="MvideoObj.description" float-label="Video Description" placeholder="Title" />
                                </div>
                                <div>
                                    <q-select
                                    v-model="MvideoObj.kind"
                                    :options="kindOptions"
                                    />
                                </div>
                                <div>
                                    <q-select
                                    v-model="MvideoObj.status"
                                    :options="statusOptions"
                                    />
                                </div>
                            <br>
                            <q-btn @click="submitVideo(characterL.uuid)" label="Submit"></q-btn>
                        </div>
                    </q-modal-layout>
                </q-modal>
            </template>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mapState } from 'vuex';
import CharacterService from '../../_services/characterService';
import moment from 'moment';

// use this as copy and paste for making .vue files, change name
@Component({
    computed: {
        ...mapState([
            'isUserLoggedIn',
            'user',
        ]),
    },
})
export default class MediaVideos extends Vue {
    // data can just be define here using public
    @Prop({default: { options: Object }})
    public characterL!: any;

    public charaId = '';
    public characterNameRef = '';
    public characterVideos = [];

    public showUploadModal = false;
    public Mfalse = false;

    public pagination = {
        pageNumber: 1,
        itemsPerPage: 15,
        maxPages: null,
    };

    public kindOptions = [
        {
            label: 'official',
            value: 'official',
        },
        {
            label: 'fan',
            value: 'fan',
        },
        {
            label: 'idk',
            value: 'idk',
        },
    ];

    public statusOptions = [
        {
            label: 'public',
            value: 'public',
        },
        {
            label: 'unlisted',
            value: 'unlisted',
        },
        {
            label: 'private',
            value: 'private',
        },
    ];

    public MvideoObj = {
        title: '',
        description: '',
        videoURL: '',
        kind: '',
        status: '',
    };

    @Watch('pagination.pageNumber', { immediate: true })
    public onChangePage(value: any) {
        this.pagination.pageNumber = value;
        // console.log(this.pagination);
        // console.log(this.pagination.pageNumber);
        this.getVideos(this.charaId);
    }

    public openUpload() {
        this.showUploadModal = true;
    }

    public closeUploadModal() {
        this.showUploadModal = false;
    }

    public async submitVideo(charaId) {
        try {
            console.log(charaId);
            const videoObj = {
                title: this.MvideoObj.title,
                description: this.MvideoObj.description,
                videoURL: this.MvideoObj.videoURL,
                kind: this.MvideoObj.kind,
                status: this.MvideoObj.status,
                characterId: charaId,
                characterName: this.characterNameRef,
            };
            const response = (await CharacterService.uploadVideo(videoObj, charaId));
            console.log(response);
            console.log(response.data);
            this.getVideos(charaId);
        } catch (error) {
            console.log(error);
            console.log(error.response);
            // error.response.statusText
            // an error
        }
    }

    public async mounted() {
        this.charaId = this.characterL.uuid;
        this.characterNameRef = this.characterL.slug;
        try {
            this.getVideos(this.charaId);
        } catch (error) {
            // error
        }
    }

    // we only update this once.
    public async updateVideoViewCount(id) {
        try {
            // one time
        } catch (error) {
            // an error
        }
    }

    public async getVideos(id) {
        try {
            const type = 'official';
            const response = (await CharacterService.videoIndex(
                id, type, this.pagination.pageNumber, this.pagination.itemsPerPage)).data;
            console.log(response);
            this.characterVideos = response.result;
            this.pagination.maxPages = response.pages;
            let x = 0;
            this.characterVideos.forEach((video) => {
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

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }
}
</script>

<style scoped lang="scss">

.darkBG {
    color: white;
    background: rgba(0,0,0, 0.85);
}

</style>