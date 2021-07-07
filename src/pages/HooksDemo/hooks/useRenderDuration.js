import { useCallback, useEffect, useState } from 'react';

const useRenderDuration = () => {
  const [date] = useState(new Date());
  const [renderDuration, setRenderDuration] = useState(0);

  const updateRenderDuration = useCallback(() => {
    setRenderDuration(Math.floor((new Date() - date) / 1000));
  }, [date]);

  useEffect(() => {
    // console.log('useEffect called');
    updateRenderDuration();
    const id = setInterval(() => {
      updateRenderDuration();
    }, 1000);
    // console.log(`initialized new interval with id ${id}`);
    return () => {
      clearInterval(id);
      // console.log(`cleared old interval with id ${id}`);
    };
  }, [date, updateRenderDuration]);
  return renderDuration;
};

export default useRenderDuration;
