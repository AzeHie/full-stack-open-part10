import { Formik } from 'formik';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as yup from 'yup';
import FormikTextInput from '../FormikTextInput';
import Text from '../Text';

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .min(3, 'Owner name length has to be atleast 3 characters')
    .required('Owner name is required field'),
  repositoryName: yup
    .string()
    .min(3, 'Repository name has to be atleast 3 characters')
    .required('Repository name is a required field'),
  rating: yup
    .number()
    .required('Rating is a required field')
    .integer('Rating has to be a whole number')
    .min(0, 'Rating has to be a number between 0-100')
    .max(100, 'Rating has to be a number between 0-100'),
  review: yup.string(),
});

const ReviewForm = ({ onSubmit }) => {

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

  return (
    <View>
      <Formik
        initialValues={{
          ownerName: '',
          repositoryName: '',
          rating: '',
          review: '',
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <>
            <FormikTextInput name='ownerName' placeholder='OWNER NAME' />
            <FormikTextInput
              name='repositoryName'
              placeholder='REPOSITORY NAME'
            />
            <FormikTextInput
              name='rating'
              placeholder='RATING'
              keyboardType='numeric'
            />
            <FormikTextInput name='review' placeholder='REVIEW' multiline={true} numberOfLines={6}/>
            <TouchableOpacity style={styles.pressable} onPress={handleSubmit}>
              <Text style={styles.pressableText}>ADD REVIEW</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

export default ReviewForm;
