import { useState } from "react";
import { deleteData } from "../api/common";
import { toast } from "react-toastify";

const useDeleteDevice = (id, callback) => {
  const [deleteDialog, setDeleteDialog] = useState(false);

  const confirmDelete = () => {
    deleteData(`api/device/${id}/`);
    setDeleteDialog(false);
    toast.success("Удалено успешно");
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
