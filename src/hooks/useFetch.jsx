import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utilities/api";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading("loading....");
    setData(null);
    setError(null);

    fetchDataFromApi(url)
      .then((res) => {
        setIsLoading(false);
        setData(res);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
