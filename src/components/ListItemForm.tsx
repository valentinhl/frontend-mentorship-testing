import { FC } from 'react';
import { ListItemType } from './models';
import { v4 as uuidv4 } from 'uuid';
import {
  TID_DESCRIPTION,
  TID_FORM,
  TID_SUBMIT,
  TID_TITLE
} from './ListItemTestId';

export type ListFormOnSubmit = (newValue: ListItemType) => void;

export interface ListItemFormProps {
  onSubmit: ListFormOnSubmit;
}

export interface ListItemFormData {
  title: { value: string };
  description: { value: string };
}

const ListItemForm: FC<ListItemFormProps> = ({ onSubmit }): JSX.Element => {
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
    <form onSubmit={event => submitForm(event)} data-testid={TID_FORM}>
      <br /> <br />
      <label htmlFor='title'>Title: </label>
      <input id='title' name='title' data-testid={TID_TITLE} />
      <br /> <br />
      <label htmlFor='description'>Description: </label>
      <textarea
        id='description'
        name='description'
        data-testid={TID_DESCRIPTION}
      />
      <br /> <br />
      <button data-testId={TID_SUBMIT}>SUBMIT</button>
    </form>
  );
};

export default ListItemForm;
