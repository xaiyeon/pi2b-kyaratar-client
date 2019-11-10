<template>
    <div>
        <div class="clearBG">
            <!-- Footer -->
            <q-layout-footer>
                <div class="q-pa-sm kyafooter shadow-6" :style="{'background-image': 'url(' + require('@/assets/images/main/footer_tree.png') + ')'}">
                    <div class="bgdivspacer"></div>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="q-pa-sm">
                                <q-chip class="shadow-6" square color="white">
                                    <div>
                                        <img class="responsive footerLogo" src="@/assets/images/main/kyaratar-landv1.png" alt="">
                                    </div>
                                </q-chip>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="q-pa-sm">
                                <q-chip class="shadow-6" color="grey-10" square>
                                    <div class="q-pa-sm">
                                        <p>
                                            <span style="font-weight: bold; font-size: 1.2em">Kyaratar</span>
                                            <br>
                                            The premier curator community for all characters, and the creation of fun that connects all.
                                        </p>
                                        <div>
                                            <span style="font-weight: bold; font-size: 1.2em">Features</span>
                                            <br>
                                            <div class="flex wrap">
                                                <div class="q-pa-sm">
                                                    <q-chip class="shadow-6 hvr-pop" square color="primary">
                                                        <a style="cursor: pointer;" class="hover" @click="navigateTo(1)">All Characters</a>
                                                    </q-chip>
                                                </div>
                                                <div class="q-pa-sm">
                                                    <q-chip class="shadow-6 hvr-pop" square color="primary">
                                                        <a style="cursor: pointer;" class="hover" @click="navigateTo(2)">Custom Pages</a>
                                                    </q-chip>
                                                </div>
                                                <div class="q-pa-sm">
                                                    <q-chip class="shadow-6 hvr-pop" square color="primary">
                                                        <a style="cursor: pointer;" class="hover" @click="navigateTo(3)">Groups And Guilds</a>
                                                    </q-chip>
                                                </div>
                                                <div class="q-pa-sm">
                                                    <q-chip class="shadow-6 hvr-pop" square color="primary">
                                                        <a style="cursor: pointer;" class="hover" @click="navigateTo(4)">Collect And Battle</a>
                                                    </q-chip>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </q-chip>
                            </div>                            
                        </div>
                        <div class="col-md-3">
                            <div class="q-pa-sm">
                                <q-chip class="shadow-6" color="grey-10" square>
                                    <div class="q-pa-sm">
                                        <span style="font-weight: bold; font-size: 1.2em">Want To Help?</span>
                                        <br>
                                        <div class="flex wrap">
                                            <div class="q-pa-sm">
                                                <q-chip class="shadow-6 hvr-pop" square color="primary">
                                                    <a style="cursor: pointer;" class="hover" @click="navigateTo(5)">Become a Kyatain</a>
                                                </q-chip>
                                            </div>
                                            <div class="q-pa-sm">
                                                <q-chip class="shadow-6 hvr-pop" square color="primary">
                                                    <a style="cursor: pointer;" class="hover" @click="navigateTo(6)">Become an Affiliate</a>
                                                </q-chip>
                                            </div>
                                            <div class="q-pa-sm">
                                                <q-chip class="shadow-6 hvr-pop" square color="primary">
                                                    <a style="cursor: pointer;" class="hover" @click="navigateTo(7)">Become A Supporter</a>
                                                </q-chip>
                                            </div>
                                            <div class="q-pa-sm">
                                                <q-chip class="shadow-6 hvr-pop" square color="primary">
                                                    <a style="cursor: pointer;" class="hover" @click="navigateTo(8)">Be a Helper</a>
                                                </q-chip>
                                            </div>
                                        </div>
                                    </div>
                                </q-chip>
                            </div>                            
                        </div>
                        <div class="col-md-3">
                            <div class="q-pa-sm">
                                <q-chip class="shadow-6" color="grey-10" square>
                                    <div class="q-pa-sm">
                                        <span style="font-weight: bold; font-size: 1.2em">Information</span>
                                        <br>
                                        <div class="flex wrap">
                                            <div class="q-pa-sm">
                                                <q-chip class="shadow-6 hvr-pop" square color="primary">
                                                    <a style="cursor: pointer;" class="hover" @click="navigateTo(12)">About</a>
                                                </q-chip>
                                            </div>
                                            <div class="q-pa-sm">
                                                <q-chip class="shadow-6 hvr-pop" square color="primary">
                                                    <a style="cursor: pointer;" class="hover" @click="navigateTo(9)">Terms And Conditions</a>
                                                </q-chip>
                                            </div>
                                            <div class="q-pa-sm">
                                                <q-chip class="shadow-6 hvr-pop" square color="primary">
                                                    <a style="cursor: pointer;" class="hover" @click="navigateTo(10)">Privacy Policy</a>
                                                </q-chip>
                                            </div>
                                            <div class="q-pa-sm">
                                                <q-chip class="shadow-6 hvr-pop" square color="primary">
                                                    <a style="cursor: pointer;" class="hover" @click="navigateTo(11)">Data And Safety</a>
                                                </q-chip>
                                            </div>
                                            <div class="q-pa-sm">
                                                <q-chip class="shadow-6 hvr-pop" square color="primary">
                                                    <a style="cursor: pointer;" class="hover" @click="navigateTo(14)">Dev And Change Log</a>
                                                </q-chip>
                                            </div>
                                        </div>
                                    </div>
                                </q-chip>
                            </div>                            
                        </div>
                        <!-- <div
                            v-for="(col, i) in rows"
                            :key="i"
                            xs2
                            class="col-xs-3">
                            <span class="body-2" style="font-weight: bold;" v-text="col.title.toUpperCase()"></span>
                            <div
                            v-for="(child, i) in col.children"
                            :key="i"
                            >
                            <div v-if="child === shortDesc">
                                <p>{{ child }}</p>
                            </div>
                            <div v-else>
                                <a style="cursor: pointer;" class="hover" @click="navigateTo(child.linkNum)">{{ child.name }}</a>
                            </div>
                            </div>
                        </div> -->
                    </div>

                    <div class="divspacer"></div>
                    <div class="q-pa-md">
                        <q-toolbar-title align="center">
                            Page: {{ loadTimeSeconds }} seconds | 
                            &copy;2018 —  {{ dateYear }} <strong>Kyaratar</strong>
                        </q-toolbar-title>
                        <div style="text-align: center;">
                            Being an engineer isn't about the paper: It's about being able to turn your imagination into a product - Royce A.
                            <br>
                            Imagination is Endless
                        </div>
                        <div class="bottomspacer"></div>
                    </div>

                </div>
            </q-layout-footer>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class MainFooter extends Vue {
    public beforeTime: any;
    public afterTime: any;
    public loadTimeSeconds: number = 0;
    public data() {
        return {
            dateYear: (new Date()).getFullYear(),
            shortDesc: 'The curator community for all characters, and the creation of fun that connects all.',
            rows: [
            {
                title: 'Kyaratar',
                children: ['The curator community for all characters, and the creation of fun that connects all.'],
            },
            {
                title: 'Features',
                children: [
                { name: 'All Characters', linkNum: 1 },
                { name: 'Custom Pages', linkNum: 2 },
                { name: 'Groups and Guilds', linkNum: 3 },
                { name: 'Collect and Battle', linkNum: 4 },
                ],
            },
            {
                title: 'Want To Help?',
                children: [
                { name: 'Become a Kyatain', linkNum: 5 },
                { name: 'Become an Affiliate', linkNum: 6 },
                { name: 'Become A Supporter', linkNum: 7 },
                { name: 'Be a Helper', linkNum: 8 },
                ],
            },
            {
                title: 'Information',
                children: [
                { name: 'Terms & Conditions', linkNum: 9 },
                { name: 'Privacy Policy', linkNum: 10 },
                { name: 'Data & Safety', linkNum: 11 },
                { name: 'About', linkNum: 12 },
                { name: 'How Things Work', linkNum: 13},
                { name: 'Dev & Change Log', linkNum: 14},
                ],
            },
            ],
        };
    }
    public navigateTo(linkNumber: number) {
        if (linkNumber === 1) {
            this.$router.push({
            name: 'all-characters',
            });
        }
        if (linkNumber === 2) {
            this.$router.push({
            name: 'custom-pages',
            });
        }
        if (linkNumber === 3) {
            this.$router.push({
            name: 'groups-and-guilds',
            });
        }
        if (linkNumber === 4) {
            this.$router.push({
            name: 'battle-and-collect',
            });
        }
        // end of features
        if (linkNumber === 5) {
            this.$router.push({
            name: 'become-a-kyatain',
            });
        }
        if (linkNumber === 6) {
            this.$router.push({
            name: 'become-an-affiliate',
            });
        }
        if (linkNumber === 7) {
            this.$router.push({
            name: 'become-a-supporter',
            });
        }
        if (linkNumber === 8) {
            this.$router.push({
            name: 'become-a-helper',
            });
        }
        // end of want to help
        if (linkNumber === 9) {
            this.$router.push({
            name: 'terms-and-conditions',
            });
        }
        if (linkNumber === 10) {
            // k
            this.$router.push({
            name: 'privacypolicy',
            });
        }
        if (linkNumber === 11) {
            this.$router.push({
            name: 'data-and-safety',
            });
        }
        if (linkNumber === 12) {
            this.$router.push({
            name: 'about',
            });
        }
        if (linkNumber === 14) {
            this.$router.push({
                name: 'devandchangelog',
            });
        }
    }
    public beforeMount() {
        this.beforeTime = (new Date()).getTime();
    }
    public mounted() {
        this.afterTime = (new Date()).getTime();
        this.pageLoadTime();
    }
    public pageLoadTime() {
        this.loadTimeSeconds = (this.afterTime - this.beforeTime) / 1000;
    }
}
</script>

<style scoped lang="scss">

.prefooter {
    height: 5vh;
    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#000000+0,ffffff+100&1+0,0+46 */
    background: -moz-linear-gradient(top,  rgba(0,0,0,1) 0%, rgba(117,117,117,0) 46%, rgba(255,255,255,0) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top,  rgba(0,0,0,1) 0%,rgba(117,117,117,0) 46%,rgba(255,255,255,0) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom,  rgba(0,0,0,1) 0%,rgba(117,117,117,0) 46%,rgba(255,255,255,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#00ffffff',GradientType=0 ); /* IE6-9 */

}

.clearBG {
    background: rgba(255, 255, 255, 1.0);
}

.kyafooter {
     background-repeat: no-repeat;
}

.bgdivspacer {
    padding-top: 3vh;
}

.divspacer {
  margin: 2em 2em 2em 2em;
}

.bottomspacer {
    padding-bottom: 1em;   
}

.hover:hover {
    color: rgb(34, 107, 218);
}

.hover {
  cursor: pointer;
}

</style>
