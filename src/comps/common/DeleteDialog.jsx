import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import React from "react";

const DeleteDialog = ({ title, deleteDialog, cancelDelete, confirmDelete }) => {
  return (
    <Dialog open={deleteDialog} aria-labelledby="draggable-dialog-title">
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        {title}
      </DialogTitle>
      <DialogActions>
        <Button onClick={cancelDelete} color="primary" variant="contained">
          Нет
        </Button>
        <Button onClick={confirmDelete} color="error" variant="contained">
          Да
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
