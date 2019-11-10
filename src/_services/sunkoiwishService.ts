import Api from './api';

// layout of urls
// /mcategory
// /mcategory/:id

export default {
  // for rss
  // TODO: why wont it ffffin work?
  getRSSTech() {
    return Api().get('sunkoiwish/rss/tech');
  },
};
