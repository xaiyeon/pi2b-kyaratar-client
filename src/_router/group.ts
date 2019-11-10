import ViewGroup from '../views/group/ViewGroup.vue';
import EditGroup from '../views/group/EditGroup.vue';
// children view components
import GroupActivity from '../components/_group/profile/nav/Activity.vue';
import GroupCollections from '../components/_group/profile/nav/Collections.vue';
import GroupForum from '../components/_group/profile/nav/Forum.vue';
import GroupMembers from '../components/_group/profile/nav/Members.vue';
import GroupOverview from '../components/_group/profile/nav/Overview.vue';
import GroupPhotos from '../components/_group/profile/nav/Photos.vue';
import GroupRules from '../components/_group/profile/nav/Rules.vue';
import GroupVideos from '../components/_group/profile/nav/Videos.vue';

// group forum thread
import GroupForumThread from '../components/_group/profile/nav/layout/GroupForumThread.vue';

// routes pertaining to anything to do with character
// forum will also have sub-routes as well!
// most of these will have nested sub-routes again!

export default [
    {
      path: '/group/:url/edit',
      name: 'edit-group',
      component: EditGroup,
      props: { default: null, groupId: null },
      meta: { requiresAuth: true },
    },
    {
        path: '/group/:url',
        name: 'group',
        component: ViewGroup,
        props: { default: null, groupId: null, pGroup: Object },
        children: [
          {
            path: 'activity',
            name: 'activity',
            component: GroupActivity,
            props: { default: null, groupId: null },
          },
          {
            path: 'collections',
            name: 'collections',
            component: GroupCollections,
            props: { default: null, groupId: null },
          },
          {
            path: 'forum',
            name: 'forum',
            component: GroupForum,
            props: { default: null, groupId: null, pGroup: Object },
            children: [
              {
                path: 'thread/:uuid',
                name: 'groupForumThread',
                component: GroupForumThread,
                props: { default: null, groupId: null, pGroup: Object, threadInfo: Object },
              },
            ],
          },
          {
            path: 'members',
            name: 'members',
            component: GroupMembers,
            props: { default: null, groupId: null },
          },
          {
            path: 'overview',
            name: 'overview',
            component: GroupOverview,
            props: { default: null, groupId: null, pGroup: Object },
          },
          {
            path: 'photos',
            name: 'photos',
            component: GroupPhotos,
            props: { default: null, groupId: null, pGroup: Object },
          },
          {
            path: 'rules',
            name: 'rules',
            component: GroupRules,
            props: { default: null, groupId: null },
          },
          {
            path: 'videos',
            name: 'videos',
            component: GroupVideos,
            props: { default: null, groupId: null },
          },
        ],
    },
];
