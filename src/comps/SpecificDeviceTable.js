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
  
  const [data, currentPage, dataNumber, isFetching, handlePagination] =
    usePaginationFetch(props.url, props.query, changes);

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
        {dataNumber.length > PGNTN_LIMIT && (
          <Pagination
            page={currentPage}
            onChange={(e, v) => handlePagination(v)}
            className="pagination"
            count={Math.ceil(dataNumber / PGNTN_LIMIT)}
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
