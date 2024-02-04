import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_REPOSITORY_BY_ID } from '../graphql/queries';

const useSingleRepository = (id) => {
  const [repository, setRepository] = useState();

  const { data, error } = useQuery(GET_REPOSITORY_BY_ID, {
    variables: { repositoryId: id },
    fetchPolicy: 'cache-and-network'
  });

  if (error) {
    console.log('GraphQl error: ', error);
  }

  useEffect(() => {
    if (data) {
      setRepository(data.repository);
    }
  }, [data]);

  return { repository };
};

export default useSingleRepository;