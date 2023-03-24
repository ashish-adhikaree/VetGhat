import { Blob } from "buffer"

export interface ImageType {
    url : string,
}

export interface User {
    id: number,
    username: string,
    profilepic: ImageType,
    followersCount? :number,
    followingCount? : number,
    postsCount?: number
}

export interface Comment {
    author : User,
    body: string,
    postedAt: string,
}

export interface Post{
    id: number,
    caption: string,
    author:User,
    content:ImageType[]
    heartcount: number,
    commentcount: number,
    hearts:User[],
    comments: Comment[] | any[],
    postedAt: string,
}

export interface ProfilePost{
    id: number,
    thumbnail:ImageType,
    multiImages: boolean,
    heartcount: number,
    commentcount: number,
}

export interface UserDetails{
    pfpid: number,
    id: number,
    username: string,
    bio?: string,
    profilepic: ImageType,
    followersCount?: number,
    followingCount?: number,
    postsCount?: number,
    posts?: ProfilePost[],
    likedPosts?: ProfilePost[],
    followers?: User[] | undefined,
    followings?: User[] | undefined,
}

// Signup or Login Form
export interface LoginValue {
    name?: String,
    email?: String,
    password?: String,
    privacyCheck? : boolean,
    confirmPassword?: string
}

// Alert Component props
export interface AlertType{
    type: "success" | "error" | string,
    body: string
}

// Post form Data 
export interface PostFormData{
    caption?: string
    files: any[]
}

// search user 
export interface searchUser{
    id: number,
    username: string,
    profilepic: ImageType
}