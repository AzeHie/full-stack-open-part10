import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';

const { apollo_uri } = Constants.expoConfig.extra;

const httpLink = createHttpLink({
  uri: apollo_uri,
});

const createApolloClient = (authStorage) => {
  // create "middleware" link, where we add authorization token to every request (if it's defined)
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (error) {
      console.log(error);
      return {
        headers,
      };
    }
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(), // use inMemoryCache, if the same data is used again, new request is not necessary / done
  });
};

export default createApolloClient;
