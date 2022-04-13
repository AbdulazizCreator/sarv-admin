import { useState } from "react";

const useTableColumnOrder = (
  loc_cols,
  isSavedToLocalStorage,
  show_cols_name
) => {
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
    let tempCols = [...showCols];
    // tempCols.splice(droppedColIdx, 1);
    // tempCols.splice(draggedColIdx + 1, 0, showCols[droppedColIdx]);
    tempCols[draggedColIdx] = showCols[droppedColIdx];
    tempCols[droppedColIdx] = showCols[draggedColIdx];

    setShowCols(tempCols);
    isSavedToLocalStorage &&
      localStorage.setItem(show_cols_name, JSON.stringify(tempCols));
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
