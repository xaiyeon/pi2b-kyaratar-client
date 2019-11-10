import Api from './api';

// layout of urls
// /mcategory
// /mcategory/:id

export default {
  // check api and return 200 ok
  check(objectChecker: any) {
    return Api().post('apicheck', objectChecker);
  },
};
