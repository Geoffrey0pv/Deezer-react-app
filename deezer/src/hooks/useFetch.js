import { useState, useEffect, useCallback } from 'react';


export default function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    fetcher()
      .then(response => {
        setData(response);
      })
      .catch(err => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fetcher]);

  useEffect(() => {
    reload();
  }, [reload, ...deps]);

  return { data, loading, error, reload };
}
