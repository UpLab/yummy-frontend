/* eslint-disable react/jsx-props-no-spreading */
import { Button, Spinner } from 'react-bootstrap';

export default function ButtonWithLoading({
  loading,
  disabled,
  children,
  ...rest
}) {
  return (
    <Button {...rest} disabled={disabled || loading}>
      {loading ? (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      ) : null}{' '}
      {children}
    </Button>
  );
}
