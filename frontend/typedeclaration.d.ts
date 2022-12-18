export interface ImageType {
    url : string,
}

export interface User {
    id: string,
    name: string,
    profilepic: ImageType,
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
