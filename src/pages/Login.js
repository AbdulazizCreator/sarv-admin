import React, { useState } from "react";
import "../style/login.scss";
import { TOKEN } from "../const";
import { setCookie } from "../utils/cookies";
import { postData } from "./../api/common";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Avatar from "@mui/material/Avatar";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { pink } from "@mui/material/colors";
// import FormHelperText from "@mui/material/FormHelperText";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    showPassword: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const login = () => {
    delete values.showPassword;
    setIsLoading(true);
    postData("login/", values)
      .then((res) => {
        setCookie(TOKEN, res.data.jwt);
        window.location.href = "/";
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Box>
      <Grid container className="login">
        <Grid className="login-img-box" item lg={7} md={6} sm={0} xs={0}>
          <Grid
            sx={{ height: "100%" }}
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            <h1>SARV</h1>
            <h3>Добро пожаловать</h3>
            <p align="center">
              При входе введенный вами пароль должен содержать цифры, буквы,
              знаки пунктуации, завязку, развитие, кульминацию и неожиданный
              финал
            </p>
          </Grid>
        </Grid>
        <Grid item lg={5} md={6} sm={12} xs={12}>
          <div className="login-form">
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ mb: 3 }}
            >
              <Avatar
                sx={{ bgcolor: pink[500], width: "60px", height: "60px" }}
              >
                <AssignmentIndOutlinedIcon fontSize="large" />
              </Avatar>
              <h2>Войти в систему</h2>
            </Grid>
            <FormControl
              error={false}
              sx={{ mb: 3 }}
              fullWidth
              variant="outlined"
            >
              <InputLabel htmlFor="input-with-icon-adornment">
                Имя пользователя
              </InputLabel>
              <OutlinedInput
                id="input-with-icon-adornment"
                onChange={handleChange("username")}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircleOutlinedIcon />
                  </InputAdornment>
                }
                label="Имя пользователя"
              />
            </FormControl>
            <FormControl
              error={false}
              sx={{ mb: 3 }}
              fullWidth
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Пароль
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                startAdornment={
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Пароль"
              />
              {/* <FormHelperText id="component-error-text">Error</FormHelperText> */}
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Запомните меня"
            />

            <LoadingButton
              loading={isLoading}
              sx={{ mt: 3 }}
              fullWidth
              variant="contained"
              onClick={login}
              loadingIndicator="Loading..."
            >
              Войти
            </LoadingButton>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
