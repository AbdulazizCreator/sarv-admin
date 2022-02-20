import React, { useState } from "react";
import SpecificDeviceTable from "./../comps/SpecificDeviceTable";
import { useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import lan from "../const/languages/lan";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import useFetch from "./../hooks/useFetch";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
const SpecificDevice = (props) => {
  const id = useParams().id;
  const [value, setValue] = useState(0);
  const [data, loading] = useFetch(`api/device/${id}`);
  const theme = useTheme();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  console.log(data);
  return (
    <Container maxWidth="xl" sx={{ pt: 4 }}>
      <Box sx={{ backgroundColor: "white", py: 2, mb: 2 }}>
        {loading ? (
          <Box>
            <Skeleton sx={{ height: "40px" }} />
            <Skeleton sx={{ height: "40px" }} animation="wave" />
            <Skeleton sx={{ height: "40px" }} animation={false} />
          </Box>
        ) : (
          <>
            <Divider sx={{ pb: 2 }}>
              <h2>Серийный номер счетчика {data.serial_number}</h2>
            </Divider>
            <Box sx={{ display: "flex" }} className="specialDeviceData">
              <Box sx={{ flex: 1 }}>
                <List component="nav" aria-label="mailbox folders">
                  <CustomListItem
                    name="Лицевой счет"
                    value={data.communication_number}
                  />
                  <CustomListItem
                    name="Номер сим-карты счетчика"
                    value={data.sim_number}
                  />
                  <CustomListItem
                    name="Телефон номер"
                    value={data.phone_number}
                  />
                  <CustomListItem name="Район" value={data.region} />
                </List>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box sx={{ flex: 1 }}>
                <List component="nav" aria-label="mailbox folders">
                  <CustomListItem name="Адрес" value={data.full_address} />
                  <CustomListItem name="Область" value={data.region} />
                  <CustomListItem name="Район" value={data.region} />
                  <CustomListItem
                    name="Типоразмер счетчика"
                    value={data.standard_size}
                  />
                </List>
              </Box>
            </Box>
          </>
        )}
      </Box>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label="Почасовой архив" {...a11yProps(0)} />
        <Tab label="Ежедневный архив" {...a11yProps(1)} />
      </Tabs>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <SpecificDeviceTable
            url={`api/device-hourly`}
            columns={lan.specialDeviceProperties.hourly}
            query={{ device: id }}
          />
          ;
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <SpecificDeviceTable
            url={`api/device-daily`}
            columns={lan.specialDeviceProperties.daily}
            query={{ device: id }}
          />
          ;
        </TabPanel>
      </SwipeableViews>
    </Container>
  );
};

export default SpecificDevice;

const CustomListItem = (props) => {
  return (
    <ListItem sx={{ display: "flex" }}>
      <span>{props.name}</span>
      <span style={{ flex: 1, margin: "0 15px" }}>
        <Divider sx={{ borderStyle: "dashed" }} />
      </span>
      <span>{props.value}</span>
    </ListItem>
  );
};
