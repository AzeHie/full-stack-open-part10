import { Text, Pressable, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';

const SignIn = () => {
  const navigation = useNavigation();

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

  const onSubmit = (values) => {
    console.log('username: ', values.username);
    console.log('password: ', values.password);

    navigation.navigate('RepositoryList'); 
  };

  return (
    <View>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={onSubmit}
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
