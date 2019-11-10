<template>
    <div>
        <q-pagination
        v-model="pagination.pageNumber"
        color="purple"
        :min="1"
        :max="pagination.maxPages"
        :max-pages="8"
        boundary-links
        />
        <div v-if="sunkoiwishArticles.length > -1" class="shadow-7 q-ma-sm">
            <div class="row hvr-reveal">
                <div class="col-lg-12">
                    <div class="q-pa-md">
                        <div>
                            <span style="max-width:auto;" class="artTitle flex">{{ sunkoiwishArticles[pagination.pageNumber - 1].title }}</span>
                            <br>
                            <template>
                                Published Date: {{ sunkoiwishArticles[pagination.pageNumber - 1].pubdate }}
                            </template>
                        </div>
                        <br>
                        <div>
                            <div class="restrain">
                                <img class="responsive" :src="sunkoiwishArticles[pagination.pageNumber - 1].mainImage" alt="">
                            </div>
                            <div class="restrain" v-html="sunkoiwishArticles[pagination.pageNumber - 1].newDescription">
                            </div>
                            <div>
                                <a class="readMore" target="_blank" :href="sunkoiwishArticles[pagination.pageNumber - 1].link">Read More</a>
                            </div>
                        </div>
                        <div>
                        </div>
                        <q-inner-loading :visible="visible">
                        <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
                        </q-inner-loading>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import parser from 'rss-parser';
import skwService from '@/_services/sunkoiwishService';
import moment from 'moment';

// use this as copy and paste for making .vue files, change name
@Component
export default class SKWHeadlines extends Vue {
    // data can just be define here using public
    // array to hold rss feed
    public sunkoiwishArticles = [];

    public pagination = {
        pageNumber: 1,
        itemsPerPage: 1,
        maxPages: 10,
        isfilter: false,
    };

    public async mounted() {
        try {
            const response = (await skwService.getRSSTech()).data;
            console.log(response);
            response.forEach((element) => {
                let tempDesc = '';
                let imageURL = '';
                let readDesc = '';
                let newDesc = '';
                let x = 0;
                let y = 0;
                let z = 0;
                tempDesc = element.description;
                newDesc = tempDesc;
                x = tempDesc.indexOf('"');
                y = tempDesc.indexOf('.jpg');
                imageURL = tempDesc.slice(x + 1, y + 4);
                newDesc = newDesc.slice(y + 8);
                z = newDesc.indexOf('feed-readmore');
                // console.log(z);
                readDesc = newDesc.slice(0, z);
                element.newDescription = readDesc.slice(0, 240) + '...';
                element.mainImage = imageURL;
                // console.log(`x ${x} and y ${y}`);
                // console.log(imageURL);
                element.pubdate = moment(element.pubdate.toString()
                    .slice(0, 10), ['MM-DD-YYYY', 'YYYY-MM-DD']).format('MMMM Do YYYY');
            });
            const zeroObj = {
                nothing: 'blank',
            };
            this.sunkoiwishArticles = response;
        } catch (error) {
            console.log(error);
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

.readMore {
    color: rgb(194, 10, 117);
    text-decoration: none;
}

.readMore:hover {
    cursor: pointer;
    color: rgb(1, 85, 153);
}

.artTitle {
    font-size: 1.2em;
    font-weight: bold;
}

.restrain {
    width: auto;
}

.restrain > img {
    max-width: auto;
}

.restrain p img {
    width: 100px;
}

</style>