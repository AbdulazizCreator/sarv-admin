import React from "react";
// import { TOKEN } from "../const";
// import { setCookie } from "../utils/cookies";
// import { postData } from "./../api/common";
import lan from "../const/languages/lan";
console.log(lan);
const Login = () => {
  // const login = (values) => {
  //   postData(values).then((res) => {
  //     setCookie(TOKEN, "token");
  //     window.location.href = "/";
  //   });
  // };
  return <div>{lan.login}</div>;
};

export default Login;
