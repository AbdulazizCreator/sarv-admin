import { useState } from "react";
import { deleteData } from "../api/common";
import { toast } from "react-toastify";

const useDelete = (callback) => {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [url, setUrl] = useState("");
  const confirmDelete = () => {
    deleteData(url);
    setDeleteDialog(false);
    toast.success("Удалено успешно");
    callback();
  };
  const cancelDelete = () => {
    setDeleteDialog(false);
  };
  const doWantDelete = (e, url) => {
    setUrl(url)
    e.stopPropagation();
    setDeleteDialog(true);
  };
  return [deleteDialog, confirmDelete, cancelDelete, doWantDelete];
};

export default useDelete;
