import React from "react";
import CustomTable from "../comps/CustomTable";

const DevicesNotReg = () => {
  return <CustomTable query={{ is_registered: "False" }} />;
};

export default DevicesNotReg;
