import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ErrorMessage, FieldArray, useFormikContext } from 'formik';
import { Button, Form, InputGroup } from 'react-bootstrap';
import FormikFormControl from './FormikFormControl';
import FieldError from './FieldError';

const FormikInputArray = ({
  name,
  label,
  formControlProps = {},
  addItemButtonLabel = '+ Add',
}) => {
  const { values } = useFormikContext();

  const array = values[name];
  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => (
        <Form.Group>
          <Form.Label>{label}</Form.Label>
          {Array.isArray(array) && array.length > 0
            ? array.map((image, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Form.Group key={index} className="mb-3">
                  <InputGroup>
                    <FormikFormControl
                      name={`${name}.${index}`}
                      required
                      hideError
                      {...formControlProps}
                    />
                    <InputGroup.Append>
                      <Button
                        variant="outline-danger"
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                  <ErrorMessage
                    name={`${name}.${index}`}
                    component={FieldError}
                  />
                </Form.Group>
              ))
            : null}
          <div>
            <Button type="button" onClick={() => arrayHelpers.push('')}>
              {addItemButtonLabel}
            </Button>
          </div>
        </Form.Group>
      )}
    />
  );
};

export default FormikInputArray;
