<template>
    <div>
        <q-page>
            <template v-if="userData" >
                <div class="q-pa-md">
                    User Account, {{ userData.displayName }}
                    <br>
                    Your Current Service Plan: 
                    <hr>
                    <div>
                        <q-btn label="See Plans" @click="showPlans = !showPlans"></q-btn>
                    </div>
                    <template v-if="plans.length > 0 && showPlans">
                        <div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <br>
                                    <div>
                                        <q-pagination
                                        class="shadow-4"
                                        v-model="pagination.pageNumber"
                                        color="blue-5"
                                        :min="1"
                                        :max="pagination.maxPages"
                                        :max-pages="10"
                                        boundary-links
                                        />
                                    </div>
                                    <br>
                                </div>
                            </div>
                            <div class="row">
                                <div v-for="(plan, index) in plans" :key="index" class="col-lg-4 wrap flex">
                                    <q-card>
                                        <div class="q-pa-sm">
                                            Name: {{ plan.name }}
                                            <br>
                                            {{ plan.description }}
                                            <br>
                                            Price: {{ plan.usdPrice }}
                                        </div>
                                        <q-card-actions>
                                            <q-btn color="green-8" label="Buy">
                                                <q-popover>
                                                    <q-list separator link>
                                                    <!-- notice `v-close-overlay` which closes popover -->
                                                    <q-item v-close-overlay @click.native="buy(plan.uuid, plan.name)">
                                                        With PayPal
                                                    </q-item>
                                                    </q-list>
                                                </q-popover>
                                            </q-btn>
                                        </q-card-actions>
                                    </q-card>
                                </div>
                            </div>
                        </div>
                        <template>
                        <q-modal minimized :content-css="{minWidth: '92vw', minHeight: '92vh'}" v-model="showPayModal">
                            <q-btn
                            size="lg"
                            style="position: absolute; z-index: 999;"
                            color="primary"
                            @click="showPayModal = false"
                            label="Close"
                            />
                            <iframe class="respiframe" :src="paypalBill.url" frameborder="0"></iframe>
                        </q-modal>
                        </template>
                    </template>
                </div>
            </template>
            <template v-else>
                <div class="q-pa-md">
                    You do not have access to this.
                </div>
            </template>
        </q-page>
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mapState } from 'vuex';
import UserService from '../../_services/userService';
import ServicePlansService from '../../_services/servicePlanService';
import paymentService from '../../_services/paymentService';
import moment from 'moment';
import { VueEditor } from 'vue2-editor';
import { UserModel } from '@/_models/User';
import UserFunctions from '@/static/helpers/userFunctions';

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
export default class UserAccount extends Vue {
    public actualUser = '';
    // for user
    public userData = null;
    public tUsername = '';
    public dummyUserInfo!: UserModel;

    // services
    public plans = [];
    public showPlans = false;
    public showPayModal = false;

    // when paypal goes through
    public paypalBill = {
        url: '',
        totalPrice: 0.00,
    };
    // pagination
    public pagination = {
        pageNumber: 1,
        itemsPerPage: 50,
        maxPages: null,
    };

    // hooks

    public async mounted() {
        // console.log('mounted');
        // console.log(this.actualUser);
        this.tUsername = this.$route.params.username;
        if (this.$store.state.user.username === this.$route.params.username) {
            this.actualUser = this.$store.state.user.username;
            // now we load the data
            // console.log('load user');
            await this.loadUser(this.actualUser);
            this.loadPlans();
        }
    }

    // end of hooks

    // buttons
    public async buy(uuid, name) {
        try {
            // here we will try the paypal.
            console.log(`buy plan ${uuid}: ${name}`);
            const dataObj = {
                isType: true,
                planId: uuid,
            };
            const response = (await paymentService.paypalPay(dataObj)).data;
            console.log(response);
            if (response.url) {
                this.paypalBill.url = response.url;
                this.paypalBill.totalPrice = response.total;
                this.showPayModal = true;
            }
        } catch (error) {
            // an error
        }
    }

    public async loadPlans() {
        try {
            const response = (await ServicePlansService.index(
                null,
                this.pagination.pageNumber,
                this.pagination.itemsPerPage,
            )).data;
            console.log(response);
            this.plans = response.result;
            this.pagination.maxPages = response.pages;
        } catch (error) {
            // an error
        }
    }

    public async loadUser(e) {
        try {
            // try
            const response = (await UserService.getSettings(e)).data;
            // console.log(response);
            this.userData = response;
            // do some dummy data things
            this.dummyUserInfo = response;
            this.dummyUserInfo.privacyCompute = UserFunctions.privacyStatus(response.privacyCode);
            this.dummyUserInfo.birthDate = moment(response.birthDate.toString().slice(0, 10),
                ['MM-DD-YYYY', 'YYYY-MM-DD']).format('MMMM Do YYYY');
            this.dummyUserInfo.lastOnlineDate = moment(response.lastOnlineDate.toString().slice(0, 10),
                ['MM-DD-YYYY', 'YYYY-MM-DD']).format('MMMM Do YYYY');
            this.dummyUserInfo.createdAt = moment(response.createdAt.toString().slice(0, 10),
                ['MM-DD-YYYY', 'YYYY-MM-DD']).format('MMMM Do YYYY');
            this.dummyUserInfo.status = UserFunctions.userStatus(response.status);
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

.respiframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
}

</style>