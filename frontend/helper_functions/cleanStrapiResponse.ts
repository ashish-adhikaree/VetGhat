import { Post, ProfilePost, User } from "../typedeclaration";

export const CleanPostResponse = (post: any) => {
  const SinglePost: Post = {
    id: post.id,
    author: {
      id: post.attributes.author.data.id,
      name: post.attributes.author.data.attributes.username,
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
    comments:[],
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
    thumbnail: {url:post.attributes.content.data[0].attributes.url},
    heartcount: post.attributes.heartcount,
    commentcount: post.attributes.commentcount,
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
    id: user.id,
    name:user.data.attributes.username,
    profilepic:user.data.attributes.profilepic.data !== null ?{url:user.data.attributes.profilepic.data.attributes.url}:{url:"/uploads/defaultpp_d6926772d7.png?updated_at=2022-12-15T15:46:23.248Z"},
    followersCount: user.data.attributes.followersCount,
    followingCount: user.data.attributes.followingCount,
    posts: user.data.attributes.posts  
  }
  return temp
}
