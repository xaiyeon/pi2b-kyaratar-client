<template>
    <div>
        <registerpanel v-if="isKeyValid" title="Register" color="pink">
            <div>
                <div class="row">
                    <div class="col-auto">
                        <div style="width: auto; max-width: 90vw; margin-right: 3em;">
                            <p style="text-align: center;">Day of Registration: {{ curDate }}</p>
                            <span>Invite Key in use: {{ invitekeycode }}</span>
                            <br>
                            <q-input autocomplete="off" v-model="username" type="text" float-label="Username" maxlength="64"/>
                            <p>Username: {{ alterUsername }}</p>
                            <q-input autocomplete="off" v-model="email" type="email" float-label="Email" maxlength="99"/>
                            <q-input autocomplete="off" v-model="displayName" type="text" float-label="Display Name" maxlength="64"/>
                            <p>Display Name: {{ alterDisplayName }}</p>
                            <br>
                            <p>Birthdate (YYYY-MM-DD): {{ birthDate }}</p>
                            <br>
                            <q-datetime-picker autocomplete="off" v-model="birthDate" type="date" />
                            <br>
                            <q-input v-model="password" type="password" float-label="Password" no-pass-toggle :error="formSubmitError" maxlength="64"/>
                            <q-input v-model="passwordagain" type="password" float-label="Password again" :error="formSubmitError" no-pass-toggle />
                            <br>
                            <div>
                                <div v-if="formError.length > 0">
                                    <q-alert type="negative">
                                        <p v-for="error in formError" :key="error.id" style="color: white">{{ error.message }}</p>
                                    </q-alert>
                                </div>
                            </div>
                            <br>
                            <q-btn color="tertiary" label="Register" @click="register" />
                            <br>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="tipsfix">
                            <h5 class="text-center">Here are some tips for registering!</h5>
                            <div>
                                <ul>
                                    <li>
                                        1. Try to give yourself a unqiue username!
                                    </li>
                                    <li>
                                        2. Make sure your password is NOT the same as your email's password!
                                    </li>
                                    <li>
                                        3. Your display name does not have to be the same as your username. In comparison, your display name can be your long awaited
                                        username! Ex: a person has a username called TheBest, but you wanted that one, so your display name can be TheBest, but your username
                                        cannot be called TheBest. This means, that your username is not displayed to other users, it's your display name.
                                    </li>
                                    <li>
                                        4. Your real username and display name is right below the ones you typed. We filter out certain things.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-">
                        <h5 class="text-center">Having trouble registering? Listen to my favorite song master.</h5>
                        <div>
                            <div class="q-video" style="width: 640px; height: 360px">
                            <iframe
                                width="640"
                                height="360"
                                allow="autoplay; encrypted-media"
                                src="https://www.youtube.com/embed/m0QEN4qF_vU"
                                frameborder="0"
                                allowfullscreen
                            ></iframe>
                            </div>
                        </div>
                    </div>                   
                </div>
            </div>            
        </registerpanel>
        <div v-else>
            <center>
            <div class="text-center" style="width: 500px; max-width: 90vw;">
                <h3>Invite Key Check</h3>
                <p>Have an invite key? Enter below to see if it works! By entering to the next step you agree and understand our terms and policies.</p>
                <q-input @keyup.enter.native="checkkey" v-model="invitekeycode" type="text" float-label="Enter Invite Key"/>
                <br>
                <q-btn label="Verify Key" @click="checkkey" />
            </div>
            </center>
            <div class="row">
                <div class="col">
                    <div class="text-center">
                    </div>
                        <div class="eulaformat">
                            <h4>End-User License Agreement (EULA) of <span class="app_name">Kyaratar</span></h4>

                            <p>This End-User License Agreement ("EULA") is a legal agreement between you and <span class="company_name">Akino (Akino, AkinoX, and Co.) </span></p>

                            <p>This EULA agreement governs your acquisition and use of our <span class="app_name">Kyaratar</span> software ("Software") or application directly from <span class="company_name">Akino </span> or indirectly through a <span class="company_name">Akino </span> authorized reseller or distributor (a "Reseller").</p>

                            <p>Please read this EULA agreement carefully before completing the installation process and using the <span class="app_name">Kyaratar</span> software. It provides a license to use the <span class="app_name">Kyaratar</span> software and contains warranty information and liability disclaimers.</p>

                            <p>If you register for a free trial of the <span class="app_name">Kyaratar</span> software, this EULA agreement will also govern that trial. By clicking "accept" or installing and/or using the <span class="app_name">Kyaratar</span> software, you are confirming your acceptance of the Software and agreeing to become bound by the terms of this EULA agreement.</p>

                            <p>If you are entering into this EULA agreement on behalf of a company or other legal entity, you represent that you have the authority to bind such entity and its affiliates to these terms and conditions. If you do not have such authority or if you do not agree with the terms and conditions of this EULA agreement, do not install or use the Software, and you must not accept this EULA agreement.</p>

                            <p>This EULA agreement shall apply only to the Software supplied by <span class="company_name">Akino </span> herewith regardless of whether other software is referred to or described herein. The terms also apply to any <span class="company_name">Akino </span> updates, supplements, Internet-based services, and support services for the Software, unless other terms accompany those items on delivery. If so, those terms apply.</p>

                            <h3>License Grant</h3>

                            <p><span class="company_name">Akino </span> hereby grants you a personal, non-transferable, non-exclusive licence to use the <span class="app_name">Kyaratar</span> software on your devices in accordance with the terms of this EULA agreement.</p>

                            <p>You are permitted to load the <span class="app_name">Kyaratar</span> software (for example a PC, laptop, mobile or tablet) under your control. You are responsible for ensuring your device meets the minimum requirements of the <span class="app_name">Kyaratar</span> software or web application.</p>

                            <p>You are not permitted to:</p>

                            <ul>
                            <li>Edit, alter, modify, adapt, translate or otherwise change the whole or any part of the Software nor permit the whole or any part of the Software to be combined with or become incorporated in any other software, nor decompile, disassemble or reverse engineer the Software or attempt to do any such things</li>
                            <li>Reproduce, copy, distribute, resell or otherwise use the Software for any commercial purpose</li>
                            <li>Allow any third party to use the Software on behalf of or for the benefit of any third party</li>
                            <li>Use the Software in any way which breaches any applicable local, national or international law</li>
                            <li>use the Software for any purpose that <span class="company_name">Akino </span> considers is a breach of this EULA agreement</li>
                            </ul>

                            <h3>Intellectual Property and Ownership</h3>

                            <p><span class="company_name">Akino </span> shall at all times retain ownership of the Software as originally downloaded by you and all subsequent downloads of the Software by you. The Software (and the copyright, and other intellectual property rights of whatever nature in the Software, including any modifications made thereto) are and shall remain the property of <span class="company_name">Akino </span>.</p>

                            <p><span class="company_name">Akino </span> reserves the right to grant licences to use the Software to third parties.</p>

                            <h3>Termination</h3>

                            <p>This EULA agreement is effective from the date you first use the Software and shall continue until terminated. You may terminate it at any time upon written notice to <span class="company_name">Akino </span>.</p>

                            <p>This EULA was created by <a href="http://eulatemplate.com">eulatemplate.com</a> for <span class="app_name">Kyaratar</span> and modified by Akino and Co.</p>

                            <p>It will also terminate immediately if you fail to comply with any term of this EULA agreement. Upon such termination, the licenses granted by this EULA agreement will immediately terminate and you agree to stop all access and use of the Software. The provisions that by their nature continue and survive will survive any termination of this EULA agreement.</p>

                            <h3>Governing Law</h3>

                            <p>This EULA agreement, and any dispute arising out of or in connection with this EULA agreement, shall be governed by and construed in accordance with the laws of <span class="country">The United States of America</span> and your consumer laws in which you reside.</p>
                            <br>
                            <div class="text-center">
                                <q-checkbox
                                    v-model="isAgree"
                                    color="primary"
                                    label="Do you agree with the EULA and terms & conditions?"
                                />
                                <br>
                                <br>
                                <div v-if="isAgree">
                                    <q-alert type="info">
                                        <p class="infoagree">Yes, I 100% agree and understand fully: not lying.</p>
                                    </q-alert>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Panel from '../../components/_shared/Panel.vue';
