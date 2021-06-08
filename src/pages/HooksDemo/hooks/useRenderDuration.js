import { useEffect, useState } from 'react';

const useRenderDuration = () => {
  const [date] = useState(new Date());
  const [renderDuration, setRenderDuration] = useState(0);

  useEffect(() => {
    function updateRenderDuration() {
      setRenderDuration(Math.floor((new Date() - date) / 1000));
    }
    // console.log('useEffect called');
    updateRenderDuration();
    const id = setInterval(() => {
      // console.log(`interval ${id}`);
      updateRenderDuration();
    }, 1000);
    // console.log(`initialized new interval with id ${id}`);
    return () => {
      clearInterval(id);
      // console.log(`cleared old interval with id ${id}`);
    };
  }, [date]);
  return renderDuration;
};

export default useRenderDuration;
