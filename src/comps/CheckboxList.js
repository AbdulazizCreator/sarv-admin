import React from "react";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const CheckboxList = () => {
  const list = [
    "№",
    "Лицевой счет",
    "Заводской номер счетчика",
    "Серийный номер счетчика",
    "Типоразмер счетчика",
  ];
  const handleChange = () => {};
  return (
    <Box>
      {list.map((box, index) => (
        <FormControlLabel
          sx={{ backgroundColor: "#ddd", pr: "5px", mb: "5px" }}
          key={index}
          control={
            <Checkbox
              sx={{
                color: "",
                "&.Mui-checked": {
                  color: "black",
                },
                padding: "3px"
              }}
              size="small"
              defaultChecked
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label={box}
        />
      ))}
    </Box>
  );
};

export default CheckboxList;
