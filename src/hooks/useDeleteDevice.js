import{ useState } from "react";

const useDeleteDevice = () => {
  const [deleteDialog, setDeleteDialog] = useState(false);

  const confirmDelete = () => {
    setDeleteDialog(false);
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
