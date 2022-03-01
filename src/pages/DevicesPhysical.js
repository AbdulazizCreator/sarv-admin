import React from "react";
import Devices from "../comps/Devices";
import { SHOW_COLS_PHYSICAL } from "../const";

const DevicesPhysical = () => {
  return (
    <Devices
      query={{ hudud_fiz_reged: "True" }}
      show_cols_name={SHOW_COLS_PHYSICAL}
    />
  );
};

export default DevicesPhysical;
