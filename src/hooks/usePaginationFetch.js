import { useEffect, useState } from "react";
import { getQuery } from "../api/common";

const usePaginationFetch = (url, query, changes) => {
  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);

    getQuery(url, { p: 1, page_size: 10, ...query })
      .then((res) => {
        setData(res.data.results);
        setTotalElements(res.data.count);
      })
      .finally((err) => {
        setLoading(false);
      });
  }, [url, query, changes]);
  const handlePaginationChange = (page) => {
    setLoading(true);
    setPage(page);
    getQuery(url, { p: page, page_size: 10, ...query }).then((res) => {
      setData(res.data.results);
      setLoading(false);
    });
  };
  return [data, page, totalElements, loading, handlePaginationChange];
};

export default usePaginationFetch;
