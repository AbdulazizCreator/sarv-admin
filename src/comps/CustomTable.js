import React, { useState } from "react";
import getData from "./data";
import '../style/CustomTable.css'

const { columns, data } = getData();

const CustomTable = () => {
  const [cols, setCols] = useState(columns);
  const [rows] = useState(data);
  const [dragOver, setDragOver] = useState("");
  console.log(columns);
  console.log(data);
  const handleDragStart = (e) => {
    const { id } = e.target;
    const idx = cols.indexOf(id);
    e.dataTransfer.setData("colIdx", idx);
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDragEnter = (e) => {
    const { id } = e.target;
    setDragOver(id);
  };

  const handleOnDrop = (e) => {
    const { id } = e.target;
    const droppedColIdx = cols.indexOf(id);
    const draggedColIdx = e.dataTransfer.getData("colIdx");
    const tempCols = [...cols];

    tempCols[draggedColIdx] = cols[droppedColIdx];
    tempCols[droppedColIdx] = cols[draggedColIdx];
    setCols(tempCols);
    setDragOver("");
  };

  return (
    <div className="custom-table">
      <table>
        <thead>
          <tr>
            {cols.map((col) => (
              <th
                id={col}
                key={col}
                draggable
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleOnDrop}
                onDragEnter={handleDragEnter}
                dragOver={col === dragOver}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {Object.entries(row).map(([k, v], idx) => (
                <td key={v} dragOver={cols[idx] === dragOver}>
                  {row[cols[idx]]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
