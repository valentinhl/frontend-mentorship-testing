import { FC } from 'react';
import { ListItemType } from './models';
import { v4 as uuidv4 } from 'uuid';
import {
  descriptionLabel,
  submitButtonText,
  titleLabel
} from './ListItemUIText';
import './ListItemForm.css';
import useForm from '../hooks/useForm';

export type ListFormOnSubmit = (newValue: ListItemType) => void;

export interface ListItemFormProps {
  onSubmit: ListFormOnSubmit;
  isSubmitDisabled?: boolean;
}

export interface ListItemFormData {
  title: { value: string };
  description: { value: string };
}

const ListItemForm: FC<ListItemFormProps> = ({
  onSubmit,
  isSubmitDisabled = false
}): JSX.Element => {
  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { title, description } = (
      event.target as EventTarget & HTMLFormElement
    ).elements as HTMLFormControlsCollection & ListItemFormData;

    onSubmit({
      id: uuidv4(),
      title: title.value,
      description: description.value
    });
  };

  const { handleChange, values, errors } = useForm({ callback: submitForm });

  return (
    <form className='todo-creation-form' onSubmit={event => submitForm(event)}>
      <fieldset className='fieldset'>
        <label htmlFor='title'>{titleLabel}</label>
        <input
          className='input-field'
          id='title'
          name='title'
          onChange={handleChange}
        />
        {errors.title && <span className='error'>{errors.title}</span>}
      </fieldset>

      <fieldset className='fieldset'>
        <label htmlFor='description'>{descriptionLabel}</label>
        <textarea
          className='input-field'
          id='description'
          placeholder='Please enter a description here'
          name='description'
          onChange={handleChange}
        />
        {errors.description && (
          <span className='error'>{errors.description}</span>
        )}
      </fieldset>

      <button disabled={isSubmitDisabled}>{submitButtonText}</button>
    </form>
  );
};

export default ListItemForm;
