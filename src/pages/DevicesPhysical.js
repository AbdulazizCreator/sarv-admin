import React from "react";
import CustomTable from "../comps/CustomTable";

const DevicesPhysical = () => {
  return <CustomTable query={{ hudud_fiz_reged: "True" }} />;
};

export default DevicesPhysical;
