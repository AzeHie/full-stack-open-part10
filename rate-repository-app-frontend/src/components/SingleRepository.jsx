import {
  FlatList,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { parseISO, format } from 'date-fns';

import Text from './Text';
import useSingleRepository from '../hooks/useSingleRepository';
import ItemSeparator from './ItemSeparator';
import RepositoryItem from './RepositoryItem';
import { useRoute } from '@react-navigation/native';
import { globalStyles } from '../utils/styles';

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
  },
  reviewContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  reviewRatingContainer: {
    marginRight: 5,
  },
  reviewRatingText: {
    padding: 10,
    fontSize: 20,
    color: 'blue',
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 100,
    textAlign: 'center',
    width: 60,
    height: 60,
    lineHeight: 40, // align text vertically (height - fontsize)
  },
  reviewTextContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  reviewText: {
    marginTop: 5,
    marginBottom: 5,
  },
  reviewUser: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  reviewDate: {},
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

const ReviewItem = ({ review }) => {
  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, 'dd.MM.yyyy');
  };

  const updatedReview = {
    ...review,
    createdAt: formatDate(review.createdAt),
  };

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewRatingContainer}>
        <Text style={styles.reviewRatingText}>{updatedReview.rating}</Text>
      </View>
      <View style={styles.reviewTextContainer}>
        <Text style={styles.reviewUser}>{updatedReview.user.username}</Text>
        <Text style={styles.reviewDate}>{updatedReview.createdAt}</Text>
        <Text style={styles.reviewText}>{updatedReview.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const route = useRoute();

  const id = route.params.repositoryId;
  const repositoryItem = route.params.repositoryItem;

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
      style={globalStyles.container}
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={<RepositoryInfo repositoryItem={repositoryItem} />}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
    />
  );
};

export default SingleRepository;
