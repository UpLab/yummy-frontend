import { useField } from 'formik';
import { FormControl } from 'react-bootstrap';
import FieldError from './FieldError';

export default function FormikFormControl({
  name,
  type,
  placeholder,
  required,
  hideError,
  ...rest
}) {
  const [field, meta] = useField(name);
  const { onChange, onBlur, value } = field;
  const { error, touched } = meta;
  return (
    <>
      <FormControl
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        {...rest}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        isInvalid={touched && error}
      />
      {touched && error && !hideError ? <FieldError>{error}</FieldError> : null}
    </>
  );
}
