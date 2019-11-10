<template>
  <!-- Header -->
  <q-layout-header>
    <!-- First row of header is a QToolbar -->
    <q-toolbar class="dark">
      <q-toolbar-title class="q-title">
        <span style="color: #ffbf00; cursor: pointer;" @click="navigateTo('home')" >Kyaratar</span> 
        <span v-if="$store.state.isUserLoggedIn" slot="subtitle"> Welcome {{ $store.state.user.displayName }}, the  
          <span style="color: #5ed0ff" v-if="this.$store.state.userRole.rank > 6">
            {{ this.$store.state.userRole.title }}
          </span>
          <span style="color: red" v-if="this.$store.state.userRole.title === 'Master Admin'">
            {{ this.$store.state.userRole.title }}
          </span>
        </span>
        <span v-else slot="subtitle">Welcome guest!</span>
      </q-toolbar-title>
        <quicksearch></quicksearch>
        <div v-if="$store.state.isUserLoggedIn" class="q-pr-md" ></div>
        <q-btn v-if="$store.state.isUserLoggedIn" round color="amber" text-color="black" icon="apps" @click.native="toTools">
            <q-tooltip anchor="bottom middle" self="top middle">
              Your user tools
            </q-tooltip>
        </q-btn>
        <div class="q-pr-md" ></div>
        <q-btn v-if="!$store.state.isUserLoggedIn" color="secondary" icon="" label="Login" to="/login" />
        <q-btn v-if="!$store.state.isUserLoggedIn" style="color: #FF0080" icon="" label="Register" to="/register" />
        <template v-if="$store.state.isUserLoggedIn">
          <q-btn-dropdown color="secondary" :avatar="$store.state.user.profileImageURL" label="Profile">
          <!-- dropdown content -->
          <q-list link>
              <q-item @click.native="userLinks(1)">
              <q-item-main>
                  <q-item-tile label>My Profile</q-item-tile>
              </q-item-main>
              </q-item>
              <q-item @click.native="userLinks(2)">
              <q-item-main>
                  <q-item-tile label>My Page</q-item-tile>
              </q-item-main>
              </q-item>
              <q-item @click.native="userLinks(3)">
              <q-item-main>
                  <q-item-tile label>My Social</q-item-tile>
              </q-item-main>
              </q-item>
              <q-item @click.native="userLinks(4)">
              <q-item-main>
                  <q-item-tile label>Settings</q-item-tile>
              </q-item-main>
              </q-item>
              <q-item @click.native="userLinks(5)">
              <q-item-main>
                  <q-item-tile label>Account</q-item-tile>
              </q-item-main>
              </q-item>
              <q-item @click.native="logout">
              <q-item-main>
                  <q-item-tile label>Log Out</q-item-tile>
              </q-item-main>
              </q-item>
          </q-list>
          </q-btn-dropdown>
        </template>  

    </q-toolbar>

    <!-- Second row of header is a QTabs -->
    <q-tabs class="dark shadow-3">
      <q-route-tab slot="title" icon="flare" to="/spotlight" replace label="Spotlight" />
      <!-- social will have groups and guilds in it listed -->
      <q-route-tab slot="title" icon="group" to="/social" replace label="Social" />
      <q-route-tab slot="title" icon="person_outline" to="/characters" replace label="Characters" />
      <q-route-tab slot="title" icon="trending_up" to="/ranking" replace label="Ranking" />
      <q-route-tab slot="title" icon="show_chart" to="/analytics" replace label="Analytics" />
      <q-route-tab slot="title" icon="location_city" to="/arena" replace label="Arena" />
    </q-tabs>
  </q-layout-header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import QuickSearch from '../../components/_shared/QuickSearch.vue';

@Component({
  components: {
    quicksearch: QuickSearch,
  },
})
export default class MainHeader extends Vue {
  public navigateTo(e) {
    this.$router.push({
      name: e,
    });
  }

  public toTools() {
    this.$router.push({
      name: 'user-tools',
      params: {
        username: this.$store.state.user.username,
      },
    });
  }

  public userLinks(i) {
    if (i === 1 && this.$store.state.isUserLoggedIn) {
      this.$router.push({
        name: 'viewUser',
        params: {
          username: this.$store.state.user.username,
        },
      });
    }
    if (i === 2 && this.$store.state.isUserLoggedIn) {
      this.$router.push({
        name: 'user-page',
        params: {
          username: this.$store.state.user.username,
        },
      });
    }
    if (i === 3 && this.$store.state.isUserLoggedIn) {
      this.$router.push({
        name: 'user-mysocial-manager',
        params: {
          username: this.$store.state.user.username,
        },
      });
    }
    if (i === 4 && this.$store.state.isUserLoggedIn) {
      this.$router.push({
        name: 'user-settings-manager',
        params: {
          username: this.$store.state.user.username,
        },
      });
    }
    if (i === 5 && this.$store.state.isUserLoggedIn) {
      this.$router.push({
        name: 'user-account-manager',
        params: {
          username: this.$store.state.user.username,
        },
      });
    }
  }

  // TODO: fix logout, works now
  private logout() {
    this.$store.dispatch('resetAuthStates');
    this.$router.push({name: 'home'});
  }
}
</script>

<style scoped lang="scss">

</style>
