import Api from './api';

// layout of urls
// /mcategory
// /mcategory/:id

export default {
  // check api and return 200 ok
  usercount() {
    return Api().get('analytics/countusers');
  },
  invitekeyStats() {
    return Api().get('analytics/invitekeys');
  },
  characterStats() {
    return Api().get('analytics/characters');
  },
};
