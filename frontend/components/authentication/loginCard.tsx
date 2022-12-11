import { useRouter } from "next/router";
import { useState } from "react";
import {
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

import { client } from "../../apolloClient";
import { Login } from "../../lib/mutation";
import { LoginValue } from "../../typedeclaration";

const LoginCard = ({ switchCards , setjwt}: any) => {  
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const [formValue, setformValue] = useState<LoginValue>();

  const router = useRouter()

  const changePasswordVisibility = (e: any) => {
    e.preventDefault();
    setPasswordVisible(!isPasswordVisible);
  };

  const handleInputChange = (e: any) => {
    const updatedFormValue = { ...formValue, [e.target.name]: e.target.value };
    setformValue(updatedFormValue);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formValue);
    client
      .mutate({
        mutation: Login,
        variables:{
          email: formValue?.email,
          password: formValue?.password,
        }
      })
      .then((res) => {
        console.log(res);
        setjwt(res.data?.login?.jwt)
        router.push('/')
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="w-2/3 md:w-1/2 lg:w-1/3 bg-white">
      <div className="relative">
        <p className="font-bold text-xl pt-10 pb-2 px-8 before:content-[' '] before:w-10 before:h-1 before:bg-purple-500 before:absolute before:bottom-0">
          LogIn
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        action="Login"
        className="space-y-3 py-10 flex flex-col items-center px-8"
      >
        <div className=" authentication-input-container">
          <AiOutlineMail />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="authentication-input"
            onChange={handleInputChange}
          />
        </div>
        <div className=" authentication-input-container relative">
          <AiOutlineLock />
          <input
            name="password"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            className="authentication-input"
            onChange={handleInputChange}
          />
          <button
            className="absolute right-5 text-xl"
            onClick={changePasswordVisibility}
          >
            {isPasswordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
        </div>
        <div className="flex space-x-5 px-5 font-semibold pb-10 pt-5">
          <input type="checkbox" className="" />
          <p>I agree to all the terms and condition.</p>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 text-white font-bold py-3 text-md rounded-md"
        >
          Login
        </button>
        <p className="font-semibold">
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
