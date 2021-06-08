import useRenderDuration from '../hooks/useRenderDuration';

export default function Ticker() {
  // const date = new Date();
  const renderDuration = useRenderDuration();
  return (
    <div>
      Our component is rendered for {renderDuration} seconds
      {/* <Button onClick={() => setDate(new Date())}>Reset date</Button> */}
    </div>
  );
}
