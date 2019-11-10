import Api from './api';

// anything related to user roles

export default {
  show(userroleId: number) {
    return Api().get(`/userrole/${userroleId}`);
  },

};
