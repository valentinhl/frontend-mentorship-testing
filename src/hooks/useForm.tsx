import { useState } from 'react';
import { omit } from 'lodash';

interface UseFormProps {
  callback: (event: React.FormEvent<HTMLFormElement>) => void;
}

interface UseFormReturnValue {
  values: {
    title?: string;
    description?: string;
  };
  errors: {
    title?: string;
    description?: string;
  };
  handleChange: (event: any) => void;
}

const useForm = ({ callback }: UseFormProps): UseFormReturnValue => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const validate = (
    event: React.FormEvent<HTMLFormElement>,
    name: string,
    value: string
  ) => {
    switch (name) {
      case 'title':
        if (!value.length) {
          setErrors({
            ...errors,
            title: 'Title must be entered'
          });
        } else {
          const newObj = omit(errors, 'title');
          setErrors(newObj);
        }
        break;

      case 'description':
        if (!value.length) {
          setErrors({
            ...errors,
            description: 'Description must be entered'
          });
        } else {
          const newObj = omit(errors, 'description');
          setErrors(newObj);
        }
        break;

      default:
        break;
    }
  };

  const handleChange = (event: any) => {
    event.persist();

    const name = event.target.name;
    const val = event.target.value;

    validate(event, name, val);

    setValues({
      ...values,
      [name]: val
    });
  };

  const handleSubmit = (event: any) => {
    if (event) event.preventDefault();

    if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
      callback(event);
    } else {
      alert('There is an Error!');
    }
  };

  return {
    values,
    errors,
    handleChange
  };
};

export default useForm;
