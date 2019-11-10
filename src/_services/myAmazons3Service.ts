import Api from './api';

// Amazon url endpoints to our server

export default {
  s3GetSigner() {
    return Api().get('awss3getsigner');
  },

  s3PutSigner(fileFormData: any) {
    return Api().put('awss3putsigner', fileFormData);
  },

  s3GroupPhotoPutSigner(fileFormData: any) {
    return Api().put('awss3putsignergroup', fileFormData);
  },

  s3UserPhotoPutSigner(fileFormData: any) {
    return Api().put('awss3putsigneruser', fileFormData);
  },

};
