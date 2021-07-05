export default function FieldError({ children }) {
  return (
    <div className="text-danger">
      <small>{children}</small>
    </div>
  );
}
