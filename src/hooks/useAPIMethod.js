/* eslint-disable no-nested-ternary */
import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';

const noop = () => {};

const wait = (timeout) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

const useAPIMethod = ({
  url,
  method = 'post',
  onComplete = noop,
  onError = noop,
  debugWaitMS,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const callbacksRef = useRef({
    onComplete,
    onError,
  });

  useEffect(() => {
    callbacksRef.current = {
      onComplete,
      onError,
    };
  }, [onComplete, onError]);

  const call = useCallback(
    async (data) => {
      setIsLoading(true);
      if (debugWaitMS) await wait(debugWaitMS);
      try {
        const result = await axios({
          method,
          url,
          data,
        });
        await callbacksRef.current.onComplete(result.data);
      } catch (e) {
        const msg = e.message;
        callbacksRef.current.onError(msg, e);
      } finally {
        setIsLoading(false);
      }
    },
    [debugWaitMS, method, url]
  );

  return [call, isLoading];
};

export default useAPIMethod;
