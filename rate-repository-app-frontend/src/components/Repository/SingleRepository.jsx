import { useRoute } from '@react-navigation/native';
import {
  FlatList,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Text from '../Text';
import ItemSeparator from '../ItemSeparator';
import RepositoryItem from './RepositoryItem';
import { globalStyles } from '../../utils/styles';
import useSingleRepository from '../../hooks/useSingleRepository';
import ReviewItem from '../Reviews/ReviewItem';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  pressable: {
    backgroundColor: '#3495eb',
    padding: 5,
    margin: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  pressableText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  }
});

const RepositoryInfo = ({ repositoryItem }) => {
  return (
    <View style={styles.container}>
      <RepositoryItem repositoryItem={repositoryItem} />
      <View styles={styles.pressableContainer}>
        <TouchableOpacity
          style={styles.pressable}
          onPress={() => Linking.openURL(repositoryItem.url)}
        >
          <Text style={styles.pressableText}>OPEN IN GITHUB</Text>
        </TouchableOpacity>
      </View>
      <ItemSeparator />
    </View>
  );
};

const SingleRepository = () => {
  const route = useRoute();

  const id = route.params.repositoryId;

  if (!id) {
    return null;
  }

  const { repository, fetchMore } = useSingleRepository(id);

  if (!repository) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  }

  const mappedReviews = repository.reviews.edges.map((edge) => edge.node);

  const handleEndReach = () => {
    fetchMore();
  }

  return (
    <FlatList
      style={globalStyles.container}
      data={mappedReviews}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={<RepositoryInfo repositoryItem={repository} />}
      renderItem={({ item }) => <ReviewItem review={item} isMyReview={false}  />}
      keyExtractor={({ id }) => id}
      onEndReached={handleEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};
export default SingleRepository;
