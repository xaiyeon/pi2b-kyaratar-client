<template>
  <div id="app">
    <template v-if="this.$route.name == 'root'">
      <root />
    </template>
    <template v-else>
      <q-layout>
          <MainHeader/>
          <div class="MainBackgroundX">
            <q-page-container>
              <transition leave-active-class="animated slideOutUp">
                <router-view />
              </transition>
            </q-page-container>
          </div>
          <div class="footerBg">
            <MainFooter/>
          </div>
      </q-layout>
      <q-ajax-bar ref="lbar" />
    </template>
    <q-btn
      v-back-to-top
      round
      color="blue-5"
      class="fixed-bottom-right"
      style="margin: 0 15px 15px 0"
    >
      <q-icon name="keyboard_arrow_up" />
    </q-btn>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { openURL } from 'quasar';
import Root from './views/Root.vue';
import HelloWorld from './components/HelloWorld.vue';
import MainHeader from './components/_layout/MainHeader.vue';
import MainFooter from './components/_layout/MainFooter.vue';
import { mapState } from 'vuex';
import swal from 'sweetalert2';
import authService from '@/_services/authenticationService';

@Component({
  components: {
    Root,
    HelloWorld,
    MainHeader,
    MainFooter,
  },
  computed: {
      ...mapState([
          'isUserLoggedIn',
          'user',
      ]),
  },
})
export default class App extends Vue {
  public name = 'App';
  public checkOnce = false;
  public metaInfo = {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Default Title',
    // all titles will be injected into this template
    titleTemplate: '%s | My Awesome Webapp',
  };

  public isDrawer = false;

  // this will check for valid token or session upon page load
  public async mounted() {
    try {
      if (this.$store.state.isUserLoggedIn && !this.checkOnce) {
        // check through API
        const currentToken = this.$store.state.token;
        const checkObj = {
          token: currentToken,
          currentUser: this.$store.state.user.uuid,
        };
        // console.log(this.$store.state.user);
        const response = await authService.checkSessionOrToken(checkObj)
          .then((data) => {
            // console.log(data.data);
            if (data.data.isUser) {
              swal({
              title: 'Oopsie!',
              text: `${data.data.error}`,
              type: 'warning',
              allowOutsideClick: false,
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Relogin',
              }).then((result) => {
                if (result.value) {
                  this.logout();
                  this.navigateTo('login');
                } else {
                  this.logout();
                }
              });
            }
            this.checkOnce = true;
          });
      }
    } catch (error) {
      // error
    }
  }

  // TODO: fix logout, works now
  public logout() {
    this.$store.dispatch('setToken', null);
    this.$store.dispatch('setUser', null);
    this.$router.push({name: 'home'});
  }

  public navigateTo(e) {
      this.$router.push({
      name: e,
      });
  }

}
</script>

<style scoped lang="scss">

.MainBackgroundX {
  height: relative;
  background: url(assets/images/main/trianglify.svg);
  background-size: 100% 100%;
  -o-background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  background-size: cover;  
}

.footerBg {
  height: auto;
  background: rgba(255, 255, 255, 0.8);
  background-size: 100% 100%;
}

</style>
