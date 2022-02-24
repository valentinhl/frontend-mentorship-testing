import React from 'react';
import ListItem, { EditListItem } from '../ListItem/ListItem';
import { ListItemType } from '../models';
import './List.css';

export interface ListProps {
  editListItem: EditListItem;
  listItemValues: ListItemType[];
}

const List = ({ editListItem, listItemValues }: ListProps): JSX.Element => (
  <div className='todo-list'>
    {listItemValues.map(listItemValue => (
      <ListItem
        key={listItemValue.id}
        item={listItemValue}
        editListItem={editListItem}
      />
    ))}
  </div>
);

export default List;
