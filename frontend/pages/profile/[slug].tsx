import { GetStaticProps, GetStaticPaths } from "next";
import PostCardProfile from "../../components/profile/postCardProfile";
import ProfileCard from "../../components/profile/profileCard";
import cookieCutter from "cookie-cutter";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "../../apolloClient";
import { GetProfile } from "../../lib/query";
import Head from "next/head";
import Loader from "../../components/profile/loader";
import { CleanUserResponse } from "../../helper_functions/cleanStrapiResponse";
import { User } from "../../typedeclaration";

const Profile = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [userDetails, setUserDetails] = useState<User>({
    id: "default",
    profilepic: { url: "/" },
    name: "default",
    followersCount: 0,
    followingCount: 0,
    posts: 0,
  });
  const router = useRouter();
  useEffect(() => {
    const id = router.query.slug;
    const jwt = cookieCutter.get("jwt");
    const client = createClient(jwt);
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
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col items-center space-y-20 mb-[100px]">
      <Head>
        <title>Profile-{userDetails.name}</title>
        <meta name="description" content="Developed by Ashish" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProfileCard user={userDetails} />
      <div className="grid grid-cols-3 gap-5">
        <PostCardProfile />
        <PostCardProfile />
        <PostCardProfile />
        <PostCardProfile />
        <PostCardProfile />
        <PostCardProfile />
      </div>
    </div>
  );
};

export default Profile;

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
