import Api from './api';

// anything related to the user and their account

export default {
  // check the invitekey the user entered
  // this is actually in invitekey code controller on server side
  checkInviteKey(invitekeycode: any) {
    return Api().post('invitekeymatch', invitekeycode);
  },
  inviteKeySuccess(applicant: any) {
    return Api().put('invitekeysuccess', applicant);
  },
  register(credentials: any) {
    return Api().post('register', credentials);
  },
  login(credentials: any) {
    return Api().post('login', credentials);
  },
  checkSessionOrToken(credentials: any) {
    return Api().put('checksessionortoken', credentials);
  },
};

// // Example
// AuthenticationService.register({
//     email: '',
//     username: '',
//     password: ''
// })
