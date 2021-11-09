import { FC } from 'react';
import { ListItemType } from './models';
import { v4 as uuidv4 } from 'uuid';

interface ListItemFormProps {
  onSubmit: (newValue: ListItemType) => void;
}

interface FormData {
  title: { value: string };
  description: { value: string };
}

const ListItemForm: FC<ListItemFormProps> = ({ onSubmit }): JSX.Element => {
  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { title, description } = event.target as typeof event.target &
      FormData;

    onSubmit({
      id: uuidv4(),
      title: title.value,
      description: description.value
    });
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
