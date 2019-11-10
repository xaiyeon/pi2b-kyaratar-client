<template>
    <div>
        <div class="row">
            <div class="col">
                <h4>Make an invite key.</h4>
                <br>
                <p>
                    Please remember that you can only create one invite key every three days.
                </p>
                <br>
                <template v-if="this.$store.state.user.UserRole.rank < 4">
                    <p>Oh, you are of greater authority!</p>
                    <!-- Form for great authority, they can name keys -->

                    <q-btn label="Create an Invite Key" @click="createKey" />
                    <br>
                    <div class="q-pt-md"></div>
                </template>
                <template v-if="HasBeenAWeek">
                    <q-btn label="Create an Invite Key" @click="createKey" />
                </template>
                <template v-else>
                    <q-alert type="info">
                        <p>Sorry but it has not been three days yet for you to create a new invite key.</p>
                    </q-alert>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import invitekeyService from './../../../../_services/invitekeyService';
import moment from 'moment';
import swal from 'sweetalert2';
import { mapState } from 'vuex';

// use this as copy and paste for making .vue files, change name
@Component({
    computed: {
        ...mapState([
            'isUserLoggedIn',
            'user',
        ]),
    },
})
export default class InviteKeyCreate extends Vue {
    @Prop({default: null})
    public createOpen!: boolean;
    // data can just be define here using public
    // first we need to check all the invitekeys, or the previously last made one
    // check if a week has passed to make one.
    public HasBeenAWeek: boolean;
    public GreatCreateInviteKey = {
        issuerId: this.$store.state.user.id,
        issuerUid: this.$store.state.user.uid,
        name: '',
        isDeletable: false,
    };

    // load this
    public async mounted() {
        // works fine
        console.log(this.$store.state.user);
        const checkBeforeCreate = (await invitekeyService.inviteKeyCheck()).data;
        this.HasBeenAWeek = checkBeforeCreate.isAllow;
        // console.log(checkBeforeCreate);
    }

    // create an invite key
    public async createKey() {
        // let user create an invite key
        if (this.$store.state.user.UserRole.rank < 4) {
            if (this.GreatCreateInviteKey.name === '') {
                this.GreatCreateInviteKey.name = 'Normal Key';
                await invitekeyService.post(this.GreatCreateInviteKey).then
                  ((data) => {
                      this.createOpen = false;
                    // console.log(data);
                    const toast = (swal as any).mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 4000,
                    });
                    toast({
                    type: 'success',
                    title: 'Invite key created successfully!',
                    });
                    // TODO: Refresh page after creation
                    // this.$router.go();
                  });
            }
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