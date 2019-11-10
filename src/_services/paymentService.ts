import Api from './api';

export default {
  paypalPay(dataObj: any) {
    return Api().post('paypal/pay', dataObj);
  },
  paypalSuccess(dataObj: any) {
    return Api().post('paypal/success', dataObj);
  },

};
