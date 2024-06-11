/**
 * 用户类别
 */

export type UserType = {
    id : number;
    username : string;
    userAccount : string;
    avatarUrl? : string;
    gender : number;
    phone : string;
    email : string;
    profile? : string;
    userStatus : string;
    userRole : string;
    tags : string;
    createTime : Date;
};