import { useState, useEffect, useCallback } from 'react';

/**
 * useFetch
 * @param {Function} fetcher — función async que lanza la petición y devuelve data.
 * @param {Array} deps — lista de dependencias que triggerá la recarga.
 * @returns {{ data: any, loading: boolean, error: any, reload: Function }}
 */
export default function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoizamos la función de carga para poder llamarla desde UI (reload)
  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    fetcher()
      .then(response => {
        setData(response);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err);
        setLoading(false);
      });
  }, [fetcher]);

  // En el primer render (y cuando cambie alguna dep)
  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error, reload };
}
