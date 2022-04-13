import React from "react";
import Devices from "../comps/Devices";
import { SHOW_COLS_NOT_REGISTERED } from "../const";

const DevicesNotReg = () => {
  return (
    <Devices
      query={{ is_registered: "False" }}
      show_cols_name={SHOW_COLS_NOT_REGISTERED}
      name="not_registered"
    />
  );
};

export default DevicesNotReg;
