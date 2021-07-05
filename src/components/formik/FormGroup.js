import { Form } from 'react-bootstrap';

const FormikFormGroup = ({ label, children }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      {children}
    </Form.Group>
  );
};

export default FormikFormGroup;
