import { useRouter } from "next/router";
import { useState } from "react";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { createClient } from "../../apolloClient";
import Axios from "../../axios";
import { SignUp } from "../../lib/mutation";
import { AlertType, LoginValue } from "../../typedeclaration";
import Alert from "../alert/alert";

const SignupCard = ({ switchCards, setjwt, setuid }: any) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const [formValue, setformValue] = useState<LoginValue>();

  const [alert, setAlert] = useState<AlertType>();

  const router = useRouter();

  const changePasswordVisibility = (e: any) => {
    e.preventDefault();
    setPasswordVisible(!isPasswordVisible);
  };

  const handleInputChange = (e: any) => {
    const updatedFormValue =
      e.target.name === "privacyCheck"
        ? { ...formValue, [e.target.name]: e.target.checked }
        : { ...formValue, [e.target.name]: e.target.value };
    setformValue(updatedFormValue);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      formValue?.name &&
      formValue?.email &&
      formValue.password &&
      formValue?.confirmPassword &&
      formValue?.privacyCheck
    ) {
      if (formValue.confirmPassword === formValue.password) {
        // Request API.

        Axios("")
          .post(`${process.env.STRAPI_URL}/api/auth/local/register`, {
            username: formValue.name,
            email: formValue.email,
            password: formValue.password,
          })
          .then((res) => {
            // Handle success.
            setAlert({
              type: "success",
              body: "Account Created Successfully. Redirecting...",
            });
            setjwt(res.data.jwt);
            setuid(res.data.user.id);
            router.push("/");
          })
          .catch((error) => {
            console.log(error)
            // Handle error.
            setAlert({
              type: "error",
              body: error.message,
            });
          });
      } else {
        setAlert({
          type: "error",
          body: "Two Passwords Do Not Match",
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
    <div className="w-2/3 md:w-1/2 lg:w-1/3 bg-white">
      <div className="relative">
        <p className="font-bold text-xl pt-10 pb-2 px-8 before:content-[' '] before:w-10 before:h-1 before:bg-purple-500 before:absolute before:bottom-0">
          SignUp
        </p>
      </div>
      {alert && (
        <div className="px-8">
          <Alert type={alert.type} body={alert.body} />
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        action="SignUp"
        className="space-y-3 py-10 flex flex-col items-center px-8"
      >
        <div className=" authentication-input-container">
          <AiOutlineUser />
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            className="authentication-input"
            onChange={handleInputChange}
          />
        </div>
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
        <div className=" authentication-input-container">
          <AiOutlineLock />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            className="authentication-input"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex space-x-5 px-5 font-semibold pt-5">
          <input
            type="checkbox"
            className=""
            name="privacyCheck"
            onChange={handleInputChange}
          />
          <p>I agree to all the terms and condition.</p>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 text-white font-bold py-3 text-md rounded-md"
        >
          Create Account
        </button>
        <p className="font-semibold pt-10">
          Already have an account?{" "}
          <button
            onClick={(e) => {
              e.preventDefault();
              switchCards();
            }}
            className="underline cursor-pointer"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignupCard;
