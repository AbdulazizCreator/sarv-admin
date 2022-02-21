import React from "react";
import CustomTable from "../comps/CustomTable";
import { SHOW_COLS_LEGAL } from "../const";

const DevicesLegal = () => {
  return (
    <CustomTable
      query={{ hudud_yur_reged: "True" }}
      show_cols_name={SHOW_COLS_LEGAL}
    />
  );
};

export default DevicesLegal;
