import { Container } from "@mui/material";
import React, { useState } from "react";
import AddUserDialog from "../comps/AddUserDialog";
import UsersTree from "../comps/UsersTree";

const Users = () => {
  const [addDialog, setAddDialog] = useState(false);

  const handleFocusNode = (e, v) => {
    console.log(v);
  };
  const getValues = (values) => {
    console.log(values);
  };
  const openDialog = () => {
    setAddDialog(true);
  };
  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <UsersTree handleFocusNode={handleFocusNode} openDialog={openDialog} />
      <AddUserDialog
        getValues={getValues}
        addDialog={addDialog}
        setAddDialog={setAddDialog}
      />
    </Container>
  );
};

export default Users;
