import ViewMainCategory from '../views/character/ViewCharacter.vue';
import CreateMainCategory from '../views/character/CreateCharacter.vue';
import EditMainCategory from '../views/character/EditCharacter.vue';

// TODO: Add CRUD for this, might need to add a category slug...
// routes pertaining to anything to do with character

export default [
    {
        path: '/main-category/:characterId/:slug',
        name: 'main-category',
        component: ViewMainCategory,
        props: true,
    },
    {
        path: '/main-category/tool/add',
        name: 'main-category-create',
        component: CreateMainCategory,
        meta: { requiresAuth: true },
    },
    {
        path: '/main-category/:characterId/:slug/edit',
        name: 'main-category-edit',
        component: EditMainCategory,
        meta: { requiresAuth: true },
    },
];
