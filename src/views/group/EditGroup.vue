<template>
    <div>
        <q-layout>
            <q-page-container>
                <q-page>
                    <div class="row">
                        <div class="col">
                            <div class="q-pa-lg">
                                <h4>Edit Group</h4>
                                <div v-if="isDataThere && loadedGroupP">
                                    <template v-if="loadedGroupP.fk_userId === this.$store.state.user.uuid">
                                        <p>Welcome leader {{ this.$store.state.user.displayName }} of {{ loadedGroupP.name }}</p>
                                        <br>
                                        <div>
                                            <div>
                                                <h5>About</h5>
                                                <vue-editor v-model="loadedGroupP.about"></vue-editor>
                                                <br>
                                            </div>
                                            <div>
                                                <h5>Rules</h5>
                                                <vue-editor v-model="loadedGroupP.rules"></vue-editor>
                                                <br>
                                            </div>
                                            <q-btn color="primary" label="Save" @click="SaveChanges(loadedGroupP.uuid)"></q-btn>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <p>You do not have access to this.</p>
                                    </template>
                                </div>
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
import GroupService from '@/_services/groupService';
import moment from 'moment';
import swal from 'sweetalert2';
import { mapState } from 'vuex';
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
export default class EditGroup extends Vue {
    // data can just be define here using public
    public editGroup = {
        uuid: '',
        about: '',
        rules: '',
    };

    // later add picture and etc.
    public loadedGroupP = null;

    public isDataThere = false;

    @Watch('loadedGroupP', { immediate: true })
    public onChangeG( value: any) {
        this.loadedGroupP = value;
        this.isDataThere = true;
    }

    public async SaveChanges(uuid) {
        try {
            console.log('save');
            // do this error
            this.editGroup.uuid = this.loadedGroupP.uuid;
            if (this.editGroup.about === '') {
                // just assign previous values
                this.editGroup.about = this.loadedGroupP.about;
            }
            if (this.editGroup.rules === '') {
                this.editGroup.rules = this.loadedGroupP.rules;
            }
            const response = (await GroupService.save(this.editGroup)).data;
            console.log(response);
        } catch (error) {
            // error
            console.log(error);
        }
    }

    private async beforeCreate() {
        try {
            const ThegroupSlug = this.$store.state.route.params.url;
            const dataResponse = (await GroupService.show(ThegroupSlug, 'noCount')).data;
            this.loadedGroupP = dataResponse[0];
            console.log(this.loadedGroupP);
        } catch (error) {
            console.log(error);
        }
    }

    private navigateTo(e) {
        this.$router.push({
        name: e,
        });
    }
}
</script>

<style scoped lang="scss">

</style>