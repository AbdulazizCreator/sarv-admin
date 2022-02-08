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
          sx={{ backgroundColor: "#ddd", pr: "10px", mb: '10px' }}
          key={index}
          control={
            <Checkbox
              sx={{
                color: '',
                "&.Mui-checked": {
                  color: 'black',
                },
              }}
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
