import { render, screen } from '@testing-library/react';
import ListItem, { EditListItem, ListItemProps } from './ListItem';
import { ListItemType } from '../models';
import { clickButton } from '../../testing/utils';
import { editButtonText } from '../ListItemUIText';
import { MOCK_STRING } from '../../testing/mockValues';

const renderComponent = ({ item, editListItem }: ListItemProps) => {
  return render(<ListItem item={item} editListItem={editListItem} />);
};

describe('ListItem.tsx', () => {
  const MOCK_ID = 'mockId';
  const listItemMock: ListItemType = {
    id: MOCK_ID,
    title: MOCK_STRING,
    description: MOCK_STRING
  };
  const editListItemMock = jest.fn() as jest.MockedFunction<EditListItem>;

  beforeEach(() => {
    renderComponent({
      item: listItemMock,
      editListItem: editListItemMock
    });
  });

  it('renders the component successfully', () => {
    expect(document.body).toMatchSnapshot();
  });

  it('calls editListItem prop once when submit event fires', () => {
    clickButton(screen, editButtonText);
    expect(editListItemMock).toHaveBeenCalledTimes(1);
  });

  it('editListItem receives object with right values', () => {
    clickButton(screen, editButtonText);
    expect(editListItemMock).toHaveBeenCalledWith({
      id: MOCK_ID,
      title: MOCK_STRING,
      description: MOCK_STRING
    });
  });
});
