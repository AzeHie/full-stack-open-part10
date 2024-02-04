import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';

import useSignIn from '../../hooks/useSignIn';
import useRepositories from '../../hooks/useRepositories';
import AuthForm from './AuthForm';
import useSignUp from '../../hooks/useSignUp';

const Auth = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [signIn] = useSignIn();
  const [signUp] = useSignUp();
  const { refetch } = useRepositories();

  const isSignIn = route.params.signIn;

  const onSubmit = async (values) => {
    if (!isSignIn) {
      const username = await signUp(values.username, values.password);
      if (!username) {
        throw new Error('SIGN UP FAILED! CHECK YOUR CREDENTIALS AND TRY AGAIN');
      }
    }

    const token = await signIn(values.username, values.password);
    if (!token) {
      throw new Error('Sign in Failed! Check your credentials and try again.');
    }
    await refetch();
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'Main' }, { name: 'RepositoryList' }],
      })
    );
  };

  return <AuthForm onSubmit={onSubmit} isSignIn={isSignIn}/>;
};

export default Auth;
