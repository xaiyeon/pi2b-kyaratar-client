import Api from './api';

// used for getting user data and such
export default {
  show(username: string) {
      return Api().get(`user/${username}`);
  },
  // edit am user
  put(user: any) {
    return Api().put(`user/${user.username}`, user);
  },
  // edit an user from tools
  toolPut(user: any) {
    return Api().put('user/tool/put', user);
  },
  // for overview
  index2(paginationParams: any) {
    return Api().get('users2', {
      params: paginationParams,
    });
  },
  // USER SETTINGS
  // dont really need get
  getSettings(username: string) {
    return Api().get(`user/${username}/settings`);
  },
  saveSettings(userObj) {
    return Api().put(`user/${userObj.username}/settings`, userObj);
  },
  // PAGE
  // user page
  showPage(username: string, userObjMatch) {
    return Api().put(`page/${username}`, userObjMatch);
  },

  updatePage(username: string, userObjMatch) {
    return Api().put(`page/${username}/update`, userObjMatch);
  },

  createPage(username: string, createObj) {
    return Api().post(`page/${username}/create`, createObj);
  },

  // create a link
  createLink(username: string, linkObj) {
    return Api().post(`pagelink/${username}/create`, linkObj);
  },

  getLinks(uuid: string, query) {
    return Api().get(`/pagelinks/${uuid}`, query);
  },

  // edit with put request
  updateLink(uuid: string, linkObj) {
    return Api().put(`pagelink/${uuid}`, linkObj);
  },

  // delete with put request
  deleteLink(uuid: string, linkObj) {
    return Api().put(`pagelink/${uuid}/delete`, linkObj);
  },

};
