import axios from "axios";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import {
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

import { AlertType } from "../../typedeclaration";
import Alert from "../alert/alert";

const LoginCard = ({ switchCards}: any) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const privacyRef = useRef<HTMLInputElement>(null);

  const [alert, setAlert] = useState<AlertType>();

  const router = useRouter();

  const changePasswordVisibility = (e: any) => {
    e.preventDefault();
    setPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const privacy = privacyRef.current?.value;
    
    if (email && password && privacy) {
      setAlert({
        type: "",
        body: "",
      });
      try {
        await axios.post("/api/auth/login", {
          email: email,
          password: password,
        });
        router.replace("/");
        // Handle success.
        setAlert({
          type: "success",
          body: "Logged in Successfully. Redirecting...",
        });
      } catch (error: any) {
        setAlert({
          type: "error",
          body: error.message,
        });
      }
    } else {
      setAlert({
        type: "error",
        body: "Fill up the form first",
      });
    }
  };
  return (
    <div className="w-2/3 md:w-1/2 lg:w-1/3 bg-white rounded-md">
      <div className="relative">
        <p className="font-bold text-xl pt-10 pb-2 px-8 before:content-[' '] before:w-10 before:h-1 before:bg-purple-500 before:absolute before:bottom-0">
          LogIn
        </p>
      </div>
      {alert && (
        <div className="px-8">
          <Alert type={alert.type} body={alert.body} />
        </div>
      )}
      <form className="space-y-3 py-10 pt-5 flex flex-col items-center px-8">
        <div className=" authentication-input-container">
          <AiOutlineMail />
          <input
            ref={emailRef}
            type="email"
            name="email"
            placeholder="Email"
            className="authentication-input"
          />
        </div>
        <div className=" authentication-input-container relative">
          <AiOutlineLock />
          <input
            name="password"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            className="authentication-input"
            ref={passwordRef}
          />
          <button
            className="absolute right-5 text-xl"
            onClick={changePasswordVisibility}
          >
            {isPasswordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
        </div>
        <div className="flex space-x-5 px-5 font-semibold pt-5">
          <input
            type="checkbox"
            className=""
            name="privacyCheck"
            ref={privacyRef}
          />
          <p>I agree to all the terms and condition.</p>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 text-white font-bold py-3 text-md rounded-md"
          onClick={handleSubmit}
        >
          Login
        </button>
        <p className="font-semibold pt-10">
          Do not have an account?
          <button
            onClick={(e) => {
              e.preventDefault();
              switchCards();
            }}
            className="underline cursor-pointer"
          >
            SignUp
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginCard;
