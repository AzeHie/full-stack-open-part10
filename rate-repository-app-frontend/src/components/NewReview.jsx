import { CommonActions, useNavigation } from '@react-navigation/native';
import useRepositories from '../hooks/useRepositories';
import ReviewForm from './ReviewForm';
import useCreateReview from '../hooks/useCreateReview';

const NewReview = () => {
  const navigation = useNavigation();
  const [createNewReview] = useCreateReview();
  const { refetch } = useRepositories();

  const onSubmit = async (values) => {
    
    try {
      await createNewReview(values);
      await refetch();
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'main'} , {name: 'RepositoryList '}]
        })
      )
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ReviewForm onSubmit={onSubmit}/>
  );
};

export default NewReview;