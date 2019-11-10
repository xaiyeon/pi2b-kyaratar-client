export interface CharacterModel {

    uuid: string;
    uuidSecret: string;
    name: string;
    slug: string;
    altName: string;
    description?: string;
    iconImageURL?: string;
    avatarImageURL?: string;
    bannerImageURL?: string;
    isPublic: boolean;
    isEditable: boolean;
    isDeletable: boolean;
    genesisDate?: Date;
    descriptionSource?: string;
    shortInfo?: string;
    submittedBy?: string;
    approvedBy?: string;
    genesisStringDate?: string;
    status?: string;
    primaryColor?: string;
    secondaryColor?: string;
    createdAt: Date;
    updatedAt: Date;
    viewCount: number;
    background?: string;
    backgroundSource?: string;
    rank: number;
    score: number;
    likeCount?: number;
    upvoteCount?: number;
    favoriteCount?: number;
    fk_mainCategoryId: number;
    fk_userId: number;

}

