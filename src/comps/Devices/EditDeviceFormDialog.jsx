import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { PhoneNumberInput } from "../common";
import { Autocomplete } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

import useFetch from "../../hooks/useFetch";
import { getData } from "../../api/common";

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

const branches = [
  { label: "Юрлицо", value: "entity" },
  { label: "Физлицо", value: "individuals" },
];

const EditDeviceFormDialog = (props) => {
  const [values, setValues] = useState({});
  const [personName, setPersonName] = React.useState([]);
  const [region, setRegion] = useState(null);
  const [district, setDistrict] = useState(null);
  const [regions] = useFetch("api/region/?limit=15");
  const [districts, setDistricts] = useState([]);
  const [branch, setBranch] = useState(null);
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    getData(`api/device/${props.data.id}`).then((res) => {
      let data = res.data;
      [
        "sim_number",
        "full_address",
        "phone_number",
        "communication_number",
        "full_name",
      ].forEach((pr) => {
        if (data[pr] === null) data[pr] = "";
      });
      setValues(data);
      setBranch(branches.find((br) => br.value === res.data.branch));
      if (res.data.region) {
        getData(
          `api/district/?p=1&page_size=15&region=${res.data.region}`
        ).then((res) => {
          setDistricts(res.data.results);
        });
        getData(`api/region/${res.data.region}/`).then((res) => {
          setRegion(res.data);
        });
      }
      res.data.district &&
        getData(`api/district/${res.data.district}/`).then((res) => {
          setDistrict(res.data);
        });
    });
  }, [props.data.id]);

  return (
    <Dialog maxWidth="md" open={props.editDialog}>
      <DialogTitle>Серийный номер счетчика: {values.serial_number}</DialogTitle>
      <DialogContent>
        <Box sx={{ minWidth: "250px" }} className="edit-dialog-box">
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
                onChange={handleChange}
                name="full_address"
                id="full_address"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                id="free-solo-demo"
                options={regions}
                value={region}
                getOptionLabel={(option) => option.region_name}
                renderOption={(props, option) => (
                  <li {...props}> {option.region_name}</li>
                )}
                onChange={(e, v) => {
                  setValues({ ...values, region: v && v.id });
                  setRegion(v);
                  getData(`api/district/?p=1&page_size=20&region=${v.id}`).then(
                    (res) => {
                      setDistricts(res.data.results);
                    }
                  );
                  setDistrict(null);
                }}
                renderInput={(params) => (
                  <TextField margin="dense" {...params} label="Область" />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                id="free-solo-demo"
                options={districts}
                disabled={region ? false : true}
                value={district}
                getOptionLabel={(option) => option.district_name}
                renderOption={(props, option) => (
                  <li {...props}> {option.district_name}</li>
                )}
                onChange={(e, v) => {
                  setValues({ ...values, district: v && v.id });
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
                options={branches}
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <li {...props}> {option.label}</li>
                )}
                value={branch}
                onChange={(e, v) => {
                  setBranch(v);
                  setValues({ ...values, branch: v && v.value });
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
                <InputLabel id="demo-multiple-checkbox-label">
                  Пользователи
                </InputLabel>
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
                  input={<OutlinedInput label="Пользователи" />}
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
      <DialogActions
        className="edit-device-footer"
        sx={{ justifyContent: "space-between", p: "16px 24px" }}
      >
        <FormControlLabel
          label={`Статус: ${values.is_registered ? "Активный" : "Неактивный"}`}
          control={
            <Checkbox
              checked={values.is_registered}
              name="is_registered"
              onChange={(e) => {
                setValues({ ...values, is_registered: e.target.checked });
              }}
              inputProps={{ "aria-label": "controlled" }}
            ></Checkbox>
          }
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

export default React.memo(EditDeviceFormDialog);
