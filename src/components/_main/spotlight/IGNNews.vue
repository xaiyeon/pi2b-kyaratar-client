<template>
    <div>
        <!-- <q-pagination
        v-model="pagination.pageNumber"
        color="purple"
        :min="1"
        :max="pagination.maxPages"
        :max-pages="8"
        boundary-links
        /> -->
        <div class="shadow-7">
            <div class="q-pa-sm">
                Brought to you by IGN
            </div>
            <div v-if="Articles.length > 0">
                <div class="row hvr-grow-shadow q-pa-sm" v-for="(article, index) in Articles" :key="index">
                    <div class="col-lg-12">
                        <div class="q-pa-md">
                            <div class="bitSmaller">
                                Published Date: <span v-if="article.pubdate">{{ article.pubdate }}</span>
                                <a style="max-width:auto;" class="readMore artTitle flex" target="_blank" :href="article.origlink">{{ article.title }}</a>
                                <q-btn color="blue-6" @click="modalArticle(article.origlink)" size="sm" label="in-view"></q-btn>
                            </div>
                            <q-inner-loading :visible="visible">
                            <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
                            </q-inner-loading>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <template>
        <q-modal minimized :content-css="{minWidth: '92vw', minHeight: '92vh'}" v-model="newsModal">
            <q-btn
            size="lg"
            style="position: absolute; z-index: 999;"
            color="primary"
            @click="newsModal = false"
            label="Close"
            />
            <iframe class="respiframe" :src="iframeLink" frameborder="0"></iframe>
        </q-modal>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import parser from 'rss-parser';
import OtherNewsService from '@/_services/rssNewsService';
import moment from 'moment';

// use this as copy and paste for making .vue files, change name
@Component
export default class IGNNews extends Vue {
    // data can just be define here using public
    // array to hold rss feed
    public Articles = [];

    public newsModal = false;
    public iframeLink = '';

    public pagination = {
        pageNumber: 1,
        itemsPerPage: 10,
        maxPages: 5,
        isfilter: false,
    };

    public modalArticle(link) {
        // console.log(link);
        this.iframeLink = link;
        this.newsModal = true;
    }

    public async mounted() {
        try {
            const response = (await OtherNewsService.getIGNNews()).data;
            // console.log(response);
            response.forEach((element) => {
                // let tempDesc = '';
                // let imageURL = '';
                // let readDesc = '';
                // let newDesc = '';
                // let x = 0;
                // let y = 0;
                // let z = 0;
                // tempDesc = element.description;
                // newDesc = tempDesc;
                // x = tempDesc.indexOf('"');
                // y = tempDesc.indexOf('.jpg');
                // imageURL = tempDesc.slice(x + 1, y + 4);
                // newDesc = newDesc.slice(y + 8);
                // z = newDesc.indexOf('feed-readmore');
                // // console.log(z);
                // readDesc = newDesc.slice(0, z);
                // element.newDescription = readDesc;
                // element.mainImage = imageURL;
                // // console.log(`x ${x} and y ${y}`);
                // // console.log(imageURL);
                // replace http: to https:
                element.origlink = element.origlink.replace('http:', 'https:');
                if (element.pubdate || element.pubDate) {
                    element.pubdate = moment(element.pubdate.toString()
                        .slice(0, 10), ['MM-DD-YYYY', 'YYYY-MM-DD']).format('MMMM Do YYYY');
                    // console.log(element);
                }
            });
            const zeroObj = {
                nothing: 'blank',
            };
            this.Articles = response.slice(0, 7);
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

.respiframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
}

.bitSmaller:hover {
    font-size: 0.84em;
}

.bitSmaller {
    font-size: 0.75em;
}

.readMore {
    color: rgb(116, 6, 6);
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