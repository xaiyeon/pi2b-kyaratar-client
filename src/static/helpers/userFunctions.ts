import settings from './settings';

export default {
    // 1 = superb, 2 = neutral, 3 = warning, 4 = banned, 5 = sudo hidden
    userStatus(status: number) {
      if (status === 1) {
          return 'Superb Status';
      } else if (status === 2) {
          return 'Neutral Status';
      } else if (status === 3) {
          return 'Warning Status';
      } else if (status === 4) {
          return 'Banned';
      } else if (status === 5) {
          return 'Hidden';
      } else {
          return 'Unknown';
      }
    },
    privacyStatus(status: number) {
        if (status === 1) {
            return 'Public';
        } else if (status === 2) {
            return 'Friends-Only';
        } else if (status === 3) {
            return 'Private';
        } else {
            return 'Unknown';
        }
      },
};
