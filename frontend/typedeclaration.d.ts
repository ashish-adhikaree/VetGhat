import { Blob } from "buffer"

export interface ImageType {
    url : string,
}

export interface User {
    id: string,
    username: string,
    profilepic: ImageType,
    followersCount? :number,
    followingCount? : number,
    postsCount?: number
}

export interface Post{
    id: string,
    caption: string,
    author:User,
    content:ImageType[]
    heartcount: number,
    commentcount: number,
    sharecount: number,
    hearts:User[],
    comments: User[],
    postedAt: string,
}

export interface ProfilePost{
    id: string,
    thumbnail:ImageType,
    multiImages: boolean,
    heartcount: number,
    commentcount: number,
}

export interface UserDetails{
    id: string,
    username: string,
    bio: string,
    profilepic: ImageType,
    followersCount: number,
    followingCount: number,
    postsCount: number,
    posts: ProfilePost[]
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
    isPublic?: boolean,
    caption?: string
    files: any[]
}