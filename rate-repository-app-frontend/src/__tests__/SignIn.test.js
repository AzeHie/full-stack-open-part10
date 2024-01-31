import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import SignInForm from '../components/SignInForm';

describe('SignIn', () => {
  describe('SignInForm', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      render(<SignInForm onSubmit={onSubmit} />);

      fireEvent.changeText(screen.getByPlaceholderText('username'), 'Kalle');
      fireEvent.changeText(screen.getByPlaceholderText('password'), 'password');
      fireEvent.press(screen.getByText('submit'));

      await waitFor(() => {
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'Kalle',
          password: 'password',
        });
      });
    });
  });
});
