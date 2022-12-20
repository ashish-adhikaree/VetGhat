import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import { createClient } from "../apolloClient";
import LoginCard from "../components/authentication/loginCard";
import SignupCard from "../components/authentication/signupCard";
import { CleanUserResponse } from "../helper_functions/cleanStrapiResponse";
import { parseCookie } from "../lib/parseCookies";
import { GetProfile } from "../lib/query";

const Login = () => {
  const [jwt, setjwt] = useState();
  const [uid, setuid] = useState("");
  const [username, setUsername] = useState("");
  const [profilepic, setProfilepic] = useState("");
  useEffect(() => {
    if (jwt != undefined) {
      Cookie.set("jwt", jwt);
      Cookie.set("uid", uid);
      const client = createClient(jwt)
      client.query({
        query: GetProfile,
        variables:{
          id: uid
        }
      }).then((res)=>{
        const user = CleanUserResponse(res.data.usersPermissionsUser)
        Cookie.set("username", user.username);
        Cookie.set("profilepic", user.profilepic.url);
      }).catch((err)=> console.log(err))
    }
  }, [jwt, uid, username, profilepic]);

  const [isLoginCardVisible, setLoginCardVisibility] = useState(true);
  const switchCards = () => {
    setLoginCardVisibility(!isLoginCardVisible);
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      {isLoginCardVisible ? (
        <LoginCard
          switchCards={switchCards}
          setjwt={setjwt}
          setuid={setuid}
        />
      ) : (
        <SignupCard
          switchCards={switchCards}
          setjwt={setjwt}
          setuid={setuid}
        />
      )}
    </div>
  );
};

export default Login;

