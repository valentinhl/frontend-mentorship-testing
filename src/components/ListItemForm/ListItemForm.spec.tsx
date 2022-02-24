import { render, screen, cleanup, RenderResult } from '@testing-library/react';
import ListItemForm from './ListItemForm';
import { MOCK_STRING } from '../../testing/mockValues';
import { typeInputValue, clickButton } from '../../testing/utils';
import {
  submitButtonText,
  titleLabel
} from '../ListItemUIText';
import { ListItemType, ListFormOnChange, ListFormOnSubmit } from '../models';

const getMockId = () => 'id';

jest.mock('uuid', () => ({
  ...jest.requireActual('uuid'),
  v4: getMockId
}));

describe('ListItemForm.tsx', () => {
  const MOCK_ID = getMockId();
  const onSubmitMock = jest.fn() as jest.MockedFunction<ListFormOnSubmit>;
  const onChangeMock = jest.fn() as jest.MockedFunction<ListFormOnChange>;
  const formItemMock: ListItemType = {
    id: MOCK_ID,
    title: '',
    description: ''
  };
  let rerenderComponent: RenderResult['rerender'];

  beforeEach(() => {
    const { rerender } = render(
      <ListItemForm
        onSubmit={onSubmitMock}
        onChange={onChangeMock}
        formItem={formItemMock}
      />
    );
    rerenderComponent = rerender;
  });

  afterEach(() => {
    onSubmitMock.mockClear();
    cleanup();
  });

  it('renders the component successfully', () => {
    expect(screen.getByRole('form')).toMatchSnapshot();
  });

  it('submit is enabled by default', () => {
    expect(screen.getByText(submitButtonText)).toBeEnabled();
  });

  it('submit is enabled when isSubmitDisabled is passed', () => {
    rerenderComponent(
      <ListItemForm
        onSubmit={onSubmitMock}
        onChange={onChangeMock}
        formItem={formItemMock}
        isSubmitDisabled
      />
    );
    expect(screen.getByText(submitButtonText)).toBeDisabled();
  });

  it('submit is enabled when isSubmitDisabled is false', () => {
    rerenderComponent(
      <ListItemForm
        onSubmit={onSubmitMock}
        onChange={onChangeMock}
        formItem={formItemMock}
        isSubmitDisabled={false}
      />
    );
    expect(screen.getByText(submitButtonText)).toBeEnabled();
  });

  it('calls onChange prop when change event fires', () => {
    typeInputValue(screen, titleLabel, MOCK_STRING);
    expect(onChangeMock).toHaveBeenCalled();
  });

  it('calls onSubmit prop once when submit event fires', () => {
    clickButton(screen, submitButtonText);
    expect(onSubmitMock).toHaveBeenCalledTimes(1);
  });

  it('onSubmit receives object with right values', () => {
    rerenderComponent(
      <ListItemForm
        onSubmit={onSubmitMock}
        onChange={onChangeMock}
        formItem={{
          id: MOCK_ID,
          title: MOCK_STRING,
          description: MOCK_STRING
        }}
      />
    );

    clickButton(screen, submitButtonText);

    expect(onSubmitMock).toHaveBeenCalledWith({
      id: MOCK_ID,
      title: MOCK_STRING,
      description: MOCK_STRING
    });
  });
});
