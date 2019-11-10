import Api from './api';

// layout of urls
// /mcategory
// /mcategory/:id

export default {
  index() {
    return Api().get('mcategories');
  },
  // for overview
  index2(paginationParams: any) {
    return Api().get('mcategories2', {
      params: paginationParams,
    });
  },
  show(mcategoryId: string) {
    return Api().get(`mcategory/${mcategoryId}`);
  },
  // create a main category
  post(category: any) {
    return Api().post('mcategory', category);
  },
  // edit a main category
  put(category: any) {
    return Api().put(`mcategory/${category.uuid}`, category);
  },

};
