import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import useRepositories from '../hooks/useRepositories.js';
import { useNavigation } from '@react-navigation/native';

const useCreateReview = () => {
  const [CreateReview] = useMutation(CREATE_REVIEW);
  const { refetch } = useRepositories();
  const navigation = useNavigation();

  const createNewReview = async (values) => {
    const review = {
      ownerName: values.ownerName,
      repositoryName: values.repositoryName,
      rating: parseInt(values.rating),
      text: values.review,
    };

    try {
      const result = await CreateReview({
        variables: {
          review: review,
        },
      });

      const repositoryId = result.data.createReview.repositoryId;

      if (repositoryId) {
        await refetch();
        navigation.pop(1);
        navigation.navigate('SingleRepositoryView', { repositoryId });
      }
    } catch (err) {
      console.log('Failed to add new review: ', err);
    }
  };
  return [createNewReview];
};

export default useCreateReview;
