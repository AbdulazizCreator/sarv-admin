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

const CustomTable = () => {
  const cols = Object.keys(lan.tableColumns);
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
  const [changes] = useState(false);
  const [
    devices,
    currentPage,
    totalElements,
    isFetching,
    handlePaginationChange,
  ] = usePaginationFetch("device", [changes]);

  const [
    showCols,
    setShowCols,
    dragOver,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleOnDrop,
  ] = useTableColumnOrder(loc_cols);
  const [editDialog, cancelEdit, saveDevice, editDevice] = useEditDevice();
  const [deleteDialog, confirmDelete, cancelDelete, deleteDevice] =
    useDeleteDevice();
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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(showCols);
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
                {cols.map((col, index) => (
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
                          showCols.find((showCol) => showCol.name === col)?.show
                        }
                        onChange={(e) => handleChecked(e, col)}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label={col}
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
          <Pagination
            page={currentPage}
            onChange={(e, v) => handlePaginationChange(v)}
            className="pagination"
            count={Math.ceil(totalElements / PGNTN_LIMIT)}
            variant="outlined"
            shape="rounded"
          />
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
                  {showCols
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
                        {lan.tableColumns[col.name]}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {devices.map((row) => (
                  <tr key={row.id} onClick={handleOpen}>
                    {showCols
                      .filter((col) => col.show)
                      .map((showCol) => (
                        <td
                          key={showCol.id}
                          dragover={showCol.name === dragOver ? true : false}
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
          Salom
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 0 }}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem
              divider
              sx={{ my: 0, display: "flex", justifyContent: "space-between" }}
            >
              <Typography>Salom</Typography> <Typography>12.3</Typography>
            </ListItem>
            <ListItem
              divider
              sx={{ my: 0, display: "flex", justifyContent: "space-between" }}
            >
              <Typography>Salom</Typography> <Typography>12.3</Typography>
            </ListItem>
            <ListItem
              sx={{ my: 0, display: "flex", justifyContent: "space-between" }}
            >
              <Typography>Salom</Typography> <Typography>12.3</Typography>
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <LoadingButton
            loading={false}
            onClick={() => deleteDevice()}
            loadingPosition="start"
            startIcon={<DeleteIcon />}
            variant="contained"
            size="small"
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
            size="small"
          >
            <span className="access-name">Изменит</span>
          </LoadingButton>
          <LoadingButton
            loading={false}
            loadingPosition="start"
            startIcon={<SettingsOutlinedIcon />}
            variant="contained"
            size="small"
            color="warning"
          >
            <span className="access-name">Настройки</span>
          </LoadingButton>
          <LoadingButton
            loading={false}
            loadingPosition="start"
            startIcon={<ChevronRightOutlinedIcon />}
            variant="contained"
            size="small"
            color="secondary"
          >
            <span className="access-name">Данные</span>
          </LoadingButton>
          <LoadingButton
            loading={false}
            loadingPosition="start"
            startIcon={<DownloadingOutlinedIcon />}
            variant="contained"
            size="small"
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
      />
    </Box>
  );
};

export default CustomTable;
