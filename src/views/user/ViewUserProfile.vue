<template>
<div>
    <template v-if="puser">
        <div class="mainbg" v-bind:style="[puser[0].backgroundImageURL != '' & puser[0].backgroundImageURL != null ? { backgroundImage: 'url(' + puser[0].backgroundImageURL + ')' } : { backgroundImage: 'url(' + require('@/assets/images/placeholder/default_bg_image.jpg') + ')' }]">
            <div class="layoutAuto">
                <q-layout>
                    <q-page-container>
                        <!-- <top-profile/> -->
                        <nav-profile :puser="puser"/>
                        <div>
                            <router-view></router-view>
                        </div>
                        <!-- Default path is central -->
                        <template v-if="'/user/' + this.$route.params.username === this.$route.path">
                            <div>
                                <central :puser="puser"/>
                            </div>
                        </template>
                    </q-page-container>
                </q-layout>
            </div>
        </div>
    </template>
    <template v-else>
        <div>
            <q-page>
                <p>How did you end up here?</p>
            </q-page>
        </div>
    </template>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import TopProfile from '../../components/_user/profile/TopProfile.vue';
import NavProfile from '../../components/_user/profile/NavProfile.vue';
import Central from '../../components/_user/profile/nav/Central.vue';
import UserService from '../../_services/userService';
import UserRelationshipService from '@/_services/userRelationshipService';

// This UserProfile will use same route and ViewProfile, but depending on
// if the user is logged in, it will show different.
// NVM just make it on the same path, but if user is viewing their own profile show Edit.
@Component({
    components: {
        TopProfile,
        NavProfile,
        Central,
    },
})
export default class ViewUserProfile extends Vue {
    // data can just be define here using public
    public name: string = 'Central';
    // + the username in lowercase
    public baserouteName: string = '';
    public actualRoute: string = '';
    public userId: number = 0;
    public puser = null;
    public username = '';
    public beforeCreateLoad = false;

    // watch route for change
    @Watch('$route.params.username', { immediate: true })
    public onChangeR(value: any) {
        if (this.$route.params.username !== this.username && this.beforeCreateLoad) {
            location.reload();
        }
    }

    // not used
    @Watch('baserouteName', { immediate: true })
    public propertyChange(value: any) {
        this.baserouteName = value;
    }

    // we need to run a beforecreate
    public async beforeCreate() {
        try {
            // call user based on unique username
            // console.log(this.$route.params.username);
            this.baserouteName = '/user/' + this.$route.params.username;
            this.username = this.$route.params.username;
            // TODO: seems to work a bit
            const response = (await UserService.show(this.username)).data;
            this.puser = response;
            // enables watch for route
            this.beforeCreateLoad = true;
        } catch (error) {
            // error
        }
    }


}
</script>

<style scoped lang="scss">

.layoutAuto {
    height: auto;
}

.mainbg {
    background-size: cover;
}

.userimage {
    width:10em;
    height: 10em;
}

.usermain {
    padding-top: 25em;
    z-index: 9999;
}

</style>