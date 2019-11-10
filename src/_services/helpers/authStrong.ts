import settings from '@/static/helpers/settings';
import cheapcrypt from 'cryptr';

// TODO: make this stronger!
// Mostly need for just back-end actually...
export default {
    EncryptToken(token: any) {
        // encrypt meth
    },
    DecryptToken(token: any) {
        // decrypt meth
    },
    // our methods used for above
    encrypt(e) {
        // let test = '';
        const hashSalt = settings.hashPassword;
        const cryptr = new cheapcrypt(hashSalt);
        const encryptS = cryptr.encrypt(e);
        // now add 2 characters in beginning, and 3 at end.
        console.log(encryptS);
        return encryptS;
    },
};
