import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import PhoneNumberInput from "./PhoneNumberInput";
import { Autocomplete } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const EditDeviceFormDialog = (props) => {
  const [values, setValues] = useState({});
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [personName, setPersonName] = React.useState([]);

  useEffect(() => {
    setValues(props.data);
    setRegion(props.data.region);
    setDistrict(props.data.district);
  }, [props.data]);

  const handleChange = (event) => {
    console.log(event.target.value)
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <Dialog maxWidth="md" open={props.editDialog}>
      <DialogTitle>Серийный номер счетчика: 00007953</DialogTitle>
      <DialogContent>
        <Box sx={{ minWidth: "300px" }} className="edit-dialog-box">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                margin="dense"
                value={values.full_name}
                onChange={handleChange}
                id="full_name"
                name="full_name"
                label="Наименование абонента"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                margin="dense"
                value={values.communication_number}
                onChange={handleChange}
                id="communication_number"
                name="communication_number"
                label="Лицевой счет"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <PhoneNumberInput
                value={values.phone_number}
                onChange={handleChange}
                label="Телефон номер"
                name="phone_number"
                id="phone_number"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                margin="dense"
                label="Адрес"
                value={values.full_address}
                name="full_address"
                id="full_address"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                id="free-solo-demo"
                options={["fdsa", "fsdafds"]}
                value={region}
                onChange={(e, v) => {
                  setValues({ ...values, region: v });
                  setRegion(v);
                }}
                renderInput={(params) => (
                  <TextField margin="dense" {...params} label="Область" />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                id="free-solo-demo"
                options={["fdsa", "fsdafds"]}
                disabled={region ? false : true}
                value={district}
                onChange={(e, v) => {
                  setValues({ ...values, district: v });
                  setDistrict(v);
                }}
                renderInput={(params) => (
                  <TextField margin="dense" {...params} label="Район" />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                id="free-solo-demo"
                options={["fdsa", "fsdafds"]}
                onChange={(e, v) => {
                  setValues({ ...values, branch: v });
                }}
                renderInput={(params) => (
                  <TextField margin="dense" {...params} label="Отрасль" />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <PhoneNumberInput
                value={values.sim_number}
                onChange={handleChange}
                label="Номер сим-карты счетчика"
                name="sim_number"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={personName}
                  onChange={(e) =>
                    setPersonName(
                      typeof e.target.value === "string"
                        ? e.target.value.split(",")
                        : e.target.value
                    )
                  }
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={personName.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between", p: "16px 24px" }}>
        <Checkbox
          checked={values.is_registered}
          name="is_registered"
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
        <Box>
          <Button
            color="error"
            variant="contained"
            onClick={props.cancelEdit}
            sx={{ mr: 1 }}
          >
            Отмена
          </Button>
          <Button
            color="success"
            variant="contained"
            onClick={() => props.saveDevice(values)}
          >
            Сохранит
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default EditDeviceFormDialog;
