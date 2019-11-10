<template>
    <div>
        <q-page>
            <loginpanel title="Login" color="tertiary">
                <div>
                    <div style="width: 500px; max-width: 90vw;">
                        <div v-if="error">
                            <q-alert type="negative">
                                {{ error }}
                            </q-alert>
                            <br>
                        </div>
                        <div v-if="rateMessage">
                            <q-alert type="info">
                                {{ rateMessage }}
                            </q-alert>
                            <br>
                        </div>
                        <q-input v-model="username" type="text" float-label="Username"/>
                        <q-input @keyup.enter.native="login" autocomplete="off" v-model="password" type="password" float-label="Password" no-pass-toggle />
                        <br>
                        <q-btn label="Login" @click="login" />
                    </div>
                </div>
            </loginpanel>
        </q-page>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { required, email } from 'vuelidate/lib/validators';
import Panel from '../../components/_shared/EasyPanel.vue';
import AuthenticationService from '../../_services/authenticationService';
import UserRoleService from '../../_services/userRolesService';
import bcrypt from 'bcryptjs';
import settings from '@/static/helpers/settings';
import cheapcrypt from 'cryptr';

@Component({
    components: {
        loginpanel: Panel,
    },
})
export default class Login extends Vue {
    // you declare data like this now.
    public username = '';
    // password will be encrypted front-end then decrypted back-end
    public password = '';
    // send are encrypted versions
    public sendUsername: any;
    public sendPassword: any;
    public error = '';
    public rateMessage = '';

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }

    @Watch('username', { immediate: true })
    public changeUser(value: any) {
        this.sendUsername = this.encrypt(value);
        // console.log(this.sendUsername);
    }

    @Watch('password', { immediate: true })
    public changePassword(value: any) {
        this.sendPassword = this.encrypt(value);
        // console.log(this.sendPassword);
    }

    // these are cheap encrpytion, beware
    // both username and password will be encrypted front-end
    public encrypt(e) {
        // let test = '';
        const hashSalt = settings.hashPassword;
        const cryptr = new cheapcrypt(hashSalt);
        const encryptS = cryptr.encrypt(e);
        // console.log(encryptS);
        return encryptS;
        // bcrypt.hash(e, 5, ((err, hash) => {
        //         // Store hash in your password DB.
        //         console.log(hash);
        //         test = hash;
        //         return hash;
        //     }
        // ));
    }

    public async login() {
        // console.log('logging in');
        try {
            const response = await AuthenticationService.login({
            username: this.sendUsername,
            password: this.sendPassword,
            });
            // keep track of and use it in our store
            this.$store.dispatch('setToken', response.data.token);
            this.$store.dispatch('setUser', response.data.user);
            const userRole = this.getUserRole(response);
            this.$router.push({
            name: 'home',
            });
        } catch (error) {
            // console.log(error.response.data.message); // this is it
            if (error.response.data.message) {
                this.rateMessage = error.response.data.message;
            }
            this.error = error.response.data.error;
        }
    }
    public async getUserRole(responseUser) {
      try {
        // next also get the user roles and store
        const responseUserRole = await UserRoleService.show(responseUser.data.user.fk_userRoleId);
        this.$store.dispatch('setUserRole', responseUserRole.data);
        // console.log(this.$store.state.userRole.title)
      } catch (error) {
        this.error = error.responseUserRole.data.error;
      }
    }
}
</script>

<style scoped lang="scss">

</style>