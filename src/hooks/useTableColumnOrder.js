import { useState } from "react";
import { SHOW_COLS } from "../const";

const useTableColumnOrder = (loc_cols) => {
  const [showCols, setShowCols] = useState(loc_cols);

  const [dragOver, setDragOver] = useState("");

  const handleDragStart = (e) => {
    const { id } = e.target;
    const idx = showCols.findIndex((col) => col.name === id);
    e.dataTransfer.setData("colIdx", idx);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDragEnter = (e) => {
    const { id } = e.target;
    setDragOver(id);
  };

  const handleOnDrop = (e) => {
    const { id } = e.target;
    const droppedColIdx = showCols.findIndex((col) => col.name === id);
    const draggedColIdx = e.dataTransfer.getData("colIdx");
    const tempCols = [...showCols];

    tempCols[draggedColIdx] = showCols[droppedColIdx];
    tempCols[droppedColIdx] = showCols[draggedColIdx];

    setShowCols(tempCols);
    localStorage.setItem(SHOW_COLS, JSON.stringify(tempCols));
    setDragOver("");
  };
  return [
    showCols,
    setShowCols,
    dragOver,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleOnDrop,
  ];
};

export default useTableColumnOrder;
