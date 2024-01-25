import { Pressable, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import useSignIn from '../hooks/useSignIn';
import AuthStorage from '../utils/authStorage';

const authStorage = new AuthStorage();

const validationSchema = yup.object().shape({
  username: yup.string().min(3, 'Username length has to be atleast 3 characters').required('Username is required field'),
  password: yup.string().min(5, 'Password length has to be atleast 5 characters').required('Password is required')
})

const SignIn = () => {
  const navigation = useNavigation();
  const [signIn] = useSignIn();

  const styles = StyleSheet.create({
    pressable: {
      backgroundColor: '#3495eb',
      padding: 5,
      margin: 5,
      borderRadius: 5
    },
    pressableText: {
      fontSize: 20,
      color: 'white',
      textAlign: 'center',
    }
  })

  const onSubmit = async (values) => {
    const token = await signIn(values.username, values.password);
    authStorage.setAccessToken(token);
    navigation.navigate('RepositoryList');
  };

  return (
    <View>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <>
            <FormikTextInput name='username' placeholder='USERNAME' />
            <FormikTextInput name='password' placeholder='PASSWORD' secureTextEntry />
            <Pressable style={styles.pressable} onPress={handleSubmit}>
              <Text style={styles.pressableText}>Sign in</Text>
            </Pressable>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;
