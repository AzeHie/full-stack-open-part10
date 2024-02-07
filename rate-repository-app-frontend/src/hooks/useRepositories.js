import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy) => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  let queryVariables;
  if (orderBy === 'RATING_AVERAGE_DESC') {
    queryVariables = {
      orderBy: orderBy.slice(0, -5),
      orderDirection: orderBy.slice(-4),
    };
  } else if (orderBy === 'RATING_AVERAGE_ASC') {
    queryVariables = {
      orderBy: orderBy.slice(0, -4),
      orderDirection: orderBy.slice(-3),
    };
  } else {
    queryVariables = {
      orderBy,
    };
  }

  console.log('USEREPOS: ', queryVariables);

  const {
    data,
    loading: queryLoading,
    refetch,
  } = useQuery(GET_REPOSITORIES, {
    variables: orderBy ? queryVariables : null,
    fetchPolicy: 'cache-and-network',
  });

  const fetchRepositories = async () => {
    setLoading(queryLoading);

    try {
      setRepositories(data.repositories);
    } catch (error) {
      console.error('Error fetching repositories: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      fetchRepositories();
    }
  }, []);

  return { repositories, loading, refetch };
};

export default useRepositories;
