import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [CreateReview] = useMutation(CREATE_REVIEW);

  const createNewReview = async (values) => {
    try {
      await CreateReview({
        variables: {
          review: {
            ownerName: values.ownerName,
            repositoryName: values.repositoryName,
            rating: values.rating,
            text: values.review,
          },
        },
      });
    } catch (err) {
      console.log('Failed to add new review: ', err);
    }
  };
  return [createNewReview];
};

export default useCreateReview;
