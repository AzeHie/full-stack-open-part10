import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_REPOSITORY_BY_ID } from '../graphql/queries';

const useSingleRepository = (id) => {
  const [repositoryInfo, setRepositoryInfo] = useState();

  const { data, error } = useQuery(GET_REPOSITORY_BY_ID, {
    variables: { id: id }
  });

  if (error) {
    console.log('GraphQl error: ', error);
  }

  useEffect(() => {
    if (data) {
      setRepositoryInfo(data.repository);
    }
  }, [data]);

  return { repositoryInfo };
};

export default useSingleRepository;