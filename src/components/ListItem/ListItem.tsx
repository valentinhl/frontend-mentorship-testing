import { editButtonText } from '../ListItemUIText';
import { ListItemType } from '../models';
import './ListItem.css';

export type EditListItem = (item: ListItemType) => void;

export interface ListItemProps {
  item: ListItemType;
  editListItem: EditListItem;
}

const ListItem = ({ item, editListItem }: ListItemProps): JSX.Element => {
  return (
    <article className='todo-list-item'>
      <header>
        <h1>{item.title}</h1>
      </header>
      <div>
        <p>{item.description}</p>
      </div>
      <button onClick={() => editListItem(item)}>{editButtonText}</button>
    </article>
  );
};

export default ListItem;
