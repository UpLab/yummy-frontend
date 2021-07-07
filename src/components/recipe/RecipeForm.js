import { Formik, Form as FormikForm } from 'formik';
import * as yup from 'yup';
import { useRef } from 'react';
import Button from '../common/Button';
import FormikFormControl from '../formik/FormikFormControl';
import FormikTextareaField from '../formik/FormikTextareaField';
import FormikInputArray from '../formik/FormikInputArray';
import FormGroup from '../formik/FormGroup';
import { prepareInitialValues } from '../../utils/form';

const defaultValues = {
  name: '',
  featuredImage: '',
  images: [],
  cookTimeMinutes: 1,
  servings: 1,
  notes: '',
  instructions: [],
  ingredients: [],
};

const COOK_TIME_MINUTES_MIN = 1;
const COOK_TIME_MINUTES_MAX = 24 * 60;
const SERVINGS_MIN = 1;
const SERVINGS_MAX = 50;

const schema = yup.object().shape({
  name: yup.string().label('Name').required().min(3).max(35),
  featuredImage: yup.string().label('Featured Image').url().required(),
  images: yup.array().of(yup.string().label('Image').url().required()),
  cookTimeMinutes: yup
    .number()
    .label('Cooking time')
    .integer()
    .min(COOK_TIME_MINUTES_MIN)
    .max(COOK_TIME_MINUTES_MAX),
  servings: yup
    .number()
    .label('Servings')
    .integer()
    .min(SERVINGS_MIN)
    .max(SERVINGS_MAX),
  notes: yup.string().label('Notes').max(2500),
  instructions: yup
    .array()
    .of(yup.string().label('Step instruction').required().min(5).max(2000)),
  ingredients: yup.array().of(
    yup.object().shape({
      value: yup.number().label('Value').required().max(1000000),
      title: yup.string().label('Ingredient name').required().max(100),
      unit: yup.string().label('Unit').required(),
    })
  ),
});

export default function RecipeForm({
  onSubmit,
  submitButtonTitle = 'Submit',
  initialValues = {},
}) {
  const initialValuesRef = useRef();
  if (!initialValuesRef.current) {
    initialValuesRef.current = prepareInitialValues(
      initialValues,
      defaultValues
    );
  }
  return (
    <Formik
      initialValues={initialValuesRef.current}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <FormikForm>
          <FormGroup label="Name">
            <FormikFormControl
              name="name"
              placeholder="Name of your recipe"
              required
            />
          </FormGroup>
          <FormGroup label="Featured Image URL">
            <FormikFormControl
              type="url"
              name="featuredImage"
              placeholder="https://website.com/image.png"
              required
            />
          </FormGroup>
          <FormikInputArray
            name="images"
            label="Images"
            formControlProps={{
              placeholder: 'https://website.com/image.png',
            }}
            addItemButtonLabel="+ Add image"
          />
          <FormGroup label="Cooking Time (min)">
            <FormikFormControl
              min={COOK_TIME_MINUTES_MIN}
              type="number"
              name="cookTimeMinutes"
              required
            />
          </FormGroup>
          <FormGroup label="Servings">
            <FormikFormControl
              type="number"
              name="servings"
              required
              min={SERVINGS_MIN}
            />
          </FormGroup>
          <FormikInputArray
            name="instructions"
            label="Instructions"
            addItemButtonLabel="+ Add step"
            formControlProps={{ as: 'textarea', rows: 4 }}
          />
          <FormGroup label="Notes">
            <FormikTextareaField name="notes" rows={6} />
          </FormGroup>
          <Button type="submit" loading={isSubmitting}>
            {submitButtonTitle}
          </Button>
        </FormikForm>
      )}
    </Formik>
  );
}

// TODO: add ingredients input

//   "ingredients": [
//     {
//       "value": 93,
//       "title": "ipsum qui sed",
//       "unit": "cup"
//     },
//     {
//       "value": 112,
//       "title": "sapiente quia aperiam",
//       "unit": "teaspoon"
//     },
//     {
//       "value": 11,
//       "title": "delectus animi sunt",
//       "unit": "ml"
//     },
//     {
//       "value": 85,
//       "title": "officiis sit voluptatem",
//       "unit": "cup"
//     },
//     {
//       "value": 105,
//       "title": "modi et odit",
//       "unit": "g"
//     }
//   ],
