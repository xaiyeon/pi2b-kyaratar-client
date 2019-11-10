import Api from './api';

// layout of urls
// /mcategory
// /mcategory/:id

export default {
  index() {
    return Api().get('tags');
  },
  // for overview
  index2(query: any, pageNumber: any, itemsPerPage: any) {
    return Api().get('tags2', {
      params: {
        query,
        pageNumber,
        itemsPerPage,
      },
    });
  },

  // create a tag
  post(dataObj: any) {
    return Api().post('tag', dataObj);
  },

  put(dataObj: any) {
    return Api().put(`tag/${dataObj.uuid}`, dataObj);
  },

};
