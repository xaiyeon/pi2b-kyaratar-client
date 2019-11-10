export default {
    baseURL: 'https://kyaratar.s3.amazonaws.com/',
    AmazonS3URLMaker(rootname, objectname, subroot, actualfile) {
      const baseURL = 'https://kyaratar.s3.amazonaws.com';
      const builtURL = '';
      const buildURL = `${baseURL}/${rootname}/${objectname}/${subroot}/${actualfile}`;
      return buildURL;
    },
    // do the damn building in here instead
    newAmazonS3URLMaker(wholePath, typeOptionPath) {
      // don't need the baseURL because it is included in back-end already!
      const baseURL = 'https://kyaratar.s3.amazonaws.com';
      let prePath = '';
      if (typeOptionPath === 'users') {
        prePath = 'users/';
      }
      const buildURL = `${prePath}${wholePath}`;
      return buildURL;
    },
};
