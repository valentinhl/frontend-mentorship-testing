import React, { useState } from 'react';
import { omit } from 'lodash';
import { FormValueListType } from '../components/models';

interface UseFormProps {
  callback: (event: React.FormEvent<HTMLFormElement>) => void;
  defaultValues?: FormValueListType;
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
  handleChange: React.ChangeEventHandler;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

const useForm = ({
  callback,
  defaultValues
}: UseFormProps): UseFormReturnValue => {
  const [values, setValues] = useState(defaultValues ? defaultValues : {});
  const [errors, setErrors] = useState({});

  const validate = (
    event: React.ChangeEvent<HTMLFormElement>,
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

  const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.persist();

    const name = event.target.name;
    const val = event.target.value;

    validate(event, name, val);

    setValues({
      ...values,
      [name]: val
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
    handleChange,
    handleSubmit
  };
};

export default useForm;
