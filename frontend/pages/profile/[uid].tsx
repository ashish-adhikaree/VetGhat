import { GetStaticProps, GetStaticPaths } from "next";
import PostCardProfile from "../../components/profile/postCardProfile";
import ProfileCard from "../../components/profile/profileCard";
import cookieCutter from "cookie-cutter";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "../../apolloClient";
import { GetProfile, GetProfilePosts } from "../../lib/query";
import Head from "next/head";
import Loader from "../../components/profile/loader";
import {
  CleanProfilePostResponseArray,
  CleanUserResponse,
} from "../../helper_functions/cleanStrapiResponse";
import { ProfilePost, User } from "../../typedeclaration";
import Layout from "../../components/Layout/layout";

const Profile = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isUser, setIsUser] = useState<boolean>(false);
  const [posts, setPosts] = useState<ProfilePost[]>();

  const [userDetails, setUserDetails] = useState<User>({
    id: "default",
    profilepic: { url: "/" },
    username: "default",
    followersCount: 0,
    followingCount: 0,
    posts: 0,
  });
  const router = useRouter();
  useEffect(() => {
    if (router.query.uid) {
      const id = router.query.uid;
      console.log("id", id);
      const jwt = cookieCutter.get("jwt");
      const client = createClient(jwt);
      const uid = cookieCutter.get("uid");
      if (id === uid) setIsUser(true);

      // Getting profile info
      client
        .query({
          query: GetProfile,
          variables: {
            id: id,
          },
        })
        .then((res) => {
          if (res.data.usersPermissionsUser.data !== null) {
            setUserDetails(CleanUserResponse(res.data.usersPermissionsUser));
            setLoading(false);
          }
        })
        .catch((err) => console.log(err));

      // Getting Posts
      client
        .query({
          query: GetProfilePosts,
          variables: {
            id: id,
          },
        })
        .then((res) => {
          setPosts(CleanProfilePostResponseArray(res.data?.posts.data));
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  }, [router]);

  if (loading) {
    return <Loader />;
  }
  return (
    <Layout>
      <div className="flex flex-col items-center mx-auto space-y-20 mb-[100px] w-full md:w-[3/2] max-w-4xl">
        <Head>
          <title>Profile-{userDetails.username}</title>
          <meta name="description" content="Developed by Ashish" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ProfileCard user={userDetails} isUser={isUser} />
        {posts &&
          (posts.length === 0 ? (
            <p className="border-t border-gray-400 pt-5 w-full text-center font-bold text-xl text-gray-600">
              No Posts
            </p>
          ) : (
            <div
              className={`w-full flex justify-center flex-wrap border-t border-gray-400 pt-5`}
            >
              {posts.map((post) => (
                <PostCardProfile key={post.id} post={post} />
              ))}
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default Profile;
