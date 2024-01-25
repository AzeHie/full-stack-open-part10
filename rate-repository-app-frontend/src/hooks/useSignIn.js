import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';

const useSignIn = () => {
  const [UserSignIn] = useMutation(SIGN_IN);

  const signIn = async (username, password) => {
    try {
      const response = await UserSignIn({
        variables: {
          username: username,
          password: password,
        },
      });

      const token = response.data.authenticate.accessToken;
      return token;
    } catch (error) {
      console.log('Failed to sign in: ', error);
    }
  };
  return [signIn];
};

export default useSignIn;
