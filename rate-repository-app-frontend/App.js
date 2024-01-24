import Main from './src/Main';
import RepositoryList from './src/components/RepositoryList';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './src/components/SignIn';
import createApolloClient from './src/utils/apolloClient';
import { ApolloProvider } from '@apollo/client';

const Stack = createNativeStackNavigator();

const apolloClient = createApolloClient();

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Main' component={Main} />
          <Stack.Screen name='RepositoryList' component={RepositoryList} />
          <Stack.Screen name='SignIn' component={SignIn} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
