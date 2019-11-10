import ViewCharacter from '../views/character/ViewCharacter.vue';
import CreateCharacter from '../views/character/CreateCharacter.vue';
import EditCharacter from '../views/character/EditCharacter.vue';

// routes pertaining to anything to do with character

export default [
    {
        path: '/character/:slug',
        name: 'character',
        component: ViewCharacter,
        props: true,
    },
    {
        path: '/character/tool/add',
        name: 'character-create',
        component: CreateCharacter,
        meta: { requiresAuth: true },
    },
    {
        path: '/character/:slug/edit',
        name: 'character-edit',
        component: EditCharacter,
        meta: { requiresAuth: true },
    },
];
