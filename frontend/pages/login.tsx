import Cookie from "js-cookie";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import LoginCard from "../components/authentication/loginCard";
import SignupCard from "../components/authentication/signupCard";
import { dontrequireAuthentication } from "../HOC/authentication/authentication";
import { parseCookie } from "../lib/parseCookies";

const Login = ({ initialjwt }: any) => {
  const [jwt, setjwt] = useState(() => initialjwt);

  useEffect(() => {
    Cookie.set("jwt", jwt);
  }, [jwt]);

  const [isLoginCardVisible, setLoginCardVisibility] = useState(true);
  const switchCards = () => {
    setLoginCardVisibility(!isLoginCardVisible);
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      {isLoginCardVisible ? (
        <LoginCard switchCards={switchCards} setjwt={setjwt} />
      ) : (
        <SignupCard switchCards={switchCards} setjwt={setjwt} />
      )}
    </div>
  );
};

export default Login;

export const getServerSideProps = dontrequireAuthentication(
  async(ctx)=>{
    const {req} = ctx
    const cookies = parseCookie(req);
    return {
      props:{
        initialjwt: cookies
      }
    }
  }
)

