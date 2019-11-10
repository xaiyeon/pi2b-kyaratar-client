import Api from './api';

export default {
    // the main index
    index(paginationParams: any) {
        return Api().get('groups', {
                params: paginationParams,
            });
        },

    // this is used
    show(groupId: any, countMode: string) {
    return Api().get(`group/${groupId}`,
    {
        params: {
            countMode,
        },
    });
    },

    // save changes, put
    save(group: any) {
        return Api().put(`group/${group.uuid}`, group);
    },

    // is used for check group
    checkBelongGroup(groupId: any, extraUser: any) {
        return Api().get(`groupchecker/${groupId}`, extraUser);
    },

    // Check membership if the user belongs in the group!
    // TODO: do back-end part get pageURL and user uuid
    // and check if they belong!
    // NOT USED?
    belongInGroup(groupId: any) {
        return Api().put(`group/${groupId}/checkuser`);
    },

    // for joining a group
    // we use a put for more information
    join(groupId: any) {
        return Api().post(`group/join/${groupId}`);
    },

    leave(groupId: string) {
        return Api().delete(`group/leave/${groupId}`);
    },

    // for counting groupshaveusers
    CountUsersInGroup(groupId: any) {
        return Api().get(`/groupshaveusers/${groupId}`);
    },

    // pageURL
    DisplayMembers(groupId: any, pageNumber: any, itemsPerPage: any) {
        return Api().get(`group/${groupId}/members`,
        {
            params: {
                pageNumber,
                itemsPerPage,
            },
        });
    },

    // TODO: finish this
    // Group Forum Related Things
    // ShowGroupForumIndex(groupId: any) {
    //     return Api().put(`/groupforums/${groupId}`);
    // },

    ShowGroupForumIndex(groupId: any, pageNumber: any, itemsPerPage: any) {
        return Api().get(`/groupforums/${groupId}`,
        {
            params: {
                pageNumber,
                itemsPerPage,
            },
        });
    },

    // Group Forum Thread
    getGroupForumThreadEntire(threadId: any, groupUID: any) {
        return Api().get(`/groupforumthreads/${threadId}`,
        {
            params: {
              threadId,
              groupUID,
            },
        });
    },

    // create/post forum thread
    createForumThread(thread: any) {
        return Api().post('/groupforumthreads/create', thread);
    },

    // get group spec forum categories
    getGroupForumCategories(groupId: any) {
        return Api().get(`/groupforumcategories/${groupId}`);
    },

    // params is actually a query on back-end because of get -> query
    // put -> params
    getGroupForumThreadComments(threadId: any, groupUID: any, pageNumber: any, itemsPerPage: any) {
        return Api().get(`/groupforumcomments/${threadId}`,
        {
            params: {
              threadId,
              groupUID,
              pageNumber,
              itemsPerPage,
            },
        });
    },

    // post a comment
    createGroupForumThreadComment(comment: any) {
        return Api().post('/groupforumcomments/create', comment);
    },

    // used for viewing the group from user profile social
    getGroupAssociations(username: any) {
        return Api().get(`/groupsuserview/${username}`);
    },

    // Uploading Photos
    // group/photo/upload
    uploadPhoto(photo: any) {
        return Api().post('/group/photo/upload', photo);
    },

    getPhotos(groupId: any, pageNumber: any, itemsPerPage: any) {
        return Api().get(`/group/${groupId}/photos`,
        {
            params: {
                groupId,
                pageNumber,
                itemsPerPage,
            },
        });
    },

};