import AuthenticationService from '../../_services/authenticationService';
import UserRoleService from '../../_services/userRolesService';
import swal from 'sweetalert2';
import { date } from 'quasar';
import { RegisterFormError } from '../../_helper_models/RegisterFormError';
import moment from 'moment';
import _ from 'underscore';
import authenticationService from '../../_services/authenticationService';
// import bannedWords from '@/static/resources/bad-words-fb-base-mod.txt';

// exxample key: fe0846b4728311e8adc0fa7ae01bbebc
@Component({
    components: {
        registerpanel: Panel,
    },
})
export default class Register extends Vue {
    // gets current date
    public today = new Date();
    public curDate = moment().format('YYYY-MM-DD');
    public isKeyValid: boolean = false;
    public invitekeycode: string = '';
    public isAgree: boolean = false;
    // Form variables
    public username = '';
    public email = '';
    public displayName = '';
    public birthDate = '';
    public password = '';
    public passwordagain = '';
    // for default images
    public defaultBanner = 'https://s3-us-west-1.amazonaws.com/kyaratar/defaults/users/default_banner_img.jpg';
    public defaultProfile = 'https://s3-us-west-1.amazonaws.com/kyaratar/defaults/users/default_profile_img.png';
    public defaultBG = 'https://s3-us-west-1.amazonaws.com/kyaratar/defaults/users/default_bg_image.jpg';
    public formError: RegisterFormError[] = [];
    public formSubmitError = false;
    public passwordError = false;
    // Invite Key
    public InviteKeyTemp;
    // altered username and display
    public alterUsername = '';
    public alterDisplayName = '';

