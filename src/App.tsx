import React, { useState, useEffect } from 'react';
import './App.css';
import { ListItemType } from './components/models';
import ListItemForm from './components/ListItemForm';
import ListItem from './components/ListItem';

const App = (): JSX.Element => {
  const [listItemValues, setListItemValues] = useState<ListItemType[]>([]);

  useEffect(() => {
    console.info(listItemValues);
  }, [listItemValues]);

  return (
    <div className='App'>
      <div>
        <ListItemForm
          onSubmit={(newValue: ListItemType) =>
            setListItemValues(values => [...values, newValue])
          }
        />
      </div>
      <div>
        {listItemValues.map(listItemValue => (
          <ListItem key={listItemValue.id} item={listItemValue} />
        ))}
      </div>
    </div>
  );
};

export default App;
