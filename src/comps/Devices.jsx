import React, { useState } from "react";
import "../style/CustomTable.scss";
import Box from "@mui/material/Box";
import DeviceManager from "./DeviceManager";
import CustomTable from "./CustomTable";

const Devices = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const [changes, setChanges] = useState(false);

  function callback() {
    setChanges(!changes);
    setIsOpen(false);
  }
  return (
    <Box sx={{ mt: 2 }}>
      <CustomTable
        query={props.query}
        setSelected={setSelected}
        setChanges={setChanges}
        setIsOpen={setIsOpen}
        changes={changes}
      />
      <DeviceManager
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selected={selected}
        callback={callback}
      />
    </Box>
  );
};

export default Devices;
