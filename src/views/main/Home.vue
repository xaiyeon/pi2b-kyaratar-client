<template>
    <div>
        <template v-if="this.$store.state.isUserLoggedIn">
            <homeloggedin />
        </template>
        <template v-else>
            <welcomenotloggedin />
        </template>
        <!-- <q-layout>
            <q-page-container>
                <q-page>
                    <div class="row">
                        <div class="col">
                            <p class="q-pa-lg text-center bemiddle">Welcome home</p>
                            <transition appear enter-active-class="animated slideInDown" leave-active-class="animated slideOutUp">
                                <div class="responsive text-center">
                                    <youtube :player-vars="videoOptions" :video-id="videoId"></youtube>
                                </div>
                            </transition>
                        </div>
                    </div>
                </q-page>
            </q-page-container>
        </q-layout> -->
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { MetaInfo } from 'vue-meta';
import WelcomeNotLoggedIn from '@/components/_shared/Welcome.vue';
import HomeLoggedIn from '@/components/_shared/HomeLoggedIn.vue';

// use this as copy and paste for making .vue files, change name
@Component({
    components: {
        welcomenotloggedin: WelcomeNotLoggedIn,
        homeloggedin: HomeLoggedIn,
    },
})
export default class Home extends Vue {
    // data can just be define here using public
    public metaInfo = {
      // title will be injected into parent titleTemplate
      title: 'About Us',
    };

    public videoId = 'r7jHjrQGLS4';
    public videoOptions = {
        start: 0,
        autoplay: 1,
    };

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }
}
</script>

<style scoped lang="scss">

.bemiddle {
  display: block;
  margin: auto;    
}

</style>