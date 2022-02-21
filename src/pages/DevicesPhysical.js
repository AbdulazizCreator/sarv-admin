import React from "react";
import CustomTable from "../comps/CustomTable";
import { SHOW_COLS_PHYSICAL } from "../const";

const DevicesPhysical = () => {
  return (
    <CustomTable
      query={{ hudud_fiz_reged: "True" }}
      show_cols_name={SHOW_COLS_PHYSICAL}
    />
  );
};

export default DevicesPhysical;
