import React from "react";
import CustomTable from "../comps/CustomTable";
import { SHOW_COLS_NOT_REGISTERED } from "../const";

const DevicesNotReg = () => {
  return (
    <CustomTable
      query={{ is_registered: "False" }}
      show_cols_name={SHOW_COLS_NOT_REGISTERED}
    />
  );
};

export default DevicesNotReg;
