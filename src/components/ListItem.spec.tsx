import { render } from '@testing-library/react';
import ListItem, { ListItemProps } from './ListItem';
import { ListItemType } from './models';

const renderComponent = ({ item: { title, description } }: ListItemProps) => {
  return render(<ListItem item={{ title, description }} />);
};

describe('ListItem.tsx', () => {
  const listItemMock: ListItemType = {
    title: 'TITLE MOCK2',
    description: 'DESCRIPTION MOCK'
  };
  it('renders the component successfully', () => {
    const { container } = renderComponent({ item: listItemMock });

    expect(container.firstChild).toMatchSnapshot();
  });
});
