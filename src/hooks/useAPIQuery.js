import { useEffect, useState } from 'react';
import useAPIMethod from './useAPIMethod';

const useAPIQuery = ({ url, call, debugWaitMS }) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  const [fetch, isLoading] = useAPIMethod({
    method: 'get',
    url,
    onComplete: setData,
    onError: setError,
    debugWaitMS,
    call,
  });

  useEffect(() => {
    setError(null);
    fetch();
  }, [fetch]);

  return { data, isLoading, refetch: fetch, error };
};

export default useAPIQuery;
