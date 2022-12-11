import { Post, User } from "../typedeclaration";

export const CleanPostResponse = (post: any) => {
  const SinglePost: Post = {
    id: post.id,
    author: {
      id: post.attributes.author.data.id,
      name: post.attributes.author.data.attributes.username,
      profilepic:{url:post.attributes.author.data.attributes.profilepic.data.attributes.url},
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
    hearts:
      post.attributes.hearts != null
        ? post.attributes.hearts.data.map((user: any) => {
            const SingleUser: User = {
              id: user.id,
              name: user.username,
              profilepic: user.profilepic,
            };
            return SingleUser;
          })
        : {},
    comments:
      post.attributes.comments != null
        ? post.attributes.comments.data.map((user: any) => {
            const SingleUser: User = {
              id: user.id,
              name: user.username,
              profilepic: user.profilepic,
            };
            return SingleUser;
          })
        : {},
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
