import React, { useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import IconButton from "@mui/material/IconButton";

import { users } from "./../api/user";
import {
  Autocomplete,
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
import PhoneNumberInput from "../comps/PhoneNumberInput";
import useFetch from "../hooks/useFetch";
import { getData } from "../api/common";

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    // borderTopRightRadius: theme.spacing(2),
    // borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
}));

function StyledTreeItem(props) {
  const {
    bgColor,
    color,
    labelIcon: PersonOutlineOutlinedIcon,
    labelInfo,
    labelText,
    ...other
  } = props;
  return (
    <StyledTreeItemRoot
      label={
        <Box
          className="abdulaziz"
          sx={{ display: "flex", alignItems: "center", py: 1.5 }}
        >
          <Box
            component={PersonOutlineOutlinedIcon}
            color="inherit"
            sx={{ mr: 1 }}
          />
          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1, fontSize: "20px" }}
          >
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit" sx={{ zIndex: 100 }}>
            <IconButton color="success">
              <PersonAddAltOutlinedIcon onClick={props.setAddDialog} />
            </IconButton>
            <IconButton color="error">
              <PersonRemoveOutlinedIcon />
            </IconButton>
            <IconButton color="primary">
              <ManageAccountsOutlinedIcon />
            </IconButton>
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

function flatten(array, depth) {
  return array.reduce((p, c) => {
    if (c.users_tree.length !== 0) {
      c.depth = depth;
      const flatChildren = flatten(c.users_tree, depth + 1);
      c.users_tree.concat(flatChildren);
      return p.concat([c]);
    } else {
      c.depth = depth;
      return p.concat([c]);
    }
  }, []);
}

const flatData = flatten(users.results, 1);
console.log(flatData);

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

const Users = () => {
  const [addDialog, setAddDialog] = useState(false);
  const [values, setValues] = useState({});
  const [region, setRegion] = useState(null);
  const [district, setDistrict] = useState(null);
  const [regions] = useFetch("api/region/?limit=15");
  const [districts, setDistricts] = useState([]);
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const handleFocusNode = (e, v) => {
    console.log(v);
  };
  const editUser = () => {};
  const handleChecked = (name) => {
    if (personName.includes(name)) {
      setPersonName((personName) => personName.filter((item) => item !== name));
    } else {
      setPersonName([...personName, name]);
    }
  };
  console.log(personName);
  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Card sx={{ p: 2 }} className="Users">
        <TreeView
          aria-label="gmail"
          onNodeSelect={handleFocusNode}
          defaultCollapseIcon={<ArrowDropDownIcon className="tree-icon" />}
          defaultExpandIcon={<ArrowRightIcon className="tree-icon" />}
          defaultEndIcon={<div style={{ width: 24, fontSize: "25px" }} />}
          sx={{ flexGrow: 1, maxWidth: 800, overflowY: "auto" }}
        >
          <Tree data={flatData} setAddDialog={() => setAddDialog(true)} />
        </TreeView>
      </Card>
      <Dialog maxWidth="md" open={addDialog}>
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
              onClick={() => setAddDialog(false)}
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
    </Container>
  );
};

export default Users;

const Tree = (props) => {
  const data = props.data;
  if (!data) return null;
  return (
    <>
      {data.map((user) => {
        return (
          <StyledTreeItem
            nodeId={user.id}
            labelText={user.username.toUpperCase()}
            labelIcon={PersonOutlineOutlinedIcon}
            setAddDialog={props.setAddDialog}
            sx={{
              [`& .${treeItemClasses.group}`]: {
                marginLeft: 0,
                [`& .${treeItemClasses.content}`]: {
                  paddingLeft: user.depth * 2.5 + 4,
                },
              },
            }}
          >
            {user.users_tree.length !== 0 && (
              <Tree {...props} data={user.users_tree} />
            )}
          </StyledTreeItem>
        );
      })}
    </>
  );
};
