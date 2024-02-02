import {
  FlatList,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from './Text';
import useSingleRepository from '../hooks/useSingleRepository';
import ItemSeparator from './ItemSeparator';
import RepositoryItem from './RepositoryItem';
import { useRoute } from '@react-navigation/native';

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: '#3495eb',
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
  pressableText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});

const RepositoryInfo = (repository) => {
  // MILLÄ SAISIT SIIRRETTYÄ GITHUB NÄPPÄIMEN REPOSITORYITEMIN SISÄLLE CONDITIONALLY

  return (
    <View>
      <RepositoryItem repositoryItem={repository} />
      <TouchableOpacity
        style={styles.pressable}
        onPress={() => Linking.openURL(repository.url)}
      >
        <Text style={styles.pressableText}>OPEN IN GITHUB</Text>
      </TouchableOpacity>
    </View>
  );
};

const ReviewItem = ({ review }) => {
  return (
    <View>
      <Text>{review.createdAt}</Text>
    </View>
  );
};

const SingleRepository = () => {
  const route = useRoute();

  const id = route.params.repositoryId;
  const repository = route.params.repositoryItem;

  if (!id) {
    return null;
  }

  const { repositoryInfo } = useSingleRepository(id);

  if (!repositoryInfo) {
    return null;
  }

  const reviews = repositoryInfo.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => RepositoryInfo(repository)}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
    />
  );
};

export default SingleRepository;
