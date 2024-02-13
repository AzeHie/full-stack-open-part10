import { useQuery } from '@apollo/client';
import { GET_REPOSITORY_BY_ID } from '../graphql/queries';

const useSingleRepository = (id) => {

  const { data, error, queryLoading, fetchMore } = useQuery(
    GET_REPOSITORY_BY_ID,
    {
      variables: { repositoryId: id },
      fetchPolicy: 'cache-and-network',
    }
  );

  if (error) {
    console.log('GraphQl error: ', error);
  }

  const handleFetchMore = () => {
    const canFetchMore =
      !queryLoading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: { after: data.repository.reviews.pageInfo.endCursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        return {
          repository: {
            ...prevResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews, 
              edges: prevResult.repository.reviews.edges.concat(
                fetchMoreResult.repository.reviews.edges
              ),
              }
            }
          }
        }
      });
    };

  return { 
    repository: data ? data.repository : undefined, fetchMore: handleFetchMore 
  };
};

export default useSingleRepository;
