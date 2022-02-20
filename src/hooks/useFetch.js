import { useEffect, useState } from "react";
import { getData } from "../api/common";

const useFetch = (url) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getData(url)
      .then((res) => {
        setData(res.data);
      })
      .finally((err) => {
        setLoading(false);
      });
  }, [url]);

  return [data, loading];
};

export default useFetch;
