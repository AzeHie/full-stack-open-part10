import { FlatList, View, TouchableOpacity } from 'react-native';
import RepositoryItem from './RepositoryItem';
import Text from '../Text';
import ItemSeparator from '../ItemSeparator';
import RepositoryOrderSelection from './ReposityOrderSelection';
import RepositorySearch from './RepositorySearch';

const RepositoryListContainer = ({ repositories, onEndReach, onRepositoryItemPress, onOrderChange, orderBy, onSearchChange, searchKeyword }) => {
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
    <View>
      <RepositorySearch onSearchChange={onSearchChange} searchKeyword={searchKeyword} />
      <FlatList
        data={repositoryNodes}
        ListHeaderComponent={<RepositoryOrderSelection onOrderChange={onOrderChange} orderBy={orderBy} />}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default RepositoryListContainer;
