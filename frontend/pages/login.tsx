import { useState } from "react";
import LoginCard from "../components/authentication/loginCard";
import SignupCard from "../components/authentication/signupCard";

const Login = () => {
  const [isLoginCardVisible, setLoginCardVisibility] = useState(true);
  const switchCards = () => {
    setLoginCardVisibility(!isLoginCardVisible);
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      {isLoginCardVisible ? (
        <LoginCard
          switchCards={switchCards}
        />
      ) : (
        <SignupCard
          switchCards={switchCards}
        />
      )}
    </div>
  );
};

export default Login;

