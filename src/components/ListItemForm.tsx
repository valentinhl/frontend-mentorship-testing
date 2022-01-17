import { FC } from 'react';
import { ListItemType } from './models';
import { v4 as uuidv4 } from 'uuid';
import {
  descriptionLabel,
  submitButtonText,
  titleLabel
} from './ListItemUIText';

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

  return (
    <form onSubmit={event => submitForm(event)} aria-label='form'>
      <br /> <br />
      <label htmlFor='title'>{titleLabel}</label>
      <input id='title' name='title' />
      <br /> <br />
      <label htmlFor='description'>{descriptionLabel}</label>
      <textarea id='description' name='description' />
      <br /> <br />
      <button disabled={isSubmitDisabled}>{submitButtonText}</button>
    </form>
  );
};

export default ListItemForm;
