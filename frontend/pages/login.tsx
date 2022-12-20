import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import LoginCard from "../components/authentication/loginCard";
import SignupCard from "../components/authentication/signupCard";
import { parseCookie } from "../lib/parseCookies";

const Login = () => {
  const [jwt, setjwt] = useState();
  const [uid, setuid] = useState(''); 
  useEffect(() => {
    if (jwt != undefined) {
      Cookie.set("jwt", jwt);
      Cookie.set("uid", uid)
    }
  }, [jwt, uid]);

  const [isLoginCardVisible, setLoginCardVisibility] = useState(true);
  const switchCards = () => {
    setLoginCardVisibility(!isLoginCardVisible);
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      {isLoginCardVisible ? (
        <LoginCard switchCards={switchCards} setjwt={setjwt} setuid={setuid}/>
      ) : (
        <SignupCard switchCards={switchCards} setjwt={setjwt} setuid={setuid}/>
      )}
    </div>
  );
};

export default Login;

export const getServerSideProps = async (ctx:any) => {
  const { req } = ctx;
  const cookies = parseCookie(req);
  if (cookies.jwt) {
    return {
      props: {
        initialjwt: cookies.jwt,
      },
    };
  }
  return {
    props: {},
  };
}
