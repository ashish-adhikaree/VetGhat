import { Post, User } from "../typedeclaration";

export const CleanPostResponse = (post: any) => {
  console.log()
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
    postedAt: post.attributes.publishedAt,
  };
  return SinglePost;
};

export const CleanPostResponseArray = (posts: any) => {
  return posts.map((post: any) => {
    const temp: Post = CleanPostResponse(post);
    return temp;
  });
};
