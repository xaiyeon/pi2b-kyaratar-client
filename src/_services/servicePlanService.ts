import Api from './api';

export default {
  index(query: any, pageNumber: any, itemsPerPage: any) {
    return Api().get('serviceplans', {
      params: {
        query,
        pageNumber,
        itemsPerPage,
      },
    });
  },
};
