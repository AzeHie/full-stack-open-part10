import { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDebounce } from 'use-debounce';

import useRepositories from '../../hooks/useRepositories';
import { globalStyles } from '../../utils/styles';
import RepositoryListContainer from './RepositoryListContainer';

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const { repositories } = useRepositories(orderBy, debouncedSearchKeyword);
  const navigation = useNavigation();

  const handleRepositoryItemPress = (repositoryId) => {
    navigation.navigate('SingleRepositoryView', { repositoryId });
  };

  const handleOrderChange = (newOrderBy) => {
    setOrderBy(newOrderBy);
  };

  const handleSearchChange = (keyword) => {
    setSearchKeyword(keyword);
  }

  return (
    <View style={globalStyles.container}>
      <RepositoryListContainer
        repositories={repositories}
        onRepositoryItemPress={handleRepositoryItemPress}
        orderBy={orderBy}
        onOrderChange={handleOrderChange}
        searchKeyword={searchKeyword}
        onSearchChange={handleSearchChange}
      />
    </View>
  );
};

export default RepositoryList;
