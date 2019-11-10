import Vue from 'vue';
import App from './App.vue';
// My components
import UserRankDenial from './components/_shared/UserRankDenial.vue';
import NotRegistered from './components/_shared/NotRegistered.vue';
import NoServer from './components/_shared/ServerDown.vue';
import titleMixin from './mixins/titleMixin';
import consoleClearMixin from './mixins/consoleClearMixin';

// import VueRouter from 'vue-router';
import router from './_router/router';
import store from './_store/store';
import { sync } from 'vuex-router-sync';
import Vuelidate from 'vuelidate';
import VueCarousel from 'vue-carousel';
import VueYouTubeEmbed from 'vue-youtube-embed';
import './registerServiceWorker';

// my css files
import './assets/css/userprofile.css';
import './../node_modules/hover.css';

import './styles/quasar.styl';
import 'quasar-framework/dist/quasar.ie.polyfills';
import 'quasar-extras/animate';
import 'quasar-extras/roboto-font';
import 'quasar-extras/material-icons';
import 'quasar-extras/ionicons';
import 'quasar-extras/mdi';
// Quasar import this way will have to do for now.
import Quasar, * as All from 'quasar-framework/dist/quasar.mat.esm.js';

// Charts
import Chart from 'vue2-frappe';
import VChart from 'v-chart-plugin';

// Other
import Ads from 'vue-google-adsense';
import VueScript from 'vue-script2';

Vue.use(VueScript);
Vue.use(Ads.Adsense);
Vue.use(Ads.InArticleAdsense);
Vue.use(Ads.InFeedAdsense);

// using my components globally.
Vue.component('user-rank-denial', UserRankDenial);
Vue.component('server-down', NoServer);
Vue.component('not-registered', NotRegistered);
// my globals mixins
Vue.mixin(titleMixin);
Vue.mixin(consoleClearMixin);

// etc, componentId: 'youtube-media'
Vue.use(Chart);
Vue.use(VChart);
Vue.use(VueYouTubeEmbed, { global: true });

// Vue.use(VueRouter);
Vue.use(VueCarousel);
Vue.use(Vuelidate);

Vue.use(Quasar, {
  components: All,
  directives: All,
  plugins: All,
});

sync(store, router);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h: any) => h(App),
}).$mount('#App');