    @Watch('username', { immediate: true })
    public onUsername(value: any) {
        this.alterUsername = value.replace(/[^\w\s]/gi, '-');
        this.alterUsername = this.alterUsername.replace(/\s+/g, '-');
    }

    @Watch('displayName', { immediate: true })
    public onChangeDisplayName(value: any) {
        this.alterDisplayName = value.replace(/[^\w\s]/gi, '-');
        this.alterDisplayName = this.alterDisplayName.replace(/\s+/g, '-');
    }

    @Watch('birthDate', { immediate: true })
    public onPropertyChangeB(value: any) {
        this.birthDate = this.birthDate.slice(0, 10);
    }

    @Watch('passwordagain', { immediate: true })
    public onPropertyChange(value: any) {
        if (this.passwordagain !== this.password) {
            if (this.passwordError) {
                this.formError.push({id: this.formError.length + 1, message: 'Passwords must match!' });
            }
            this.passwordError = false;
            this.formSubmitError = true;
        } else {
            for (const e of this.formError) {
                if (e.message === 'Passwords must match!') {
                    this.formError.splice(this.formError.indexOf(e), this.formError.length);
                }
            }
            this.formSubmitError = false;
            this.passwordError = true;
        }
    }

    public mounted() {
        // lol
    }

    public async register() {
        const pass = this.submitForm();
        if (pass) {
            try {
                // form is valid, I guess
                // console.log('registering...');
                const response = (await AuthenticationService.register({
                    email: this.email,
                    username: this.alterUsername,
                    displayName: this.alterDisplayName,
                    password: this.password,
                    birthDate: this.birthDate,
                    bannerImageURL: this.defaultBanner,
                    profileImageURL: this.defaultProfile,
                    backgroundImageURL: this.defaultBG,
                    fk_userRoleId: 'eecb4807-f119-447a-956b-11a149d9c730',
                    fk_inviteKeyId: this.InviteKeyTemp[0].uuid,
                })).data;
                // call persistRegister to mark invitekey and user in back-end
                // then also call a method to PUT invitekey with edits and such.
                const responseTemp = response;
                // console.log(responseTemp);
                const finish = await this.persistRegister(response);
                // console.log(responseTemp.token);
                // console.log(responseTemp.user);
                this.$store.dispatch('setToken', responseTemp.token);
                this.$store.dispatch('setUser', responseTemp.user);
                const userRole = this.getUserRole(responseTemp);
                swal({
                    position: 'center',
                    type: 'success',
                    title: 'Hooray!',
                    text: 'Welcome to Kyaratar, new user ' + responseTemp.user.displayName,
                    timer: 3000,
                    showConfirmButton: false,
                });
                this.navigateTo('home');
            } catch (error) {
                if (error.response) {
                    // console.log(error.response.data);
                    // an error
                    this.formError.push({id: this.formError.length + 1, message: error.response.data.error });
                }
                // console.log(error);
            }
        }
    }

    // this method gets called after register success passes!
    public async persistRegister(responseUser) {
        try {
            console.log(responseUser);
            console.log(this.InviteKeyTemp[0].uuid);
            const successResponse = await authenticationService.inviteKeySuccess({
                userId: responseUser.user.uuid,
                inviteKeyId: this.InviteKeyTemp[0].uuid,
            });
            // console.log('persist done!');
            return successResponse;
        } catch (error) {
            // an error
        }
    }

