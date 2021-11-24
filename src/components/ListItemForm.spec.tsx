import { render, screen, cleanup } from '@testing-library/react';
import ListItemForm, { ListFormOnSubmit } from './ListItemForm';
import {
  TID_DESCRIPTION,
  TID_FORM,
  TID_SUBMIT,
  TID_TITLE
} from './ListItemTestId';
import { MOCK_STRING } from '../testing/mockValues';
import { changeInputValue, submitForm } from '../testing/utils';
import userEvent from '@testing-library/user-event';

describe('ListItemForm.tsx', () => {
  const onSubmitMock = jest.fn() as jest.MockedFunction<ListFormOnSubmit>;
  let container: HTMLElement;

  beforeEach(() => {
    render(<ListItemForm onSubmit={onSubmitMock} />);
  });

  afterEach(() => {
    onSubmitMock.mockClear();
    cleanup();
  });

  it('renders the component successfully', () => {
    expect(screen.getByTestId(TID_FORM)).toMatchSnapshot();
  });

  it('calls onSubmit prop once when submit event fires', () => {
    submitForm(screen, TID_SUBMIT);
    expect(onSubmitMock).toHaveBeenCalledTimes(1);
  });

  it('onSubmit receives object with id property', () => {
    submitForm(screen, TID_SUBMIT);

    expect(onSubmitMock.mock.calls[0][0]).toHaveProperty('id');
  });

  it('onSubmit receives object with title property', () => {
    submitForm(screen, TID_SUBMIT);

    expect(onSubmitMock.mock.calls[0][0]).toHaveProperty('title');
  });

  it('onSubmit receives object with description property', () => {
    submitForm(screen, TID_SUBMIT);

    expect(onSubmitMock.mock.calls[0][0]).toHaveProperty('description');
  });

  it('onSubmit receives title input value', () => {
    //changeInputValue(screen,TID_TITLE, MOCK_STRING);
    userEvent.type(screen.getByTestId(TID_TITLE), MOCK_STRING);
    submitForm(screen, TID_SUBMIT);
    console.log(onSubmitMock.mock.calls[0][0]);

    expect(onSubmitMock.mock.calls[0][0].title).toEqual(MOCK_STRING);
  });

  it('onSubmit receives description input value', () => {
    changeInputValue(screen, TID_DESCRIPTION, MOCK_STRING);
    submitForm(screen, TID_SUBMIT);
    console.log(onSubmitMock.mock.calls[0][0]);
    expect(onSubmitMock.mock.calls[0][0].description).toEqual(MOCK_STRING);
  });
});
