<template>
    <div>
        <q-layout>
            <q-page-container>
                <q-page>
                    <div class="q-pa-lg">
                        <div class="row">
                            <div class="col-lg-12">
                                <q-btn label="Back" @click="goBack"></q-btn>
                                <h4 v-if="characterData">Edit Your True Character Favorite For: {{ characterData.Character.name }}</h4>
                                <template v-if="isRealUser">
                                    <p>Hello, please edit the information below.</p>
                                    <div>
                                        <h5>Information</h5>
                                        <q-input v-model="editTrueCharacterFavorite.name" type="text" float-label="Name or Title" maxlength="62"/>
                                        <q-input v-model="editTrueCharacterFavorite.displayOrder" type="number" float-label="Number for Order Rank" maxlength="5"/>
                                        <q-input v-model="editTrueCharacterFavorite.note" type="textarea" float-label="Note or Description" maxlength="555"/>
                                        <br>
                                        <q-btn color="primary" label="Save" @click="SaveChanges"></q-btn>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="row">
                                        <div class="col">
                                            <p class="q-pa-lg">Sorry but you have no access to this.</p>
                                        </div>
                                    </div>
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
import TrueCharacterFavoriteService from '@/_services/trueCharacterFavoriteService';
import UserService from '@/_services/userService';
import swal from 'sweetalert2';

// use this as copy and paste for making .vue files, change name
@Component({
    computed: {
        ...mapState([
            'isUserLoggedIn',
            'user',
        ]),
    },
})
export default class EditTrueCharacterFavorite extends Vue {
    public editTrueCharacterFavorite = {
        uuid: '',
        name: '',
        note: '',
        displayOrder: null,
    };

    public characterData;
    public isRealUser = false;

    @Watch('isRealUser', { immediate: true })
    public onChangeRealUser( value: any) {
        this.isRealUser = value;
    }

    // trueCharacterFavoriteId
    // we will check first if route matches current logged in user
    // TODO: Maybe add this as a guard in the future, resolver?
    public async beforeCreate() {
        let currentUsername;
        try {
            const xtcfId = this.$store.state.route.params.trueCharacterFavoriteId;
            const dataRespCheck = (await TrueCharacterFavoriteService.show(xtcfId)).data[0];
            currentUsername = (await UserService.show(this.$store.state.user.username)).data[0];
            if (dataRespCheck.fk_userId !== this.$store.state.user.uuid) {
                this.isRealUser = false;
            } else {
                this.isRealUser = true;
                console.log(this.isRealUser);
                // then do loading
                const tcfId = this.$store.state.route.params.trueCharacterFavoriteId;
                this.editTrueCharacterFavorite.uuid = tcfId;
                // console.log(tcfId);
                const dataResp = (await TrueCharacterFavoriteService.show(tcfId)).data[0];
                this.characterData = dataResp;
                this.editTrueCharacterFavorite = dataResp;
                // console.log(dataResp);
            }
        } catch (error) {
            // service down
        }
    }

    // TODO: finish this service for edit character favorites!
    public async mounted() {
        // console.log('mounted');
    }

    public goBack() {
        this.$router.go(-1);
    }

    public async SaveChanges() {
        // save
        try {
            const postResponse = (await TrueCharacterFavoriteService.put(this.editTrueCharacterFavorite)).data;
            swal({
            position: 'center',
            type: 'success',
            title: 'Look Master!',
            text: 'Master, True Character Favorite saved successfully!',
            showConfirmButton: false,
            timer: 3000,
            });
            // console.log(postResponse);
        } catch (error) {
            // an error
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

</style>