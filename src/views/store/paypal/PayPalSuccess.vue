<template>
    <div>
        <q-page>
            <div class="q-pa-md">
                <template>
                    <div class="receiptSize">
                        <div class="centerThings wordSuccess">
                            Success Master, your order has been fulfilled!
                        </div>
                        <div v-if="successSlip !== null">
                            <div class="q-pa-md">
                                <div>
                                    Here is your Digital Receipt. Please screenshot or save this as PDF.
                                </div>
                                <br>
                                <div class="shadow-6">
                                    <div class="invoiceBack q-pa-sm">
                                        <div class="row">
                                            <div class="col-lg-4">
                                                <img class="responsive center" src="@/assets/images/service/paypal-logo.png" alt="">
                                            </div>
                                            <div class="col-lg-4">
                                                Invoice
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <div class="float-left">
                                                    <div class="q-pa-sm">
                                                        Invoice Date:
                                                        <br>
                                                        {{ successSlip.result.create_time }}
                                                    </div>
                                                    <br>
                                                    <div class="q-pa-sm">
                                                        PayPal Order ID:
                                                        <br>
                                                        {{ successSlip.result.id }}
                                                    </div>
                                                    <br>
                                                    <div class="q-pa-sm">
                                                        Invoice ID:
                                                        <br>
                                                        {{ successSlip.dbResult.uuid }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-3">
                                                <div class="q-pa-sm">
                                                    Payee Email:
                                                    <br>
                                                    {{ successSlip.dbResult.payerInfo.email }}
                                                </div>
                                                <div class="q-pa-sm">
                                                    Billing/Shipping Address:
                                                    <br>
                                                    {{ successSlip.dbResult.payerInfo.shipping_address.recipient_name }}
                                                    <br>
                                                    {{ successSlip.dbResult.payerInfo.shipping_address.line1 }}
                                                    <br>
                                                    {{ successSlip.dbResult.payerInfo.shipping_address.city }}, {{ successSlip.dbResult.payerInfo.shipping_address.state }} {{ successSlip.dbResult.payerInfo.shipping_address.postal_code }}
                                                </div>
                                                <br>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-12">
                                                <div>
                                                    Order Summary
                                                </div>
                                                <br>
                                                <table>
                                                    <tr>
                                                        <th>
                                                            Name
                                                        </th>
                                                        <th>
                                                            SKU
                                                        </th>
                                                        <th>
                                                            Price
                                                        </th>
                                                        <th>
                                                            Quantity
                                                        </th>
                                                        <th>
                                                            Total
                                                        </th>
                                                    </tr>
                                                    <tr v-for="(item, index) in successSlip.dbResult.transactionInfo[0].item_list.items" :key="index">
                                                        <td>
                                                            {{ item.name }}
                                                        </td>
                                                        <td>
                                                            {{ item.sku }}
                                                        </td>
                                                        <td>
                                                            {{ item.price }}
                                                        </td>
                                                        <td>
                                                            {{ item.quantity }}
                                                        </td>
                                                        <td>
                                                            {{ item.price * item.quantity }}
                                                        </td>
                                                    </tr>
                                                </table>
                                                <hr>
                                                <div class="float-right">
                                                    Grand Total:
                                                    <br>
                                                    {{ successSlip.dbResult.transactionInfo[0].amount.total }} {{ successSlip.dbResult.transactionInfo[0].amount.currency }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br>
                        <br>
                        <br>
                        <br>
                    </div>
                </template>
            </div>
        </q-page>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import paymentService from '@/_services/paymentService';

// use this as copy and paste for making .vue files, change name
@Component
export default class PayPalSuccess extends Vue {
    // data can just be define here using public
    public successPayPalObj = {
        PayerID: '',
        paymentId: '',
        token: '',
        // totalPrice: 2.00,
    };

    public successSlip = null;

    public mounted() {
        // get those parameters
        try {
            if (this.$route.query.paymentId === undefined) {
                this.navigateTo('home');
            }
            console.log(this.$route.query);
            //@ts-ignore
            this.successPayPalObj.paymentId = this.$route.query.paymentId;
            //@ts-ignore
            this.successPayPalObj.PayerID = this.$route.query.PayerID;
            //@ts-ignore
            this.successPayPalObj.token = this.$route.query.token;
            this.paypalExecuteOrder();
        } catch (error) {
            // an error
        }
    }

    public async paypalExecuteOrder() {
        try {
            const response = (await paymentService.paypalSuccess(this.successPayPalObj)).data;
            console.log(response);
            this.successSlip = response;
            // now we reset the above.
            this.$route.query = null;
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

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

.invoiceBack {
    background: rgba($color: #f3e7e7, $alpha: 1.0); 
}

.wordSuccess {
    text-align: center;
    font-size: 1.3em;
    background: rgba($color: #f3e7e7, $alpha: 1.0);
    padding: 3px 3px 3px 3px;
}

.receiptSize {
    width: 50vw;
}

.centerThings {
    text-align: center;
    margin: auto;
    width: 40vw;
}

</style>