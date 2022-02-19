import { useState } from "react";

const useEditDevice = () => {
  const [editDialog, setEditDialog] = useState(false);

  const cancelEdit = () => {
    setEditDialog(false);
  };
  const saveDevice = (values) => {
    console.log(values);
    setEditDialog(false);
  };
  const editDevice = () => {
    setEditDialog(true);
  };

  return [editDialog, cancelEdit, saveDevice, editDevice];
};

export default useEditDevice;