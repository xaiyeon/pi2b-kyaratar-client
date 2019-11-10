import Api from './api';

// layout of urls
// /characters
// /characters/:id

export default {
  index(trueCharacterFavorite: any) {
    return Api().get('truecharacterfavorites', {
      params: trueCharacterFavorite,
    });
  },
  // this is used
  show(trueCharacterFavoriteId: string) {
    return Api().get(`truecharacterfavorite/${trueCharacterFavoriteId}`);
  },
  // check for all
  own(username: string) {
    return Api().get(`truecharacterfavorites/${username}`);
  },
  // create
  post(trueCharacterFavorite: any) {
    return Api().post('truecharacterfavorites', trueCharacterFavorite);
  },
  // edit a true favorite character
  put(trueCharacterFavorite: any) {
    return Api().put(`truecharacterfavorite/${trueCharacterFavorite.uuid}`, trueCharacterFavorite);
  },
  delete(trueCharacterFavoriteObj: any) {
    return Api().delete(`truecharacterfavorite/${trueCharacterFavoriteObj.tcfuuid}`, trueCharacterFavoriteObj);
  },
//   show (mcategoryId) {
//     return Api().get(`mcategory/${mcategoryId}`)
//   },
//   post (category) {
//     return Api().post('mcategory', category)
//   }
};
