import axios from 'axios';
import store from '@/_store/store';
import AuthStrong from './helpers/authStrong';
import settings from '@/static/helpers/settings';

// for local `http://localhost:8081/`
// for production `https://api.kyaratar.com/`
// Before putting on live production check static helpers and settings.ts
// change the below URL to local or production
export default () => {
  const addApi = 'api';
  const devTestURL = `http://localhost:8084/`;
  // const productionURL = `https://www.api.kyaratar.com/`;
  const productionURL = `https://kyaratar-258405.appspot.com/`;

  let url = '';
  if (settings.isProduction) {
    url = productionURL;
  } else {
    url = devTestURL;
  }

  // now we need headers for auth
  // TODO: edit for max sec
  return axios.create({
    baseURL: url + addApi,
    headers: {
      Authorization: `Bearer ${store.state.token}`,
    },
  });
};

