import { Container } from "@mui/material";
import React, { useState } from "react";
import AddUserDialog from "../comps/AddUserDialog";
import { DeleteDialog } from "../comps/common";
import UsersTree from "../comps/UsersTree";
import useDelete from "../hooks/useDelete";

const Users = () => {
  const [addDialog, setAddDialog] = useState(false);
  const [callback, setCallback] = useState(false);
  const [deleteDialog, confirmDelete, cancelDelete, doWantDelete] = useDelete(
    () => setCallback(!callback)
  );

  const handleFocusNode = (e, v) => {
    console.log(v);
  };
  const getValues = (values) => {
    console.log(values);
  };
  const openDialog = (e, id) => {
    e.stopPropagation();
    setAddDialog(true);
  };
  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <UsersTree
        handleFocusNode={handleFocusNode}
        openDialog={openDialog}
        doWantDelete={doWantDelete}
        callback={callback}
      />
      <AddUserDialog
        getValues={getValues}
        addDialog={addDialog}
        setAddDialog={setAddDialog}
      />
      <DeleteDialog
        title="Вы хотите удалить этого пользователя?"
        deleteDialog={deleteDialog}
        cancelDelete={cancelDelete}
        confirmDelete={confirmDelete}
      />
    </Container>
  );
};

export default Users;
