import React from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";

const SpecificDevice = (props) => {
  const id = useParams().id;
  console.log(id);
  return <Container maxWidth="xl">SpecificDevice {id}</Container>;
};

export default SpecificDevice;
