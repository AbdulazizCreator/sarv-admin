import React, { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  ListItemText,
  MenuItem,
  TextField,
} from "@mui/material";
import useFetch from "../hooks/useFetch";
import PhoneNumberInput from "./PhoneNumberInput";
import { getData } from "../api/common";

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

const AddUserDialog = (props) => {
  const [values, setValues] = useState({});
  const [region, setRegion] = useState(null);
  const [district, setDistrict] = useState(null);
  const [regions] = useFetch("api/region/?limit=15");
  const [districts, setDistricts] = useState([]);
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const data = {
      ...values,
      [event.target.name]: event.target.value,
    };
    setValues(data);
    props.getValues(data);
  };

  const editUser = () => {};
  const handleChecked = (name) => {
    if (personName.includes(name)) {
      setPersonName((personName) => personName.filter((item) => item !== name));
    } else {
      setPersonName([...personName, name]);
    }
  };

  return (
    <Dialog maxWidth="md" open={props.addDialog}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              margin="dense"
              value={values.username}
              onChange={handleChange}
              id="username"
              name="username"
              label="Имя пользователь"
              fullWidth
            />
            <TextField
              margin="dense"
              value={values.full_name}
              onChange={handleChange}
              id="full_name"
              name="full_name"
              label="Наименование абонента"
              fullWidth
            />
            <PhoneNumberInput
              value={values.phone_number}
              onChange={handleChange}
              label="Телефон номер"
              name="phone_number"
              id="phone_number"
            />
            <TextField
              margin="dense"
              label="Адрес"
              value={values.full_address}
              onChange={handleChange}
              name="full_address"
              id="full_address"
              fullWidth
            />
            <Autocomplete
              id="free-solo-demo"
              options={regions}
              value={region}
              getOptionLabel={(option) => option.region}
              renderOption={(props, option) => (
                <li {...props}> {option.region}</li>
              )}
              onChange={(e, v) => {
                setValues({ ...values, region: v && v.id });
                setRegion(v);
                getData(`api/district/?p=1&page_size=15&region=${v.id}`).then(
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
            <Autocomplete
              id="free-solo-demo"
              options={districts}
              disabled={region ? false : true}
              value={district}
              getOptionLabel={(option) => option.district}
              renderOption={(props, option) => (
                <li {...props}> {option.district}</li>
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
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                onClick={() => handleChecked(name)}
              >
                <Checkbox checked={personName.includes(name)} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        className="edit-device-footer"
        sx={{ justifyContent: "space-between", p: "16px 24px" }}
      >
        <Box>
          <Button
            color="error"
            variant="contained"
            onClick={() => props.setAddDialog(false)}
            sx={{ mr: 1 }}
          >
            Отмена
          </Button>
          <Button color="success" variant="contained" onClick={editUser}>
            Сохранит
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(AddUserDialog);
