import React from "react";
import CustomTable from "../comps/CustomTable";

const DevicesLegal = () => {
  return <CustomTable query={{ hudud_yur_reged: 'True' }} />;
};

export default DevicesLegal;
