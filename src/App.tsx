import React, { useState, useEffect } from 'react';
import './App.css';
import { ListItemType } from './components/models';
import ListItemForm from './components/ListItemForm/ListItemForm';
import HorizontalNavbar from './components/HorizontalNavbar/HorizontalNavbar';
import List from './components/List/List';

type CreateEmptyFormItem = () => ListItemType;

const App = (): JSX.Element => {
  const createEmptyFormItem: CreateEmptyFormItem = () => ({
    id: '',
    title: '',
    description: ''
  });

  const [listItemValues, setListItemValues] = useState<ListItemType[]>([]);
  const [formItem, setFormItem] = useState<ListItemType>(createEmptyFormItem());

  useEffect(() => {
    console.info(listItemValues);
  }, [listItemValues]);

  const selectUpdateOrAdd = (newValue: ListItemType) => {
    const index = listItemValues.findIndex(
      listItem => listItem.id === newValue.id
    );
    if (index > -1) {
      return (values: ListItemType[]) => {
        const newList = values.slice();
        newList[index] = newValue;
        return newList;
      };
    } else {
      return (values: ListItemType[]) => [...values, newValue];
    }
  };

  const addToList = (newValue: ListItemType) => {
    if (newValue.id && newValue.title) {
      setListItemValues(selectUpdateOrAdd(newValue));
    }
  };

  const editListItem = (newValue: ListItemType) => {
    setFormItem(newValue);
  };

  return (
    <div className='App'>
      <HorizontalNavbar />
      <div className='page-container'>
        <ListItemForm
          formItem={formItem}
          onChange={(newValue: ListItemType) => editListItem(newValue)}
          onSubmit={(newValue: ListItemType) => addToList(newValue)}
        />
        {listItemValues.length ? (
          <List editListItem={editListItem} listItemValues={listItemValues} />
        ) : null}
      </div>
    </div>
  );
};

export default App;
