<template>
    <div>
        <q-layout>
            <q-page-container>
                <q-page>
                    <div class="q-pa-lg">
                        <div class="row">
                            <div class="col-lg-12">
                                <h4>Edit Your Profile</h4>
                                <template v-if="isRealUser">
                                    <p>Hello, please edit your information below.</p>
                                    <div>
                                        <h5>Information</h5>
                                        <vue-editor v-model="editUserInfo.about"></vue-editor>
                                        <br>
                                        <q-btn color="primary" label="Save" @click="SaveChanges"></q-btn>
                                    </div>
                                </template>
                                <template v-else>
                                    <p>Sorry but you have no access to this.</p>
                                </template>
                            </div>
                        </div>
                    </div>
                </q-page>
            </q-page-container>
        </q-layout>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mapState } from 'vuex';
import userService from '@/_services/userService';
import swal from 'sweetalert2';
import { VueEditor } from 'vue2-editor';

// use this as copy and paste for making .vue files, change name
@Component({
    components: {
        VueEditor,
    },
    computed: {
        ...mapState([
            'isUserLoggedIn',
            'user',
        ]),
    },
})
export default class EditUserProfile extends Vue {
    // data can just be define here using public
    public currentUser;
    public isRealUser = false;
    public editUserInfo = {
        id: 0,
        username: '',
        about: '',
    };

    public async SaveChanges() {
        try {
            // get current user details, etc.
            this.editUserInfo.id = this.$store.state.user.id;
            this.editUserInfo.username = this.$store.state.user.username;
            const response = (await userService.put(this.editUserInfo)).data;
            swal({
            position: 'center',
            type: 'success',
            title: 'Look Master!',
            text: 'Master, profile changes have been saved successfully!',
            showConfirmButton: false,
            timer: 3000,
            });
            // console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    // we will check first if route matches current logged in user
    // TODO: Maybe add this as a guard in the future, resolver?
    public async created() {
        const currentRoute = this.$route;
        const currentUsername = this.$route.params.username;
        if (currentUsername !== this.$store.state.user.username) {
            this.isRealUser = false;
        } else {
            this.isRealUser = true;
        }
        // console.log(currentRoute);
        // console.log(currentUsername);
    }

    public async mounted() {
        const response = (await userService.show(this.$store.state.user.username)).data[0];
        if (this.isRealUser) {
            // then we can match the data
            this.editUserInfo.about = response.about;
        }
        console.log(response);
    }

    public navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }
}
</script>

<style scoped lang="scss">

</style>