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
import { PGNTN_LIMIT } from "../const";
import usePaginationFetch from "./../hooks/usePaginationFetch";
import CircularProgress from "@mui/material/CircularProgress";
import { Card } from "@mui/material";
import useTableColumnOrder from "../hooks/useTableColumnOrder";
import lan from "../const/languages/lan";
import Filter from "./Filter";
import debounce from "lodash.debounce";

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

const columns = lan.deviceProperties.visible;
const cols = Object.keys(columns);

const CustomTable = (props) => {
  let loc_cols;
  if (JSON.parse(localStorage.getItem(props.show_cols_name))) {
    loc_cols = JSON.parse(localStorage.getItem(props.show_cols_name));
  } else {
    localStorage.setItem(
      props.show_cols_name,
      JSON.stringify(
        cols.map((col, idx) => {
          return { id: idx, name: col, show: true };
        })
      )
    );
    loc_cols = cols.map((col, idx) => {
      return { id: idx, name: col, show: true };
    });
  }
  const [query, setQuery] = useState(props.query);
  const [
    devices,
    currentPage,
    totalElements,
    isFetching,
    handlePaginationChange,
  ] = usePaginationFetch("api/device", query || {}, props.changes);

  const [
    showCols,
    setShowCols,
    dragOver,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleOnDrop,
  ] = useTableColumnOrder(loc_cols, true);

  const handleChecked = (e, col) => {
    console.log(e.target.checked);
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
    localStorage.setItem(props.show_cols_name, JSON.stringify(tempCols2));
  };
  const handleOpen = (device) => {
    props.setIsOpen(true);
    props.setSelected(device);
  };

  const getFilter = debounce((values) => {
    setQuery({ ...query, ...values });
  }, 500);
  console.log("CustomTable");
  return (
    <Container maxWidth="xl">
      <Box>
        <Accordion>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
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
                          showCols.find((showCol) => showCol.name === col).show
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
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Фильтр</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Filter getFilter={getFilter} />
          </AccordionDetails>
        </Accordion>
      </Box>
      <Card
        variant="outlined"
        sx={{
          mt: "16px",
          px: 2,
          py: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>{totalElements} ta</Typography>
          {totalElements > PGNTN_LIMIT && (
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
      </Card>
      {isFetching ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress size={100} />
        </Box>
      ) : (
        <div className="custom-table">
          <table>
            <thead>
              <tr>
                <th>№</th>
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
                        dragover={col.name === dragOver ? "true" : "false"}
                      >
                        {columns[col.name]}
                      </th>
                    ))}
              </tr>
            </thead>
            <tbody>
              {devices.length !== 0 &&
                devices.map((row, index) => (
                  <tr key={row.id} onClick={() => handleOpen(row)}>
                    <td>{PGNTN_LIMIT * (currentPage - 1) + index + 1}</td>
                    {showCols &&
                      showCols
                        .filter((col) => col.show)
                        .map((showCol) => (
                          <td
                            key={showCol.id}
                            dragover={
                              showCol.name === dragOver ? "true" : "false"
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
  );
};

export default CustomTable;
