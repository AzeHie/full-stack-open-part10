import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Linking from 'expo-linking';

import Text from './Text';
import { useRoute } from '@react-navigation/native';
import SingleRepository from './SingleRepository';

const RepositoryItem = ({ repositoryItem }) => {
  const route = useRoute();
  
  let repositoryId;
  if (route.params) {
    repositoryId = route.params.repositoryId;
    
    if (!repositoryItem) {
      repositoryItem = route.params.repositoryItem;
    }
  }
  
  const singleRepositoryView = repositoryId ? true : false;

  const formatStars = (count) => {
    if (count >= 1000) {
      const formatted = (count / 1000).toFixed(1);
      return formatted.endsWith('.0')
        ? `${formatted.slice(0, -2)}k`
        : `${formatted}k`;
    }
    return count.toString();
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 5,
      paddingRight: 5
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

  repositoryItem.stargazersCount = formatStars(repositoryItem.stargazersCount);

  return (
    <View testID='repositoryItem' style={styles.container}>
      <View style={styles.detailView}>
        <Image
          style={styles.avatar}
          source={{ uri: repositoryItem.ownerAvatarUrl }}
        />
        <View style={styles.infoView}>
          <Text style={styles.name}>{repositoryItem.fullName}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {repositoryItem.description}
          </Text>
          <Text style={styles.language}>{repositoryItem.language}</Text>
        </View>
      </View>
      <View style={styles.extraInfoView}>
        <View style={styles.stars}>
          <Text style={styles.count}>{repositoryItem.stargazersCount}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.forks}>
          <Text style={styles.count}>{repositoryItem.forksCount}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.reviews}>
          <Text style={styles.count}>{repositoryItem.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.rating}>
          <Text style={styles.count}> {repositoryItem.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>
      {singleRepositoryView && (
        <TouchableOpacity style={styles.pressable} onPress={() => Linking.openURL(repositoryItem.url)}>
          <Text style={styles.pressableText}>OPEN IN GITHUB</Text>
        </TouchableOpacity>
      )}
      <SingleRepository id={repositoryId}/>
    </View>
  );
};

export default RepositoryItem;
