import PostCardProfile from "../../components/profile/postCardProfile";
import ProfileCard from "../../components/profile/profileCard";
import cookieCutter from "cookie-cutter";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Loader from "../../components/profile/loader";
import {
  CleanProfilePostResponseArray,
  CleanProfileUserDetailsResponse,
} from "../../helper_functions/cleanStrapiResponse";
import { UserDetails } from "../../typedeclaration";
import Layout from "../../components/Layout/layout";
import Axios from "../../axios";
import { Socket } from "socket.io-client";
import {CgMenuGridR} from "react-icons/cg"
import { BsBookmarkHeart } from "react-icons/bs";

const Profile = ({ socket }: { socket: Socket }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isUser, setIsUser] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserDetails>();
  const [id, setID] = useState<string>("");
  const router = useRouter();

  const getLikedPosts = (id: string) => {
    const jwt = cookieCutter.get("jwt");
    Axios(jwt)
      .get(`${process.env.STRAPI_URL}/api/users/${id}`, {
        params: {
          populate: [
            "likedPosts",
            "likedPosts.content",
            "likedPosts.comments",
            "likedPosts.hearts",
          ],
        },
      })
      .then((res) => {
        const temp = userDetails;
        if (temp) {
          temp.posts = CleanProfilePostResponseArray(res.data.likedPosts);
        }
        setUserDetails(temp)
      })
      .catch((err) => console.log(err));
  };

  const getUser = (id: string) => {
    const jwt = cookieCutter.get("jwt");
    Axios(jwt)
      .get(`${process.env.STRAPI_URL}/api/users/${id}`, {
        params: {
          populate: [
            "profilepic",
            "posts",
            "posts.content",
            "posts.comments",
            "posts.hearts",
            "followers",
            "followers.profilepic",
            "followings",
            "followings.profilepic",
          ],
        },
      })
      .then((res) => {
        setUserDetails(CleanProfileUserDetailsResponse(res.data));
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (router.query.uid) {
      const id = router.query.uid.toString();
      setID(id);
      const uid = cookieCutter.get("uid");
      if (id === uid) {
        setIsUser(true);
      }else{
        setIsUser(false)
      }
      getUser(id);

      if (socket) {
        socket.on("user:update", () => {
          getUser(id);
        });
      }
    }
  }, [router]);

  if (loading) {
    return <Loader />;
  }
  return (
    <Layout>
      {userDetails && (
        <div className="flex flex-col items-center mx-auto space-y-20 mb-[100px] w-full md:w-[3/2] max-w-4xl">
          <Head>
            <title>Profile-{userDetails.username}</title>
            <meta name="description" content="Developed by Ashish" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <ProfileCard user={userDetails} isUser={isUser} socket={socket} />
          <div className="w-full">
            {isUser && (
              <div className="w-full space-x-3 flex justify-center border-b border-gray-400 p-3">
                <button
                  className="flex items-center mr-3"
                  onClick={() => {
                    getUser(id);
                  }}
                >
                  <CgMenuGridR className="text-xl mr-2"/>POSTS
                </button>
                <button
                className="flex items-center"
                title="Only You Can See Your Liked Posts"
                  onClick={() => {
                    getLikedPosts(id);
                  }}
                >
                  <BsBookmarkHeart className="text-xl mr-2"/>
                  LOVED
                </button>
              </div>
            )}
            {userDetails.posts &&
              (userDetails.posts.length === 0 ? (
                <p className="border-t border-gray-400 pt-5 w-full text-center font-bold text-xl text-gray-600">
                  No Posts
                </p>
              ) : (
                <div
                  className={`w-full flex justify-center flex-wrap pt-5`}
                >
                  {userDetails.posts.map((post) => (
                    <PostCardProfile key={post.id} post={post} />
                  ))}
                </div>
              ))
            }
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Profile;
