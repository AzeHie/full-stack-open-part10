import Main from './src/Main';
import RepositoryList from './src/components/Repository/RepositoryList';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';
import RepositoryItem from './src/components/Repository/RepositoryItem';
import SingleRepository from './src/components/Repository/SingleRepository';
import NewReview from './src/components/NewReview';
import Auth from './src/components/Auth/Auth';
import { Provider as PaperProvider } from 'react-native-paper';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthStorageContext.Provider value={authStorage}>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name='Main' component={Main} />
              <Stack.Screen name='RepositoryList' component={RepositoryList} />
              <Stack.Screen name='RepositoryItem' component={RepositoryItem} />
              <Stack.Screen
                name='SingleRepositoryView'
                component={SingleRepository}
                initialParams={{ repositoryId: '' }}
              />
              <Stack.Screen
                name='Auth'
                component={Auth}
                initialParams={{ signIn: true }}
              />
              <Stack.Screen name='NewReview' component={NewReview} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </AuthStorageContext.Provider>
    </ApolloProvider>
  );
}
