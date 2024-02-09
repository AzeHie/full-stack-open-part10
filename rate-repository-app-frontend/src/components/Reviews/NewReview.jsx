import ReviewForm from './ReviewForm';
import useCreateReview from '../../hooks/useCreateReview';


const NewReview = () => {
  const [createNewReview] = useCreateReview();


  const onSubmit = async (values) => {
    try {
      await createNewReview(values);
    } catch (err) {
      console.log(err);
    }
  };

  return <ReviewForm onSubmit={onSubmit} />;
};

export default NewReview;
