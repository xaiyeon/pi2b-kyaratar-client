<template>
    <div>
        <template>
            <div class="row">
                <div class="col-lg-12">
                    <div class="q-ma-md" style="font-weight: 700; font-size: 1.1em;">
                        Just Numbers
                    </div>
                    <div>
                        <span><span class="dataAttrib">Rank: </span>{{ characterL.rank }}</span>
                    </div>
                    <div>
                        <span><span class="dataAttrib">View Count: </span>{{ characterL.viewCount }}</span>
                    </div>
                    <div>
                        <span><span class="dataAttrib">Favorite Count: </span>{{ characterL.favoriteCount }}</span>
                    </div>
                    <div>
                        <span><span class="dataAttrib">Like Count: </span>{{ characterL.likeCount }}</span>
                    </div>
                    <div>
                        <span><span class="dataAttrib">Upvote Count: </span>{{ characterL.upvoteCount }}</span>
                    </div>
                    <div>
                        <span><span class="dataAttrib">Create Date: </span> {{ createDate }}</span>
                    </div>
                    <div>
                        <span><span class="dataAttrib">Update Date: </span> {{ updateDate }}</span>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { CharacterModel } from '../../_models/Character';
import moment from 'moment';

// use this as copy and paste for making .vue files, change name
@Component
export default class Statistics extends Vue {
    @Prop({default: { options: Object }})
    public characterL!: CharacterModel;

    public createDate = '';
    public updateDate = 'N/A';

    @Watch('characterL')
    public changeCharVal(value: any) {
        this.characterL = value;
    }

    public mounted() {
        this.createDate = moment(this.characterL.createdAt.toString()).format('YYYY-MM-DD HH:mm:ss');
        this.updateDate = moment(this.characterL.updatedAt.toString()).format('YYYY-MM-DD HH:mm:ss');
    }

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }
}
</script>

<style scoped lang="scss">

.dataAttrib {
    font-weight: bold;
    font-style: italic;
}

</style>