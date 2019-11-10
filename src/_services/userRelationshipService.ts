import Api from './api';

export default {

  getFriends(object: any) {
    return Api().put(`userrelationship/friends`, object);
  },

  fetchRequests(object: any) {
    return Api().put(`userrelationship/fetch`, object);
  },

  requestFriend(user: any) {
      return Api().put(`userrelationship/request`, user);
  },

  checkIfFriend(user: any) {
    return Api().put('/userrelationship/checkIfFriend', user);
  },

  deleteRelationship(relationUUID: any) {
    return Api().delete(`/userrelationship/${relationUUID}`);
  },

};
