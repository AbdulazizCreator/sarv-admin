import { useEffect, useState } from "react";
import { getQuery } from "../api/common";
import { PGNTN_LIMIT } from "../const";

const usePaginationFetch = (url, query, changes, name) => {
  const [data, setData] = useState([]);

  const [page, setPage] = useState(+localStorage.getItem(name + "_page") || 1);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);

    getQuery(url, {
      p: localStorage.getItem(name + "_page") || 1,
      page_size: PGNTN_LIMIT,
      ...query,
    })
      .then((res) => {
        setData(res.data.results);
        setTotalElements(res.data.count);
      })
      .finally((err) => {
        setLoading(false);
      });
  }, [url, query, changes, name]);
  const handlePaginationChange = (page) => {
    setLoading(true);
    setPage(page);
    localStorage.setItem(name + "_page", page);
    getQuery(url, { p: page, page_size: PGNTN_LIMIT, ...query }).then((res) => {
      setData(res.data.results);
      setLoading(false);
    });
  };
  return [data, page, totalElements, loading, handlePaginationChange];
};

export default usePaginationFetch;
