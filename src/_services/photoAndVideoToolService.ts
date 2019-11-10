import Api from './api';

// layout of urls

export default {
  // use post for searching instead...
  cPhotoIndex(query: any, pageNumber: any, itemsPerPage: any) {
    return Api().get('characters/photos',
      {
        params: {
          query,
          pageNumber,
          itemsPerPage,
        },
    });
  },

  cVideoIndex(query: any, pageNumber: any, itemsPerPage: any) {
    return Api().get('characters/videos',
      {
        params: {
          query,
          pageNumber,
          itemsPerPage,
        },
    });
  },
  // TODO: add the other routes
  cPhotoPut(phoObj: any) {
    return Api().put(`character/${phoObj.uuid}/photo`, phoObj);
  },
  cPhotoDelete(phoObj: any) {
    return Api().delete(`character/${phoObj.uuid}/photo`, phoObj);
  },

  cVideoPut(vidObj: any) {
    return Api().put(`character/${vidObj.uuid}/video`, vidObj);
  },
  cVideoDelete(vidObj: any) {
    return Api().delete(`character/${vidObj.uuid}/video`, vidObj);
  },
};
