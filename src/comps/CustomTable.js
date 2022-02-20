import React, { useState } from "react";
import "../style/CustomTable.scss";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { PGNTN_LIMIT, SHOW_COLS } from "../const";
import usePaginationFetch from "./../hooks/usePaginationFetch";
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
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";
import EditDeviceFormDialog from "./EditDeviceFormDialog";
import useTableColumnOrder from "../hooks/useTableColumnOrder";
import useEditDevice from "./../hooks/useEditDevice";
import useDeleteDevice from "./../hooks/useDeleteDevice";
import lan from "../const/languages/lan";
import { useNavigate } from "react-router-dom";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(() => ({
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {},
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const CustomTable = (props) => {
  const columns = lan.deviceProperties.visible;
  const cols = Object.keys(columns);
  const loc_cols =
    JSON.parse(localStorage.getItem(SHOW_COLS)) ||
    localStorage.setItem(
      SHOW_COLS,
      JSON.stringify(
        cols.map((col, idx) => {
          return { id: idx, name: col, show: true };
        })
      )
    );
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const [changes, setChanges] = useState(false);
  const [
    devices,
    currentPage,
    totalElements,
    isFetching,
    handlePaginationChange,
  ] = usePaginationFetch("api/device", props.query || {}, changes);

  const [
    showCols,
    setShowCols,
    dragOver,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleOnDrop,
  ] = useTableColumnOrder(loc_cols, true);
  const [editDialog, cancelEdit, saveDevice, editDevice] = useEditDevice();
  const callbackDelete = () => {
    setChanges(!changes);
    setOpen(false);
  };
  const [deleteDialog, confirmDelete, cancelDelete, deleteDevice] =
    useDeleteDevice(selected.id, callbackDelete);
  const handleChecked = (e, col) => {
    const tempCols2 = showCols.map((showCol) => {
      if (showCol.name === col) {
        return {
          ...showCol,
          show: e.target.checked,
        };
      } else {
        return showCol;
      }
    });
    setShowCols(tempCols2);
    localStorage.setItem(SHOW_COLS, JSON.stringify(tempCols2));
  };
  const handleOpen = (device) => {
    setOpen(true);
    setSelected(device);
  };
  const handleClose = () => setOpen(false);
  const history = useNavigate();
  console.log(devices);
  return (
    <Box sx={{ mt: 2 }}>
      <Container maxWidth="xl">
        <Box>
          <Accordion>
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>Вкладки таблицы</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {cols.length !== 0 &&
                  cols.map((col, index) => (
                    <FormControlLabel
                      sx={{ backgroundColor: "#ddd", pr: "5px", mb: "5px" }}
                      key={index}
                      control={
                        <Checkbox
                          sx={{
                            color: "",
                            "&.Mui-checked": {
                              color: "black",
                            },
                            padding: "3px",
                          }}
                          size="small"
                          checked={
                            showCols &&
                            showCols.find((showCol) => showCol.name === col)
                              ?.show
                          }
                          onChange={(e) => handleChecked(e, col)}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label={columns[col]}
                    />
                  ))}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <Typography>Фильтр</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography></Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "16px",
          }}
        >
          <Typography>{totalElements} ta</Typography>
          {totalElements.length > 10 && (
            <Pagination
              page={currentPage}
              onChange={(e, v) => handlePaginationChange(v)}
              className="pagination"
              count={Math.ceil(totalElements / PGNTN_LIMIT)}
              variant="outlined"
              shape="rounded"
            />
          )}
        </Box>
        {isFetching ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress size={100} />
          </Box>
        ) : (
          <div className="custom-table">
            <table>
              <thead>
                <tr>
                  {showCols &&
                    showCols
                      .filter((showCol) => showCol.show)
                      .map((col) => (
                        <th
                          id={col.name}
                          key={col.name}
                          draggable
                          onDragStart={handleDragStart}
                          onDragOver={handleDragOver}
                          onDrop={handleOnDrop}
                          onDragEnter={handleDragEnter}
                          dragover={col.name === dragOver ? true : false}
                        >
                          {columns[col.name]}
                        </th>
                      ))}
                </tr>
              </thead>
              <tbody>
                {devices.length !== 0 &&
                  devices.map((row) => (
                    <tr key={row.id} onClick={() => handleOpen(row)}>
                      {showCols &&
                        showCols
                          .filter((col) => col.show)
                          .map((showCol) => (
                            <td
                              key={showCol.id}
                              dragover={
                                showCol.name === dragOver ? true : false
                              }
                            >
                              {row[showCol.name]}
                            </td>
                          ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </Container>
      <Dialog
        open={open}
        scroll="paper"
        fullScreen
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        className="device-modal"
      >
        <DialogTitle id="scroll-dialog-title" sx={{ p: 2 }}>
          Серийный номер счетчика: {selected.communication_number}
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
                <Typography>{columns[device_property]}</Typography>
                <Typography>{selected[device_property]}</Typography>
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
            onClick={() => editDevice()}
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
            onClick={() => history(`/devices/${selected.id}`)}
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
      <EditDeviceFormDialog
        editDialog={editDialog}
        saveDevice={saveDevice}
        cancelEdit={cancelEdit}
        data={selected}
      />
    </Box>
  );
};

export default CustomTable;
