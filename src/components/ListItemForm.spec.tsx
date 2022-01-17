import { render, screen, cleanup, RenderResult } from '@testing-library/react';
import ListItemForm, { ListFormOnSubmit } from './ListItemForm';
import { MOCK_STRING } from '../testing/mockValues';
import { changeInputValue, submitForm } from '../testing/utils';
import {
  descriptionLabel,
  submitButtonText,
  titleLabel
} from './ListItemUIText';

const getMockId = () => 'id';

jest.mock('uuid', () => ({
  ...jest.requireActual('uuid'),
  v4: getMockId
}));

describe('ListItemForm.tsx', () => {
  const MOCK_ID = getMockId();
  const onSubmitMock = jest.fn() as jest.MockedFunction<ListFormOnSubmit>;
  let container: HTMLElement;
  let rerenderComponent: RenderResult['rerender'];

  beforeEach(() => {
    const { rerender } = render(<ListItemForm onSubmit={onSubmitMock} />);
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
      <ListItemForm onSubmit={onSubmitMock} isSubmitDisabled />
    );
    expect(screen.getByText(submitButtonText)).toBeDisabled();
  });

  it('submit is enabled when isSubmitDisabled is false', () => {
    rerenderComponent(
      <ListItemForm onSubmit={onSubmitMock} isSubmitDisabled={false} />
    );
    expect(screen.getByText(submitButtonText)).toBeEnabled();
  });

  it('calls onSubmit prop once when submit event fires', () => {
    submitForm(screen, submitButtonText);
    expect(onSubmitMock).toHaveBeenCalledTimes(1);
  });

  it('onSubmit receives object with right values', () => {
    changeInputValue(screen, titleLabel, MOCK_STRING);
    changeInputValue(screen, descriptionLabel, MOCK_STRING);
    submitForm(screen, submitButtonText);

    expect(onSubmitMock).toHaveBeenCalledWith({
      id: MOCK_ID,
      title: MOCK_STRING,
      description: MOCK_STRING
    });
  });
});
