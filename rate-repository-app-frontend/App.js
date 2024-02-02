import Main from './src/Main';
import RepositoryList from './src/components/RepositoryList';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './src/components/SignIn';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';
import RepositoryItem from './src/components/RepositoryItem';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name='Main' component={Main} />
              <Stack.Screen name='RepositoryList' component={RepositoryList} />
              <Stack.Screen
                name='RepositoryItem'
                component={RepositoryItem}
                initialParams={{ repositoryId: '', repositoryItem: {} }}
              />
              <Stack.Screen name='SignIn' component={SignIn} />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthStorageContext.Provider>
      </ApolloProvider>
  );
}
