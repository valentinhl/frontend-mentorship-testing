import { render } from '@testing-library/react';
import ListItem, { ListItemProps } from './ListItem';
import { ListItemType } from './models';

const renderComponent = ({
  item: { id, title, description }
}: ListItemProps) => {
  return render(<ListItem item={{ id, title, description }} />);
};

describe('ListItem.tsx', () => {
  const listItemMock: ListItemType = {
    id: '342esafew-ewr23r2re-3rfdsr232r',
    title: 'TITLE MOCK2',
    description: 'DESCRIPTION MOCK'
  };
  it('renders the component successfully', () => {
    const { container } = renderComponent({ item: listItemMock });

    expect(container).toMatchSnapshot();
  });
});
