import { useEffect, useState } from "react";
import { getAllDataWithPagination } from "../api/common";

const usePaginationFetch = (url, changes = []) => {
  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getAllDataWithPagination(url, 1)
      .then((res) => {
        setData(res.data.results);
        setTotalElements(res.data.count);
      })
      .finally((err) => {
        setLoading(false);
      });
  }, [url]);
  const handlePaginationChange = (page) => {
    setLoading(true);
    setPage(page);
    getAllDataWithPagination(url, page).then((res) => {
      setData(res.data.results);
      setLoading(false);
    });
  };
  return [data, page, totalElements, loading, handlePaginationChange];
};

export default usePaginationFetch;
