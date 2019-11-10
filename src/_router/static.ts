// import Root from '../views/Home.vue';
import About from '../views/_static/information/About.vue';
import PrivacyPolicy from '../views/_static/information/PrivacyPolicy.vue';
import DataAndSafety from '../views/_static/information/DataAndSafety.vue';
import TermsAndConditions from '../views/_static/information/TermsAndConditions.vue';
import DevAndChangeLog from '../views/_static/information/DevAndChangeLog.vue';


import AllCharacters from '../views/_static/features/AllCharacters.vue';
import BattleAndCollect from '../views/_static/features/BattleAndCollect.vue';
import CustomPages from '../views/_static/features/CustomPages.vue';
import GroupsAndGuilds from '../views/_static/features/GroupsAndGuilds.vue';

import BecomeAHelper from '../views/_static/wantToHelp/becomeAHelper.vue';
import BecomeAKyatain from '../views/_static/wantToHelp/becomeAKyatain.vue';
import BecomeAnAffiliate from '../views/_static/wantToHelp/becomeAnAffiliate.vue';
import BecomeASupporter from '../views/_static/wantToHelp/becomeASupporter.vue';

// mostly other static routes with non-dynamic views

export default [
      {
        path: '/become-a-helper',
        name: 'become-a-helper',
        component: BecomeAHelper,
      },
      {
        path: '/become-a-kyatain',
        name: 'become-a-kyatain',
        component: BecomeAKyatain,
      },
      {
        path: '/become-an-affiliate',
        name: 'become-an-affiliate',
        component: BecomeAnAffiliate,
      },
      {
        path: '/become-a-supporter',
        name: 'become-a-supporter',
        component: BecomeASupporter,
      },

      {
        path: '/all-characters',
        name: 'all-characters',
        component: AllCharacters,
      },
      {
        path: '/battle-and-collect',
        name: 'battle-and-collect',
        component: BattleAndCollect,
      },
      {
        path: '/custom-pages',
        name: 'custom-pages',
        component: CustomPages,
      },
      {
        path: '/groups-and-guilds',
        name: 'groups-and-guilds',
        component: GroupsAndGuilds,
      },
      {
        path: '/about',
        name: 'about',
        component: About,
      },
      {
        path: '/privacy-policy',
        name: 'privacypolicy',
        component: PrivacyPolicy,
      },
      {
        path: '/data-and-safety',
        name: 'data-and-safety',
        component: DataAndSafety,
      },
      {
        path: '/terms-and-conditions',
        name: 'terms-and-conditions',
        component: TermsAndConditions,
      },
      {
        path: '/dev-and-change-log',
        name: 'devandchangelog',
        component: DevAndChangeLog,
      },
];
