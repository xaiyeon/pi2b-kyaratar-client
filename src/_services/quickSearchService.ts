import Api from './api';

// layout of urls
// /mcategory
// /mcategory/:id

export default {
  // use post for searching instead...
  qscharacter(search: any) {
    return Api().post('qscharacter', search);
  },

  qsuser(search: any) {
    return Api().post('qsuser', search);
  },

  qgroup(search: any) {
    return Api().post('qgroup', search);
  },

};
