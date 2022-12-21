import { Post, ProfilePost, User, UserDetails } from "../typedeclaration";
import {GetTimeDifference} from "../helper_functions/getTimeDifference"

export const CleanPostResponse = (post: any) => {
  const SinglePost: Post = {
    id: post.id,
    author: {
      id: post.attributes.author.data.id,
      username: post.attributes.author.data.attributes.username,
      profilepic:post.attributes.author.data.attributes.profilepic.data !== null? {url:post.attributes.author.data.attributes.profilepic.data.attributes.url}:{url:"/uploads/defaultpp_d6926772d7.png?updated_at=2022-12-15T15:46:23.248Z"},
    },
    caption: post.attributes.caption,
    content: post.attributes.content.data.map((image:any)=>{
      return {
        url: image.attributes.url
      }
    }),
    heartcount: post.attributes.heartcount,
    sharecount: post.attributes.sharecount,
    commentcount: post.attributes.commentcount,
    hearts:[],
    comments:post.attributes.comments && post.attributes.comments.data? post.attributes.comments.data.map((comment:any)=>(
      {
        author: CleanUserResponse(comment.attributes.author),
        body: comment.attributes.body,
        postedAt: GetTimeDifference(comment.attributes.createdAt)
      }
    )) : [],
    postedAt: post.attributes.createdAt,
  };
  return SinglePost;
};

export const CleanPostResponseArray = (posts: any) => {
  return posts.map((post: any) => {
    const temp: Post = CleanPostResponse(post);
    return temp;
  });
};

export const CleanProfilePostResponse = (post:any) =>{
  const SinglePost: ProfilePost = {
    id: post.id,
    thumbnail: {url:post.content[0].url},
    multiImages: post.content.length > 1? true: false,
    heartcount: post.heartcount,
    commentcount: post.commentcount,
  };
  return SinglePost;
}

export const CleanProfilePostResponseArray = (posts:any) =>{
  return posts.map((post: any) => {
    const temp: ProfilePost = CleanProfilePostResponse(post);
    return temp;
  });
}

export const CleanUserResponse = (user:any)=>{
  const temp: User = {
    id: user.data.id,
    username:user.data.attributes.username,
    profilepic:user.data.attributes.profilepic.data !== null ?{url:user.data.attributes.profilepic.data.attributes.url}:{url:"/uploads/defaultpp_d6926772d7.png?updated_at=2022-12-15T15:46:23.248Z"},
    followersCount: user.data.attributes.followersCount,
    followingCount: user.data.attributes.followingCount,
    postsCount: user.data.attributes.postsCount  
  }
  return temp
}

export const CleanUserDetailsResponse = (user:any) => {
  const temp: UserDetails = {
    id: user.id,
    username: user.username,
    bio: user.bio,
    profilepic: user.profilepic === null?{url:"/uploads/defaultpp_d6926772d7.png?updated_at=2022-12-15T15:46:23.248Z"}:{url: user.profilepic.url},
    followersCount: user.followersCount,
    followingCount: user.followingCount,
    postsCount: user.postsCount,
    posts: CleanProfilePostResponseArray(user.posts)
  }
  return temp
}