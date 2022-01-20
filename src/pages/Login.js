import React from "react";
import { TOKEN } from "../const";
import { setCookie } from "../utils/cookies";
import { postData } from "./../api/common";

const Login = () => {
  const login = (values) => {
    postData(values).then((res) => {
      setCookie(TOKEN, "token");
      window.location.href = "/";
    });
  };
  return <div>LoginP</div>;
};

export default Login;
