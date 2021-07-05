import FormikFormControl from './FormikFormControl';

const FormikTextareaField = ({ rows, ...rest }) => {
  return <FormikFormControl {...rest} as="textarea" rows={rows} />;
};

export default FormikTextareaField;
