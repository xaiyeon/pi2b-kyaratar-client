import EditTrueCharacterFavorite from '../views/_essentials/trueCharacterFavorite/EditTrueCharacterFavorite.vue';

// routes pertaining to anything to do with character

export default [
    {
        path: '/truecharacterfavorite/:trueCharacterFavoriteId/edit',
        name: 'true-character-favorite-edit',
        component: EditTrueCharacterFavorite,
        meta: { requiresAuth: true },
    },
];
