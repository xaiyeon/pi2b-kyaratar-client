import Root from '../views/Root.vue';
import Spotlight from '../views/main/Spotlight.vue';
import Characters from '../views/main/Characters.vue';
import Ranking from '../views/main/Ranking.vue';
import Analytics from '../views/main/Analytics.vue';
import Login from '../views/main/Login.vue';
import Register from '../views/main/Register.vue';
import Arena from '../views/main/Arena.vue';
import Home from '../views/main/Home.vue';
import Social from '../views/main/Social.vue';
// for ranking views
import CharacterRankings from '@/components/_ranking/CharacterRankings.vue';
import UserRankings from '@/components/_ranking/UserRankings.vue';


export default [
    {
      path: '/',
      name: 'root',
      component: Root,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/spotlight',
      name: 'spotlight',
      component: Spotlight,
    },
    {
      path: '/social',
      name: 'social',
      component: Social,
    },
    {
      path: '/characters',
      name: 'characters',
      component: Characters,
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: Ranking,
      children: [
        {
          path: 'characters',
          name: 'ranking-characters',
          component: CharacterRankings,
        },
        {
          path: 'users',
          name: 'ranking-users',
          component: UserRankings,
        },
      ],
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: Analytics,
    },
    {
      path: '/arena',
      name: 'arena',
      component: Arena,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
];
