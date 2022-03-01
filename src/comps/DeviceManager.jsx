import React from "react";
import "../style/CustomTable.scss";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import DownloadingOutlinedIcon from "@mui/icons-material/DownloadingOutlined";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Button } from "@mui/material";
import EditDeviceFormDialog from "./EditDeviceFormDialog";
import useEditDevice from "./../hooks/useEditDevice";
import useDeleteDevice from "./../hooks/useDeleteDevice";
import lan from "../const/languages/lan";
import { useNavigate } from "react-router-dom";

const DeviceManager = (props) => {
  const columns = lan.deviceProperties.visible;
  const cols = Object.keys(columns);
  console.log("Device Manager");
  const [editDialog, cancelEdit, saveDevice, editDevice] = useEditDevice(
    props.selected,
    props.callback
  );
  const [deleteDialog, confirmDelete, cancelDelete, deleteDevice] =
    useDeleteDevice(props.selected.id, props.callback);

  const handleClose = () => props.setIsOpen(false);
  const history = useNavigate();
  return (
    <>
      <Dialog
        open={props.isOpen}
        scroll="paper"
        fullScreen
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        className="device-modal"
      >
        <DialogTitle id="scroll-dialog-title" sx={{ p: 2 }}>
          Серийный номер счетчика: {props.selected.communication_number}
          <IconButton
            aria-label="close"
            variant="contained"
            onClick={handleClose}
            color="error"
            sx={{
              position: "absolute",
              right: 8,
              top: 12,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 0 }}>
          <List component="nav" aria-label="mailbox folders">
            {cols.map((device_property) => (
              <ListItem
                divider
                key={device_property}
                sx={{ my: 0, display: "flex", justifyContent: "space-between" }}
              >
                <p>{columns[device_property]}</p>
                <p>{props.selected[device_property]}</p>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <LoadingButton
            loading={false}
            onClick={() => deleteDevice()}
            loadingPosition="start"
            startIcon={<DeleteIcon />}
            variant="contained"
            size="large"
            color="error"
          >
            <span className="access-name">Удалить</span>
          </LoadingButton>
          <LoadingButton
            loading={false}
            onClick={() => editDevice(props.selected)}
            loadingPosition="start"
            startIcon={<EditOutlinedIcon />}
            variant="contained"
            size="large"
          >
            <span className="access-name">Изменит</span>
          </LoadingButton>
          <LoadingButton
            loading={false}
            loadingPosition="start"
            startIcon={<SettingsOutlinedIcon />}
            variant="contained"
            size="large"
            color="warning"
          >
            <span className="access-name">Настройки</span>
          </LoadingButton>
          <LoadingButton
            loading={false}
            loadingPosition="start"
            startIcon={<ChevronRightOutlinedIcon />}
            variant="contained"
            size="large"
            color="secondary"
            onClick={() => history(`/devices/${props.selected.id}`)}
          >
            <span className="access-name">Данные</span>
          </LoadingButton>
          <LoadingButton
            loading={false}
            loadingPosition="start"
            startIcon={<DownloadingOutlinedIcon />}
            variant="contained"
            size="large"
            color="success"
          >
            <span className="access-name">Выгрузка</span>
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteDialog} aria-labelledby="draggable-dialog-title">
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Вы хотите удалить это устройство?
        </DialogTitle>
        <DialogActions>
          <Button onClick={cancelDelete}>Нет</Button>
          <Button onClick={confirmDelete}>Да</Button>
        </DialogActions>
      </Dialog>
      {props.selected.id && (
        <EditDeviceFormDialog
          editDialog={editDialog}
          saveDevice={saveDevice}
          cancelEdit={cancelEdit}
          data={props.selected}
        />
      )}
    </>
  );
};

export default React.memo(DeviceManager);
