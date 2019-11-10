import Api from './api';

export default {
  getUserIndex(userId: string, typeMode: string, pageNumber: number, itemsPerPage: number) {
    return Api().get(`user/${userId}/suggestions`,
    {
        params: {
            typeMode,
            pageNumber,
            itemsPerPage,
        },
    });
  },
  getIndex() {
    return Api().get('suggestions');
  },
  getOne(uuid: string) {
    return Api().get(`suggestion/${uuid}`);
  },
  create(suggObj: any) {
    return Api().post('suggestion', suggObj);
  },
  update(uuid: string) {
    return Api().put(`suggestion/${uuid}`);
  },
  delete(uuid: string) {
    return Api().delete(`suggestion/${uuid}`);
  },
};

// back-end urls
// app.get(addApi + '/suggestions',
// isAuthenticated,
// SuggestionController.index);
// app.get(addApi + '/suggestion/:uuid',
// isAuthenticated,
// SuggestionController.create);
// app.post(addApi + '/suggestion',
// isAuthenticated,
// SuggestionController.create);
// app.put(addApi + '/suggestion/:uuid',
// isAuthenticated,
// SuggestionController.update);
// app.delete(addApi + '/suggestion/:uuid',
// isAuthenticated,
// SuggestionController.delete);
