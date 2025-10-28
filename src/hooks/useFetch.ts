import { useEffect, useState } from "react";

const useFetch = (url: string, params: { order: string } | null) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          params ? `${url}?sortBy=name&order=${params.order}` : url
        );
        console.log(response);
        const result = await response.json();
        setData(result.recipes);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, params]);
  return { loading, data, error };
};

export default useFetch;
