import React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { IMaskInput } from "react-imask";

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="+998(#0) 000-00-00"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});
const PhoneNumberInput = (props) => {
  return (
    <FormControl id="outlined-basic" margin="dense" fullWidth>
      <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
      <OutlinedInput
        {...props}
        id={props.name}
        inputComponent={TextMaskCustom}
        // onChange={props.onChange}
        // value={props.value}
      />
    </FormControl>
  );
};

export default PhoneNumberInput;
