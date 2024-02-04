import { useMutation } from '@apollo/client';
import { SIGN_UP } from '../graphql/mutations';

const useSignUp = () => {
  const [userSignUp] = useMutation(SIGN_UP);

  const signUp = async (username, password) => {
    try {
      const user = {
        username: username,
        password: password
      }

      const response = await userSignUp({
        variables: {
          user: user
        },
      });

      console.log('RESPONSE: ', response);

      const newUsername = response.data.createUser.username;

      return newUsername;
    } catch (error) {
      console.log('Failed to sign up: ', error);
    }
  };
  return [signUp];
};

export default useSignUp;