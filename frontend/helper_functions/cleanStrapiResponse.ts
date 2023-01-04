import {
  Post,
  ProfilePost,
  User,
  UserDetails,
  searchUser,
} from "../typedeclaration";
import { GetTimeDifference } from "../helper_functions/getTimeDifference";

export const CleanPostResponse = (post: any) => {
  const SinglePost: Post = {
    id: post.id,
    author: {
      id: post.attributes.author.data.id,
      username: post.attributes.author.data.attributes.username,
      profilepic:
        post.attributes.author.data.attributes.profilepic.data !== null
          ? {
              url: post.attributes.author.data.attributes.profilepic.data
                .attributes.url,
            }
          : {
              url: "/uploads/defaultpp_d6926772d7.png?updated_at=2022-12-15T15:46:23.248Z",
            },
    },
    caption: post.attributes.caption,
    content: post.attributes.content.data.map((image: any) => {
      return {
        url: image.attributes.url,
      };
    }),
    heartcount: post.attributes.hearts.data.length,
    commentcount: post.attributes.comments.data.length,
    hearts:
      post.attributes.hearts && post.attributes.hearts.data.length > 0
        ? post.attributes.hearts.data.map((user: any) => ({
            id: user.id,
            username: user.attributes.username,
            profilepic:
              user.attributes.profilepic.data === null
                ? {
                    url: "/uploads/defaultpp_d6926772d7.png?updated_at=2022-12-15T15:46:23.248Z",
                  }
                : { url: user.attributes.profilepic.data.attributes.url },
          }))
        : [],
    comments:
      post.attributes.comments && post.attributes.comments.data.length > 0
        ? post.attributes.comments.data.map((comment: any) => ({
            author: CleanUserResponse(comment.attributes.author),
            body: comment.attributes.body,
            postedAt: GetTimeDifference(comment.attributes.createdAt),
          }))
        : [],
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

export const CleanProfilePostResponse = (post: any) => {
  const SinglePost: ProfilePost = {
    id: post.id,
    thumbnail: { url: post.content[0].url },
    multiImages: post.content.length > 1 ? true : false,
    heartcount: post.hearts.length,
    commentcount: post.comments.length,
  };
  return SinglePost;
};

export const CleanProfilePostResponseArray = (posts: any) => {
  return posts.map((post: any) => {
    const temp: ProfilePost = CleanProfilePostResponse(post);
    return temp;
  });
};

export const CleanUserResponse = (user: any) => {
  const temp: User = {
    id: user.data.id,
    username: user.data.attributes.username,
    profilepic:
      user.data.attributes.profilepic.data !== null
        ? { url: user.data.attributes.profilepic.data.attributes.url }
        : {
            url: "/uploads/defaultpp_d6926772d7.png?updated_at=2022-12-15T15:46:23.248Z",
          },
    followersCount:
      user.data.attributes.followers &&
      user.data.attributes.followers.data.length,
    followingCount:
      user.data.attributes.followings &&
      user.data.attributes.followings.data.length,
    postsCount:
      user.data.attributes.posts && user.data.attributes.posts.data.length,
  };
  return temp;
};

export const CleanUserDetailsResponse = (user: any) => {
  const temp: UserDetails = {
    id: user.id,
    username: user.username,
    profilepic:
      user.profilepic === null
        ? {
            url: "/uploads/defaultpp_d6926772d7.png?updated_at=2022-12-15T15:46:23.248Z",
          }
        : { url: user.profilepic.url },
    followersCount: user.followers ? user.followers.length : 0,
  };

  return temp;
};

export const CleanProfileUserDetailsResponse = (user: any) => {
  const temp: UserDetails = {
    id: user.id,
    username: user.username,
    bio: user.bio,
    profilepic:
      user.profilepic === null
        ? {
            url: "/uploads/defaultpp_d6926772d7.png?updated_at=2022-12-15T15:46:23.248Z",
          }
        : { url: user.profilepic.url },
    followersCount: user.followers.length,
    followingCount: user.followings.length,
    postsCount: user.posts.length,
    posts: CleanProfilePostResponseArray(user.posts),
    followers:
      user.followers && user.followers.length !== 0
        ? user.followers.map((user: any) =>
            CleanFollowersFollowingsResponse(user)
          )
        : undefined,
    followings:
      user.followings && user.followings.length !== 0
        ? user.followings.map((user: any) =>
            CleanFollowersFollowingsResponse(user)
          )
        : undefined,
  };
  return temp;
};

export const CleanFollowersFollowingsResponse = (user: any) => {
  const temp: User = {
    id: user.id,
    username: user.username,
    profilepic:
      user.profilepic === null
        ? {
            url: "/uploads/defaultpp_d6926772d7.png?updated_at=2022-12-15T15:46:23.248Z",
          }
        : { url: user.profilepic.url },
  };
  return temp;
};

export const CleanStrapiUserSearchResponse = (data: any) => {
  const response: searchUser[] = data.map((user: any) => {
    return {
      id: user.id,
      username: user.username,
      profilepic: {
        url: user.profilepic
          ? user.profilepic.url
          : "/uploads/defaultpp_d6926772d7.png?updated_at=2022-12-15T15:46:23.248Z",
      },
    };
  });
  return response;
};
