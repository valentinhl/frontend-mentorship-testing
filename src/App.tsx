import React, { useState, useEffect } from 'react';
import './App.css';
import { ListItemType } from './components/models';
import ListItemForm from './components/ListItemForm';
import ListItem from './components/ListItem';
import HorizontalNavbar from './components/HorizontalNavbar';

const App = (): JSX.Element => {
  const [listItemValues, setListItemValues] = useState<ListItemType[]>([]);

  useEffect(() => {
    console.info(listItemValues);
  }, [listItemValues]);

  return (
    <div className='App'>
      <HorizontalNavbar />
      <div className='form-container'>
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
