import { useState } from "react";
// import { getData } from "../api/common";
import { patchData } from "./../api/common";
import { toast } from "react-toastify";

const useEditDevice = (data, callback) => {
  const [editDialog, setEditDialog] = useState(false);

  const cancelEdit = () => {
    setEditDialog(false);
  };
  const saveDevice = (values) => {
    console.log(values);
    patchData(`api/device/${values.id}/`, values).then((res) => {
      setEditDialog(false);
      toast.success("Изменено успешно");
      callback();
    });
  };
  const editDevice = () => {
    setEditDialog(true);
  };

  return [editDialog, cancelEdit, saveDevice, editDevice];
};

export default useEditDevice;
