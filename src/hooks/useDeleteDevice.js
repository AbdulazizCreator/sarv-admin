import { useState } from "react";
import { deleteData } from "../api/common";

const useDeleteDevice = (id, callback) => {
  const [deleteDialog, setDeleteDialog] = useState(false);

  const confirmDelete = () => {
    deleteData(`device/${id}/`);
    setDeleteDialog(false);
    callback();
  };
  const cancelDelete = () => {
    setDeleteDialog(false);
  };
  const deleteDevice = () => {
    setDeleteDialog(true);
  };
  return [deleteDialog, confirmDelete, cancelDelete, deleteDevice];
};

export default useDeleteDevice;
