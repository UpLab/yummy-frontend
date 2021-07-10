export default function PageTitle({ title, right }) {
  return (
    <div className="d-flex align-items-center justify-content-between mt-3 mb-3">
      <h1>{title}</h1>
      {right}
    </div>
  );
}
