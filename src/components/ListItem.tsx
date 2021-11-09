import { ListItemType } from './models';

export interface ListItemProps {
  item: ListItemType;
}

const ListItem = ({
  item: { title, description }
}: ListItemProps): JSX.Element => {
  return (
    <article>
      <header>
        <h1>{title}</h1>
      </header>
      <div>
        <p>{description}</p>
      </div>
    </article>
  );
};

export default ListItem;
