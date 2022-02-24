import { Screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const clickButton = (screen: Screen, buttonText: string) => {
  const button = screen.getByText(buttonText);
  userEvent.click(button);
};

export const typeInputValue = (
  screen: Screen,
  labelText: string,
  value: string
) => {
  const input = screen.getByLabelText(labelText);
  userEvent.type(input, value);
};
