import { useApolloClient, useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
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
      await authStorage.setAccessToken(token);
      apolloClient.resetStore();
      return token;
    } catch (error) {
      console.log('Failed to sign in: ', error);
    }
  };
  return [signIn];
};

export default useSignIn;
