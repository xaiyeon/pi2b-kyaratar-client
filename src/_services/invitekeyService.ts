import Api from './api';

// layout of urls
// /mcategory
// /mcategory/:id

export default {
  // index() {
  //   return Api().get('tags');
  // },
  // users can see only invitekeys they created

  // create an invite key
  post(inviteKey: any) {
    return Api().post('invitekeycreate', inviteKey);
  },
  inviteKeyCheck() {
    return Api().get('invitekeycheckcreate');
  },
  // for overview on all invite keys
  index2(paginationParams: any) {
    return Api().get('invitekeys2', {
      params: paginationParams,
    });
  },
};
