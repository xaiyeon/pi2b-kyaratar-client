import PayPalCancel from '../views/store/paypal/PayPalCancel.vue';
import PayPalSuccess from '../views/store/paypal/PayPalSuccess.vue';

// routes pertaining to anything to do with character

export default [
    {
        path: '/paypal/success',
        name: 'paypal-success',
        component: PayPalSuccess,
        meta: { requiresAuth: true },
    },
    {
        path: '/paypal/cancel',
        name: 'paypal-cancel',
        component: PayPalCancel,
        meta: { requiresAuth: true },
    },
];
