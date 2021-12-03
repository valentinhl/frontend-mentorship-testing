import { FC } from 'react';
import { ListItemType } from './models';
import { v4 as uuidv4 } from 'uuid';
import './ListItemForm.css';
import useForm from '../hooks/useForm';

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

  const { handleChange, values, errors } = useForm({ callback: submitForm });

  return (
    <form className='todo-creation-form' onSubmit={event => submitForm(event)}>
      <fieldset className='fieldset'>
        <label htmlFor='title'>Title</label>
        <input
          className='input-field'
          id='title'
          name='title'
          onChange={handleChange}
        />
        {errors.title && <span className='error'>{errors.title}</span>}
      </fieldset>

      <fieldset className='fieldset'>
        <label htmlFor='description'>Description </label>
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

      <button>SUBMIT</button>
    </form>
  );
};

export default ListItemForm;
