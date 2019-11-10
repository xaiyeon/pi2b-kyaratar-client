// user related components
import ViewUserProfile from '../views/user/ViewUserProfile.vue';
import UserContributions from '../components/_user/profile/nav/Contributions.vue';
import UserFavorites from '../components/_user/profile/nav/Favorites.vue';
import UserLists from '../components/_user/profile/nav/Lists.vue';
import UserMilestones from '../components/_user/profile/nav/Milestones.vue';
import UserSocial from '../components/_user/profile/nav/Social.vue';
import UserTools from '../views/user/UserTools.vue';
import EditUserProfile from '../views/user/EditUserProfile.vue';
import UserContent from '../components/_user/profile/nav/Content.vue';
// for my social things, chat, friends, messages, activity
import ManageSocial from '@/views/user/social/ManageSocial.vue';
// user settings
import UserSettings from '@/views/user/UserSettings.vue';
// user account settings...
import UserAccount from '@/views/user/UserAccount.vue';

// for user one page
import UserOnePage from '@/views/user/ViewUserOnePage.vue';

// suggestion comp
import characterSuggestion from '@/components/_user/tools/character_/Suggest.vue';
import tagSuggestion from '@/components/_user/tools/tags_/Suggest.vue';

// for photos and videos
import CPhotoOverview from '@/components/_user/tools/photosAndVideos/character/CPhotoOverview.vue';
import CVideoOverview from '@/components/_user/tools/photosAndVideos/character/CVideoOverview.vue';
import { Component } from 'vue-mixin-decorator';
import Meta from 'vue-meta';

// user tools
import userOverview from '@/components/_user/tools/user_/Overview.vue';
import characterOverview from '@/components/_user/tools/character_/Overview.vue';
import mCategoryOverview from '@/components/_user/tools/mainCategories_/Overview.vue';
import tagOverview from '@/components/_user/tools/tags_/Overview.vue';
import inviteKeyOverview from '@/components/_user/tools/invitekey_/Overview.vue';
import inviteKeyGeneral from '@/components/_user/tools/invitekey_/General.vue';

// user routes
export default [
    // page things
    {
      path: '/p/:username',
      name: 'user-page',
      component: UserOnePage,
    },
    {
      path: '/user/:username/settings',
      name: 'user-settings-manager',
      component: UserSettings,
      meta: { requiresAuth: true},
    },
    {
      path: '/user/:username/account',
      name: 'user-account-manager',
      component: UserAccount,
      props: { default: null, username: null},
      meta: { requiresAuth: true},
    },
    {
      path: '/user/:username/mysocial/manager',
      name: 'user-mysocial-manager',
      component: ManageSocial,
      meta: { requiresAuth: true },
    },
    {
      path: '/user/:username/tools',
      name: 'user-tools',
      component: UserTools,
      meta: { requiresAuth: true },
      children: [
        // in order as appears in front-end
        {
          path: 'user/overview',
          name: 'user-overview',
          component: userOverview,
          props: { default: null, username: null},
        },
        {
          path: 'character/overview',
          name: 'character-overview',
          component: characterOverview,
          props: { default: null, username: null},
        },
        {
          path: 'character/suggestions',
          name: 'suggest-character',
          component: characterSuggestion,
          props: { default: null, username: null, suggestType: 'character' },
        },
        {
          path: 'maincategory/overview',
          name: 'maincategory-overview',
          component: mCategoryOverview,
          props: { default: null, username: null},
        },
        {
          path: 'tag/overview',
          name: 'tag-overview',
          component: tagOverview,
          props: { default: null, username: null},
        },
        {
          path: 'invitekey/overview',
          name: 'invitekey-overview',
          component: inviteKeyOverview,
          props: { default: null, username: null},
        },
        {
          path: 'invitekey/general',
          name: 'invitekey-general',
          component: inviteKeyGeneral,
          props: { default: null, username: null},
        },
        {
          path: 'tag/suggestions',
          name: 'suggest-tag',
          component: tagSuggestion,
          props: { default: null, username: null, suggestType: 'tag' },
        },
        {
          path: 'character/videos',
          name: 'charactervideos',
          component: CVideoOverview,
          props: { default: null, username: null },
        },
        {
          path: 'character/photos',
          name: 'characterphotos',
          component: CPhotoOverview,
          props: { default: null, username: null },
        },
      ],
    },
    {
      path: '/user/:username/edit-profile',
      name: 'user-edit-profile',
      component: EditUserProfile,
      meta: { requiresAuth: true },
    },
    {
        path: '/user/:username',
        name: 'viewUser',
        component: ViewUserProfile,
        props: { default: null, username: null },
        children: [
          {
            path: 'contributions',
            name: 'Contributions',
            component: UserContributions,
            props: { default: null, username: null },
          },
          {
            path: 'favorites',
            name: 'Favorites',
            component: UserFavorites,
            props: { default: null, username: null },
          },
          {
            path: 'lists',
            name: 'Lists',
            component: UserLists,
            props: { default: null, username: null },
          },
          {
            path: 'content',
            name: 'Content',
            component: UserContent,
            props: { default: null, username: null },
          },
          {
            path: 'milestones',
            name: 'Milestones',
            component: UserMilestones,
            props: { default: null, username: null },
          },
          {
            path: 'social',
            name: 'Social',
            component: UserSocial,
            props: { default: null, username: null },
          },
        ],
    },
];
