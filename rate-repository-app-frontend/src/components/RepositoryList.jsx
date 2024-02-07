import { View } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import { globalStyles } from '../utils/styles';
import RepositoryListContainer from './RepositoryListContainer';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('');
  const { repositories } = useRepositories(orderBy);
  const navigation = useNavigation();

  const handleRepositoryItemPress = (repositoryId) => {
    navigation.navigate('SingleRepositoryView', { repositoryId });
  };

  const handleOrderChange = (newOrderBy) => {
    setOrderBy(newOrderBy);
  };

  return (
    <View style={globalStyles.container}>
      <RepositoryListContainer
        repositories={repositories}
        onRepositoryItemPress={handleRepositoryItemPress}
        orderBy={orderBy}
        onOrderChange={handleOrderChange}
      />
    </View>
  );
};

export default RepositoryList;
