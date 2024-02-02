import { FlatList, View } from 'react-native';
import Text from './Text';
import useSingleRepository from '../hooks/useSingleRepository';
import ItemSeparator from './ItemSeparator';


const RepositoryInfo = () => {
  return <View><Text>Moikkeli</Text></View>
}

const ReviewItem = ({ review }) => {
  return <View>
    <Text>{review.createdAt}</Text>
  </View>
};

const SingleRepository = ({ id }) => {

  if (!id) {
    return null;
  }

  const { repository } = useSingleRepository(id);

  if (!repository) {
    return null;
  }

  const reviews = repository.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList 
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={RepositoryInfo}
      renderItem={({ item }) => <ReviewItem review={item} /> }
      keyExtractor={({ id }) => id }
    />
  );
};

export default SingleRepository;
