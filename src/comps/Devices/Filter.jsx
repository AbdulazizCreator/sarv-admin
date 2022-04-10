import React, { useState } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import useFetch from "../../hooks/useFetch";

const standard_sizes = ["G2.5", "G4", "G6", "G10", "G16", "G25"];

const Filter = (props) => {
  const [regions] = useFetch("api/region/?limit=15");
  const [filter, setFilter] = useState({
    search: "",
    standard_size: "",
    region: "",
    another: "",
    meter_status_filter: "",
    valve_status_filter: "",
    last_online: "",
  });

  function handleFilter(e) {
    let res = { ...filter };
    res[e.target.name] = e.target.value;
    if (e.target.name === "another") {
      if (e.target.value === "meter_status_filter") {
        res[e.target.value] = 1;
        res["valve_status_filter"] = "";
      } else if (e.target.value === "valve_status_filter") {
        res[e.target.value] = 1;
        res["meter_status_filter"] = "";
      } else {
        res["valve_status_filter"] = "";
        res["meter_status_filter"] = "";
      }
    }
    setFilter({ ...filter, [e.target.name]: e.target.value });
    props.getFilter(res);
  }

  return (
    <Grid container spacing={2}>
      <Grid item lg={2} sm={12} xs={12}>
        <TextField
          id="outlined-search"
          label="Поиск"
          type="search"
          name="search"
          onChange={handleFilter}
          fullWidth
        />
      </Grid>
      <Grid item lg={2} sm={6} xs={12}>
        <FormControl fullWidth>
          <InputLabel id="standard_size">Типоразмер счетчика</InputLabel>
          <Select
            labelId="standard_size"
            id="standard_size"
            name="standard_size"
            value={filter.standard_size}
            label="Типоразмер счетчика"
            onChange={handleFilter}
          >
            <MenuItem value="">Все</MenuItem>
            {standard_sizes.map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item lg={2} sm={6} xs={12}>
        <FormControl fullWidth>
          <InputLabel id="region">Фильтр по региону</InputLabel>
          <Select
            labelId="region"
            id="region"
            name="region"
            value={filter.region}
            label="Фильтр по региону"
            onChange={handleFilter}
          >
            <MenuItem value="">Все</MenuItem>
            {regions.length !== 0 &&
              regions.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.region_name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
        <FormControl fullWidth>
          <InputLabel id="another">Другие</InputLabel>
          <Select
            labelId="another"
            id="another"
            name="another"
            value={filter.another}
            label="Другие"
            onChange={handleFilter}
          >
            <MenuItem value="">Все</MenuItem>
            <MenuItem value="meter_status_filter">
              Счетчики, которые имеется ошибки
            </MenuItem>
            <MenuItem value="valve_status_filter">
              Счетчики c закрытым клапаном
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
        <TextField
          id="outlined-search"
          label="Счетчики, которые не выходили на связь более 3 дней"
          type="number"
          name="last_online"
          onChange={handleFilter}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default Filter;
