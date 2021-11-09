import { FC } from 'react';
import { ListItemType } from './models';

interface ListItemFormProps {
  onSubmit: (newValue: ListItemType) => void;
}

const ListItemForm: FC<ListItemFormProps> = ({ onSubmit }) => {
  const submitForm = (event: any) => {
    event.preventDefault();

    const { title, description } = event.target.elements;

    onSubmit({ title: title.value, description: description.value });
  };

  return (
    <form onSubmit={event => submitForm(event)}>
      <br /> <br />
      <label htmlFor='title'>Title: </label>
      <input id='title' />
      <br /> <br />
      <label htmlFor='description'>Description: </label>
      <textarea id='description' />
      <br /> <br />
      <button>SUBMIT</button>
    </form>
  );
};

export default ListItemForm;
