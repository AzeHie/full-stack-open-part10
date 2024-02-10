import { useMutation, useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../../graphql/queries';
import { FlatList, View, Alert } from 'react-native';
import Text from '../Text';
import { globalStyles } from '../../utils/styles';
import ItemSeparator from '../ItemSeparator';
import ReviewItem from './ReviewItem';
import { useNavigation } from '@react-navigation/native';
import { DELETE_REVIEW } from '../../graphql/mutations';

const MyReviews = () => {
  const navigation = useNavigation();
  const { data, refetch } = useQuery(GET_CURRENT_USER, {variables: {
    includeReviews: true
  }}); 
  const [deleteReview] = useMutation(DELETE_REVIEW);

  if (!data) {
    return <View><Text>Loading..</Text></View>
  }

  const mappedReviews = data.me.reviews.edges.map((edge) => edge.node);

  const handleOpenPress = (repositoryId) => {
    navigation.navigate('SingleRepositoryView', { repositoryId });
  };

  const handleDeletePress = (reviewId) => {
    Alert.alert('Delete review?', 'Are you sure you want to delete this review?', [
      {
        text: 'CANCEL',
      onPress: () => {},
      style: 'cancel'
      },
      {
        text: 'DELETE', onPress: async () => 
        {
          try {
            const { data } = await deleteReview({
              variables: {
                reviewId
              }
            })
            if (data.deleteReview) {
              refetch();
            }
          } catch (err) {
            console.log('FAILED TO DELETE REVIEW: ', err);
          }
        }
      }
    ])
  };

  return (
    <FlatList 
      style={globalStyles.container}
      data={mappedReviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} isMyReview={true} onOpenPress={handleOpenPress} onDeletePress={handleDeletePress} />}
      keyExtractor={({ id }) => id}
    />
  )
};

export default MyReviews;