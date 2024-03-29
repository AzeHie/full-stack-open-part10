import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FormikTextInput from '../FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from '../Text';

const AuthForm = ({ onSubmit, isSignIn }) => {
  const styles = StyleSheet.create({
    pressable: {
      backgroundColor: '#3495eb',
      padding: 5,
      margin: 5,
      borderRadius: 5,
    },
    pressableText: {
      fontSize: 20,
      color: 'white',
      textAlign: 'center',
    },
  });

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, 'Username length has to be atleast 3 characters')
      .max(30, 'Username can be max 50 characthers')
      .required('Username is required field'),
    password: yup
      .string()
      .min(5, 'Password length has to be atleast 5 characters')
      .max(50, 'Password can be max 50 characters')
      .required('Password is required'),
    confirmPassword: !isSignIn
      ? yup
          .string()
          .oneOf([yup.ref('password'), null], 'Passwords must match')
          .required('Password confirmation is required')
      : yup.string(),
  });

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
            <FormikTextInput
              name='password'
              placeholder='PASSWORD'
              secureTextEntry
            />
            {!isSignIn && (
              <FormikTextInput
                name='confirmPassword'
                placeholder='CONFIRM PASSWORD'
                secureTextEntry
              />
            )}
            <TouchableOpacity style={styles.pressable} onPress={handleSubmit}>
              <Text style={styles.pressableText}>Sign in</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

export default AuthForm;
