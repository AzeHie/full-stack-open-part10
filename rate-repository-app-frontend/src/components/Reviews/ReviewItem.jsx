import { StyleSheet, View } from 'react-native';
import { parseISO, format } from 'date-fns';
import Text from '../Text';
import { TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  reviewContainer: {
    flexDirection: 'row',
  },
  reviewRatingContainer: {
    marginRight: 5,
    justifyContent: 'center',
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  openButton: {
    backgroundColor: '#0d9dd1',
    marginRight: 4,
    padding: 15,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#d11a0d',
    marginLeft: 4,
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

const formatDate = (dateString) => {
  const date = parseISO(dateString);
  return format(date, 'dd.MM.yyyy');
};

const extractId = (id) => {
  const dotIndex = id.indexOf('.'); // find out the first dot
  const reviewId = id.substring(dotIndex + 1); // Extract from the index after the first dot
  return reviewId;
};

const ReviewItem = ({ review, isMyReview, onOpenPress, onDeletePress }) => {
  if (!review) {
    return null;
  }

  const updatedReview = {
    ...review,
    createdAt: formatDate(review.createdAt),
    repositoryId: extractId(review.id)
  };

  return (
    <View style={styles.container}>
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
      {isMyReview && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.openButton} onPress={() => onOpenPress(updatedReview.repositoryId)}>
            <Text style={styles.buttonText}>OPEN REPOSITORY</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={onDeletePress}>
            <Text style={styles.buttonText}>DELETE REVIEW</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