    public async getUserRole(responseUser) {
      try {
        // next also get the user roles and store
        const responseUserRole = await UserRoleService.show(responseUser.user.fk_userRoleId);
        this.$store.dispatch('setUserRole', responseUserRole.data);
        // console.log(this.$store.state.userRole.title);
        return responseUserRole;
      } catch (error) {
        // this.error = error.responseUserRole.data.error;
      }
    }

    public checkAge() {
        const curDateSplt = this.curDate.split('-', 3);
        const userDobSplt = this.birthDate.split('-', 3);
        // console.log(curDateSplt[0]);
        // console.log(userDobSplt[0]);
        const computedSimpleAge: number = parseInt(curDateSplt[0], 10) - parseInt(userDobSplt[0], 10);
        // console.log(`age is ${computedSimpleAge}`);
        if ( computedSimpleAge > 14 ) {
            return true;
        } else {
            this.formError.push({id: this.formError.length + 1, message:
            'Sorry you do not meet the requirements of the law.' });
            swal({
                position: 'center',
                type: 'error',
                title: 'Sorry!',
                text: 'You cannot join: we will record this error and your machine.' +
                ' Please do not register, it is against the law.',
                showConfirmButton: true,
            });
            this.navigateTo('home');
        }
    }

    // checks the form and valid birthday before registering
    // return true if it's good, return false for bad!
    public submitForm() {
        this.formError = [];
        if (this.username === '') {
            this.formError.push({id: this.formError.length + 1, message: 'Username cannot be empty!' });
        }
        if (this.email === '') {
            this.formError.push({id: this.formError.length + 1, message: 'Email cannot be empty!' });
        }
        if (this.displayName === '') {
            this.formError.push({id: this.formError.length + 1, message: 'Display Name cannot be empty!' });
        }
        if (this.birthDate === '') {
            this.formError.push({id: this.formError.length + 1, message: 'Birthdate cannot be empty!' });
        }
        if (this.password === '') {
            this.formError.push({id: this.formError.length + 1, message: 'Password cannot be empty!' });
        }
        if (this.passwordagain === '') {
            this.formError.push({id: this.formError.length + 1, message: 'Password again cannot be empty!' });
        }
        if (this.formSubmitError === true) {
            this.formError.push({id: this.formError.length + 1, message: 'Passwords must match!' });
        }
        if (this.ValidateEmail(this.email)) {
            this.formError.push({id: this.formError.length + 1, message: 'Email is not valid.' });
        }
        // console.log(this.formError);
        // check registrants age lololol
        // TODO: check username and display name for spaces, and replace some characters!
        // NO !@#%%, only letters and numbers allowed.
        // this.checkUsernameAndDisplayName(this.username, this.displayName);
        this.checkAge();
        // for any error left
        if (this.formError.length > 0) {
            this.formError = [];
            return false;
        } else {
            return true;
        }
    }

    public checkUsernameAndDisplayName(username, displayName) {
        // check for spaces, etc. regex = regular expressions
        username.replace(/[^\w\s]/gi, '');
        console.log(username);
    }

    public async checkkey() {
        try {
            // check if not empty
            if (this.invitekeycode !== '') {
                    if (this.isAgree) {
                    // now submit to server and check
                    // console.log(this.invitekeycode);
                    const response = (await AuthenticationService.checkInviteKey({
                        code: this.invitekeycode,
                    })).data;
                    this.InviteKeyTemp = response;
                    // console.log(response);
                    if (!response[0].inUse) {
                        swal({
                            position: 'center',
                            type: 'success',
                            title: 'Hooray Master!',
                            text: 'That key is valid and ready for use!',
                            showConfirmButton: true,
                        });
                        this.isKeyValid = true;
                    }
                } else {
                    swal({
                        position: 'center',
                        type: 'error',
                        title: 'EULA',
                        text: 'Please read the EULA below, and terms and conditions.',
                        showConfirmButton: true,
                    });
                }
            }

        } catch (error) {
            const serverMessage = error.response.data.message;
            // console.log(serverMessage);
            swal({
                position: 'center',
                type: 'error',
                title: 'Oops...',
                text: serverMessage,
                showConfirmButton: true,
            });
        }
    }

    public ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return false;
        } else {
            return true;
        }
    }
    public data() {
        return {
            dateYear: (new Date()).getFullYear(),
        };
    }
    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }
}
</script>

<style scoped lang="scss">

.tipsfix {
    padding: 1em 1em 1em 1em;
}

.eulaformat {
    margin: 3em 3em 3em 3em;
}

.infoagree {
    font-size: 4em;
}

</style>