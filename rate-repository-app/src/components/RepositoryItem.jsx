import { Text, View } from 'react-native';

const RepositoryItem = ({ repositoryItem }) => {
  return (
    <View>
      <Text>Name: {repositoryItem.fullName}</Text>
      <Text>Description: {repositoryItem.description}</Text>
      <Text>Language: {repositoryItem.language}</Text>
      <Text>Stars: {repositoryItem.stargazersCount}</Text>
      <Text>Forks: {repositoryItem.forksCount}</Text>
      <Text>Reviews: {repositoryItem.reviewCount}</Text>
      <Text>Rating: {repositoryItem.ratingAverage} </Text>
    </View>
  )
};

export default RepositoryItem;