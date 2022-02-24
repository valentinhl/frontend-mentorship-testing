import { CreateEmptyErrorList, ListItemFormErrorList } from '../models';

export const isRequired = (
  errors: ListItemFormErrorList,
  field: 'title' | 'description',
  value: string
): ListItemFormErrorList => {
  const allowedFields = ['title', 'description'];
  const newErrors = { ...errors };
  if (allowedFields.includes(field)) {
    const fieldError = !value.length ? `${field} must be entered` : '';
    newErrors[field] = fieldError;
  }
  return newErrors;
};

export const createEmptyErrorList: CreateEmptyErrorList = () => ({
  title: '',
  description: ''
});
