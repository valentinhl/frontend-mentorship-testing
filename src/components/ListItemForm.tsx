import { FormEvent } from 'react';

const ListItemForm = () => {
  const submitForm = (event: FormEvent) => {
    event.preventDefault();

    console.info(event);
  };

  return (
    <form onSubmit={event => submitForm(event)}>
      <label htmlFor='title'>Label: </label>
      <input id='title' />

      <button>SUBMIT</button>
    </form>
  );
};

export default ListItemForm;
