import { FlatList, View, TouchableOpacity } from 'react-native';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import ItemSeparator from './ItemSeparator';

const RepositoryListContainer = ({ repositories, onRepositoryItemPress }) => {
  if (!repositories) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  }

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onRepositoryItemPress(item.id, item)}>
      <RepositoryItem repositoryItem={item} />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
    />
  );
};

export default RepositoryListContainer;
