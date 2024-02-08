import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy, searchKeyword) => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  console.log('USEREPOS keyword: ', searchKeyword);
  console.log('USERREPOS orderBy: ', orderBy);
  let queryVariables = {};
  if (orderBy === 'RATING_AVERAGE_DESC') {
    queryVariables = {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'DESC',
    };
  } else if (orderBy === 'RATING_AVERAGE_ASC') {
    queryVariables = {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'ASC',
    };
  } else if (orderBy === 'CREATED_AT') {
    queryVariables = {
      orderBy, // CREATED_AT
    };
  }

  if (searchKeyword) {
    queryVariables = {
      ...queryVariables,
      searchKeyword,
    };
  }

  console.log('QUERYVARIABLES', queryVariables);

  const {
    data,
    loading: queryLoading,
    refetch,
  } = useQuery(GET_REPOSITORIES, {
    variables: queryVariables,
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
    console.log('fetching repos');
    if (data) {
      fetchRepositories();
    }
  }, [orderBy, searchKeyword]);

  return { repositories, loading, refetch };
};

export default useRepositories;
