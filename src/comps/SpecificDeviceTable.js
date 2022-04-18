import React, { useState } from "react";
import usePaginationFetch from "./../hooks/usePaginationFetch";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import useTableColumnOrder from "./../hooks/useTableColumnOrder";
import Pagination from "@mui/material/Pagination";
import { Card } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { PGNTN_LIMIT } from "../const";

const SpecificDeviceTable = (props) => {
  const columnsName = props.columns;
  const cols = Object.keys(columnsName).map((col, idx) => {
    return { id: idx, name: col };
  });

  const [pageSize, setPageSize] = useState(10);
  const [query, setQuery] = useState({
    ...props.query,
  });
  const [
    showCols,
    ,
    dragOver,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleOnDrop,
  ] = useTableColumnOrder(cols);

  const [data, currentPage, totalElements, isFetching, handlePagination] =
    usePaginationFetch(props.url,  );

  const getPageSize = (e) => {
    setPageSize(e.target.value);
    setQuery({ ...query, page_size: e.target.value });
  };
  return (
    <Box>
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <FormControl size="small" sx={{ mr: 1 }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pageSize}
                onChange={getPageSize}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={40}>40</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
            {totalElements > PGNTN_LIMIT && (
              <Pagination
                page={currentPage}
                onChange={(e, v) => handlePagination(v)}
                className="pagination"
                count={Math.ceil(totalElements / PGNTN_LIMIT)}
                variant="outlined"
                shape="rounded"
              />
            )}{" "}
          </Box>
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
                {showCols.map((col) => (
                  <th
                    id={col.name}
                    key={col.name}
                    draggable
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={handleOnDrop}
                    onDragEnter={handleDragEnter}
                    dragover={col === dragOver ? "true" : "false"}
                  >
                    {columnsName[col.name]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length !== 0 &&
                data.map((row) => (
                  <tr key={row.id}>
                    {showCols &&
                      showCols.map((showCol) => (
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
    </Box>
  );
};

export default SpecificDeviceTable;
