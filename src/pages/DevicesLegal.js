import React from "react";
import Devices from "../comps/Devices";
import { SHOW_COLS_LEGAL } from "../const";

const DevicesLegal = () => {
  return (
    <Devices
      query={{ hudud_yur_reged: "True" }}
      show_cols_name={SHOW_COLS_LEGAL}
      name="legal"
    />
  );
};

export default DevicesLegal;
