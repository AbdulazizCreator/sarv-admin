import React from "react";
// import Footer from "./Footer";
import Navbar from "./Navbar";

const LayOut = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default LayOut;
