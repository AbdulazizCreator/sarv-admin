import React, { useState } from "react";
import usePaginationFetch from "./../hooks/usePaginationFetch";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import useTableColumnOrder from "./../hooks/useTableColumnOrder";
import Pagination from "@mui/material/Pagination";
import { PGNTN_LIMIT } from "../const";

const SpecificDeviceTable = (props) => {
  const columnsName = props.columns;
  const cols = Object.keys(columnsName).map((col, idx) => {
    return { id: idx, name: col };
  });

  const [changes] = useState(false);
  const [
    showCols,
    ,
    dragOver,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleOnDrop,
  ] = useTableColumnOrder(cols);
  const [
    hourlyData,
    hourlyCurrentPage,
    hourlyDataNumber,
    hourlyIsFetching,
    hourlyHandlePagination,
  ] = usePaginationFetch(props.url, props.query, changes);
  console.log(hourlyData);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: "16px",
        }}
      >
        {hourlyDataNumber.length > PGNTN_LIMIT && (
          <Pagination
            page={hourlyCurrentPage}
            onChange={(e, v) => hourlyHandlePagination(v)}
            className="pagination"
            count={Math.ceil(hourlyDataNumber / PGNTN_LIMIT)}
            variant="outlined"
            shape="rounded"
          />
        )}
      </Box>
      {hourlyIsFetching ? (
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
                    dragover={col === dragOver ? true : false}
                  >
                    {columnsName[col.name]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hourlyData.length !== 0 &&
                hourlyData.map((row) => (
                  <tr key={row.id}>
                    {showCols &&
                      showCols.map((showCol) => (
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
    </Box>
  );
};

export default SpecificDeviceTable;
