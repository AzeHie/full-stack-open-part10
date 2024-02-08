import { Image, StyleSheet, View } from 'react-native';

import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    zIndex: -1
  },
  detailView: {
    flexDirection: 'row',
  },
  infoView: {
    marginLeft: 10,
    flexDirection: 'column',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  description: {
    fontStyle: 'italic',
    paddingBottom: 5,
    marginRight: 50,
  },
  avatar: {
    width: 50,
    height: 50,
  },
  language: {
    backgroundColor: '#3548f2',
    width: 'auto',
    alignSelf: 'flex-start',
    padding: 5,
    color: '#FFFFFF',
  },
  extraInfoView: {
    marginTop: 10,
    marginLeft: 25,
    marginRight: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stars: {
    alignItems: 'center',
  },
  forks: {
    alignItems: 'center',
  },
  reviews: {
    alignItems: 'center',
  },
  rating: {
    alignItems: 'center',
    marginBottom: 5,
  },
  count: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});

const formatData = (count) => {
  if (count >= 1000) {
    const formatted = (count / 1000).toFixed(1);
    return formatted.endsWith('.0')
      ? `${formatted.slice(0, -2)}k`
      : `${formatted}k`;
  }
  return count.toString();
};

const RepositoryItem = ({ repositoryItem }) => {
  const updatedRepositoryItem = {
    ...repositoryItem,
    stargazersCount: formatData(repositoryItem.stargazersCount),
    forksCount: formatData(repositoryItem.forksCount)
  };

  return (
    <View testID='repositoryItem' style={styles.container}>
      <View style={styles.detailView}>
        <Image
          style={styles.avatar}
          source={{ uri: updatedRepositoryItem.ownerAvatarUrl }}
        />
        <View style={styles.infoView}>
          <Text style={styles.name}>{updatedRepositoryItem.fullName}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {updatedRepositoryItem.description}
          </Text>
          <Text style={styles.language}>{updatedRepositoryItem.language}</Text>
        </View>
      </View>
      <View style={styles.extraInfoView}>
        <View style={styles.stars}>
          <Text style={styles.count}>
            {updatedRepositoryItem.stargazersCount}
          </Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.forks}>
          <Text style={styles.count}>{updatedRepositoryItem.forksCount}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.reviews}>
          <Text style={styles.count}>{updatedRepositoryItem.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.rating}>
          <Text style={styles.count}>
            {' '}
            {updatedRepositoryItem.ratingAverage}
          </Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
