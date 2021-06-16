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
  call,
  onComplete = noop,
  onError = noop,
  debugWaitMS,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const callbacksRef = useRef({
    onComplete,
    onError,
    call,
  });

  useEffect(() => {
    callbacksRef.current = {
      onComplete,
      onError,
      call,
    };
  }, [onComplete, onError, call]);

  const fn = useCallback(
    async (data) => {
      setIsLoading(true);
      if (debugWaitMS) await wait(debugWaitMS);
      try {
        if (typeof callbacksRef.current.call === 'function') {
          const result = await callbacksRef.current.call(data);
          await callbacksRef.current.onComplete(result);
          return result;
        }
        const result = await axios({
          method,
          url,
          data,
        });
        await callbacksRef.current.onComplete(result.data);
        return result.data;
      } catch (e) {
        const msg = e.message;
        callbacksRef.current.onError(msg, e);
        throw e;
      } finally {
        setIsLoading(false);
      }
    },
    [debugWaitMS, method, url]
  );

  return [fn, isLoading];
};

export default useAPIMethod;
