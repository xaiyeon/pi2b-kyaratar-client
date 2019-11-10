import Api from './api';

// layout of urls
// /mcategory
// /mcategory/:id

export default {
  characterSpotlight() {
    return Api().get('spotlight/characters');
  },
  groupSpotlight() {
    return Api().get('spotlight/groups');
  },
};
