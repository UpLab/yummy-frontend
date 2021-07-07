/* eslint-disable import/prefer-default-export */
import { defaults, pick } from 'lodash';

export const prepareInitialValues = (initialValues, defaultValues) => {
  const merged = defaults(initialValues, defaultValues);
  const withFilteredKeys = pick(merged, Object.keys(defaultValues));
  return withFilteredKeys;
};
