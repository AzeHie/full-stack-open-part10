import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_REVIEWS } from '../graphql/queries';

const useReviews = (id) => {
  const [reviews, setReviews] = useState();

  const { data, error } = useQuery(GET_REVIEWS, {
    variables: { id: id},
    fetchPolicy: 'cache-and-network'
  });

  if (error) {
    console.log('GraphQl error: ', error);
  }

  useEffect(() => {
    if (data) {
      setReviews(data.repository);
    }
  }, [data]);

  return { reviews };
};

export default useReviews;