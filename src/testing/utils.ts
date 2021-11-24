import { Screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const notFoundElementByTestId = (testId: string) => {
  throw new Error(`Not found element with data-testid: ${testId}`);
};

export const submitForm = (screen: Screen, buttonTestId: string) => {
  const button = screen.queryByTestId(buttonTestId);
  if (button) {
    userEvent.click(button);
  } else {
    notFoundElementByTestId(buttonTestId);
  }
};

export const changeInputValue = (
  screen: Screen,
  inputTestId: string,
  value: string
) => {
  const input = screen.queryByTestId(inputTestId);
  if (input) {
    userEvent.type(input, value);
  } else {
    notFoundElementByTestId(inputTestId);
  }
};
