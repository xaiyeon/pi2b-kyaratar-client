export interface UserModel {

    uuid: string;
    uuidSecret: string;
    email: string;
    username: string;
    displayName: string;
    password?: string;
    about: string;
    kyaratarTag?: string;
    profileImageURL?: string;
    bannerImageURL?: string;
    backgroundImageURL?: string;
    // 1 = public, 2 = friends only, 3 = private
    privacyCode: number;
    lastOnlineDate?: string;
    birthDate?: string;
    isDonator: boolean;
    kyaratarBytes: number;
    isUserPin: boolean;
    userPin: number;
    isVerified: boolean;
    isPartner: boolean;
    isHelper: boolean;
    // status: 1 = superb, 2 = neutral, 3 = warning, 4 = banned, 5 = sudo hidden
    status?: string;
    primaryColor: string;
    secondaryColor: string;
    viewCount: number;
    isDeletable: boolean;
    // more attributes from 10/4/18
    kyaratarCoins: number;
    kyaratarPoints: number;
    lifeTimeKyaBytes: number;
    lifeTimeKyaCoins: number;
    lifeTimeKyaPoints: number;
    score: number;
    rank: number;
    createdAt?: string;
    // empty computed variables
    privacyCompute?: string;
}

