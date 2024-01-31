import { CommonActions, useNavigation } from '@react-navigation/native';

import useSignIn from '../hooks/useSignIn';
import useRepositories from '../hooks/useRepositories';
import SignInForm from './SignInForm';

const SignIn = () => {
  const navigation = useNavigation();
  const [signIn] = useSignIn();
  const { refetch } = useRepositories();

  const onSubmit = async (values) => {
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

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
