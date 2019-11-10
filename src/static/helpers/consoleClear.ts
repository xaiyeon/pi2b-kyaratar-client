import settings from './settings';

export default {
    consoleWipe() {
      const y = settings.isProduction;
      // change this to true for production and such
      if (y) {
        console.clear();
        console.log('Master?! What are you doing? Y-yo-you peeping tom!');
      } else {
        // do nothing
        console.log('settings isProduction is false.');
      }
    },
};
