export interface MainCategoryModel {

    uuid: string;
    name: string;
    slug?: string;
    description?: string;
    imageURL?: string;
    isPublic: boolean;
    isEditable: boolean;
    createdAt: Date;
    updatedAt: Date;

}
