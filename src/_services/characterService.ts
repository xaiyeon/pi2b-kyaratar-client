import Api from './api';

// layout of urls
// /characters
// /characters/:id

export default {
  index(search: any) {
    return Api().get('characters', {
      params: {
        search,
      },
    });
  },
  // used for quick search
  search2(search: any) {
    return Api().get('charactersearch2', {
      params: {
        search,
      },
    });
  },
  // this is used
  show(characterId: number, slug: string, uuid: string) {
    return Api().get(`character/${slug}`);
  },
  // create a character
  post(character: any) {
    return Api().post('character', character);
  },
  // edit a character
  put(character: any) {
    return Api().put(`character/${character.uuid}`, character);
  },
  // delete character
  delete(characterId: any) {
    return Api().delete(`character/${characterId}`);
  },
  // ~~ Used for User tools mostly
  // pagination params will be an object, with page number, and page limit
  index2(paginationParams: any) {
    return Api().get('characters2', {
      params: paginationParams,
    });
  },

  // for character page ranks
  getRanks( pageNumber: any, itemsPerPage: any, isfilter: boolean, filterObj: any) {
    return Api().get(`characterranks`,
    {
        params: {
          pageNumber,
          itemsPerPage,
          isfilter,
          filterObj,
        },
    });
  },

  getTrending() {
    return Api().get('charactertrending');
  },

  getPopular() {
    return Api().get('characterpopular');
  },

  // FOR VIDEO AND PHOTO

  videoIndex(charaUUID: any, requestType: any, pageNumber: any, itemsPerPage: any) {
    return Api().get(`character/${charaUUID}/videos`,
      {
        params: {
          pageNumber,
          itemsPerPage,
          requestType,
        },
      });
  },

  uploadVideo(video: any, uuid: any) {
    return Api().post(`/character/${uuid}/video`, video);
  },

};
