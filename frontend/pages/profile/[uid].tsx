
import PostCardProfile from "../../components/profile/postCardProfile";
import ProfileCard from "../../components/profile/profileCard";
import cookieCutter from "cookie-cutter";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Loader from "../../components/profile/loader";
import {
  CleanUserDetailsResponse,
  // CleanUserResponse,
} from "../../helper_functions/cleanStrapiResponse";
import {UserDetails } from "../../typedeclaration";
import Layout from "../../components/Layout/layout";
import Axios from "../../axios";

const Profile = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isUser, setIsUser] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    id: "default",
    profilepic: { url: "/" },
    username: "default",
    bio: "",
    followersCount: 0,
    followingCount: 0,
    postsCount: 0,
    posts: [
      {
        id: "default",
        thumbnail: { url: "/" },
        multiImages: false,
        heartcount: 0,
        commentcount: 0,
      },
    ],
  });
  const router = useRouter();
  useEffect(() => {
    if (router.query.uid) {
      const id = router.query.uid;
      console.log("id", id);
      const jwt = cookieCutter.get("jwt");
      const uid = cookieCutter.get("uid");
      if (id === uid) {
        setIsUser(true)
      };

      Axios(jwt)
        .get(
          `${process.env.STRAPI_URL}/api/users/${id}`,
          {
            params:{
              populate:[
                "profilepic",
                "posts",
                "posts.content",
                "followers",
                "followers.profilepic",
                "followings",
                "followings.profilepic"
              ]
            }
          }
        )
        .then((res) => {
          setUserDetails(CleanUserDetailsResponse(res.data));
          setLoading(false);
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
        {userDetails.posts &&
          (userDetails.posts.length === 0 ? (
            <p className="border-t border-gray-400 pt-5 w-full text-center font-bold text-xl text-gray-600">
              No Posts
            </p>
          ) : (
            <div
              className={`w-full flex justify-center flex-wrap border-t border-gray-400 pt-5`}
            >
              {userDetails.posts.map((post) => (
                <PostCardProfile key={post.id} post={post} />
              ))}
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default Profile;

