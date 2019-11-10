import Api from './api';

// layout of urls
// /mcategory
// /mcategory/:id

export default {
  // for rss
  // TODO: why wont it ffffin work?
  getANNNews() {
    return Api().get('news/ann');
  },

  getIGNNews() {
    return Api().get('news/ign');
  },

};
