import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../../graphql/queries';
import { FlatList, View } from 'react-native';
import Text from '../Text';
import { globalStyles } from '../../utils/styles';
import ItemSeparator from '../ItemSeparator';
import ReviewItem from './ReviewItem';
import { useNavigation } from '@react-navigation/native';

const MyReviews = () => {
  const navigation = useNavigation();
  const { data } = useQuery(GET_CURRENT_USER, {variables: {
    includeReviews: true
  }}); 

  if (!data) {
    return <View><Text>Loading..</Text></View>
  }

  const mappedReviews = data.me.reviews.edges.map((edge) => edge.node);

  const handleOpenPress = (repositoryId) => {
    navigation.navigate('SingleRepositoryView', { repositoryId });
  };

  const handleDeletePress = () => {
    console.log('on delete press');
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