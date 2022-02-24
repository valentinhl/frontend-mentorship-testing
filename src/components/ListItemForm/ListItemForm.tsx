import { FC, useState } from 'react';
import {
  ListFormOnChange,
  ListFormOnSubmit,
  ListItemFormData,
  ListItemFormErrorList,
  ListItemType
} from '../models';
import { v4 as uuidv4 } from 'uuid';
import {
  addListItemForm,
  descriptionLabel,
  submitButtonText,
  titleLabel
} from '../ListItemUIText';
import './ListItemForm.css';
import { createEmptyErrorList, isRequired } from './utils';
export interface ListItemFormProps {
  formItem: ListItemType;
  onChange: ListFormOnChange;
  onSubmit: ListFormOnSubmit;
  isSubmitDisabled?: boolean;
}

const ListItemForm: FC<ListItemFormProps> = ({
  formItem,
  onChange,
  onSubmit,
  isSubmitDisabled = false
}): JSX.Element => {
  const [errors, setErrors] = useState<ListItemFormErrorList>(
    createEmptyErrorList()
  );

  const validate = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string,
    value: string
  ) => {
    setErrors(isRequired(errors, name as 'title' | 'description', value));
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.persist();

    const name = event.target.name;
    const val = event.target.value;

    validate(event, name, val);

    const newValue = { ...formItem };
    newValue[name] = val;

    onChange(newValue);
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { title, description } = (
      event.target as EventTarget & HTMLFormElement
    ).elements as HTMLFormControlsCollection & ListItemFormData;

    onSubmit({
      id: formItem.id ? formItem.id : uuidv4(),
      title: title.value,
      description: description.value
    });
  };

  return (
    <form
      name={addListItemForm}
      className='todo-creation-form'
      onSubmit={event => submitForm(event)}
    >
      <fieldset className='fieldset'>
        <label htmlFor='title'>{titleLabel}</label>
        <input
          className='input-field'
          id='title'
          name='title'
          onChange={handleChange}
          value={formItem.title}
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
          value={formItem.description}
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
