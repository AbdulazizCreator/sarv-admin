import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import "../../style/navbar.scss";

const pages = [
  { name: "Приборы (Все)", url: "/devices" },
  { name: "Приборы (Юр)", url: "/devices/legal" },
  { name: "Приборы (Физ)", url: "/devices/physical" },
  { name: "Приборы (Не зарег)", url: "/devices/not_registered" },
  { name: "Пользователи", url: "/users" },
  { name: "Статистика", url: "/statistics" },
  { name: "Настройки", url: "/settings" },
  { name: "Журнал", url: "/list" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [drawer, setDrawer] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawer(open);
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            SARF
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer(true)}
              color="inherit"
              sx={{ marginLeft: "-12px" }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              className="navbar-drawer"
              anchor="left"
              open={drawer}
              onClose={toggleDrawer(false)}
            >
              <Box
                sx={{
                  width: 250,
                }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <List>
                  {pages.slice(0, 4).map((page) => (
                    <ListItem
                      button
                      end
                      component={NavLink}
                      to={page.url}
                      key={page.url}
                    >
                      {/* <ListItemIcon>
                        
                      </ListItemIcon> */}
                      <ListItemText primary={page.name} />
                    </ListItem>
                  ))}
                </List>
                <Divider />
                <List>
                  {pages.slice(4).map((page) => (
                    <ListItem
                      button
                      end
                      component={NavLink}
                      to={page.url}
                      key={page.url}
                    >
                      {/* <ListItemIcon>
                        
                      </ListItemIcon> */}
                      <ListItemText primary={page.name} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            LOGO
          </Typography>

          <List
            sx={{
              flexDirection: "row",
              padding: 0,
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
            className="navbar"
          >
            {pages.map((page, index) => (
              <ListItem
                button
                end
                component={NavLink}
                to={page.url}
                key={page.url}
              >
                <ListItemText primary={page.name} />
              </ListItem>
            ))}
          </List>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
