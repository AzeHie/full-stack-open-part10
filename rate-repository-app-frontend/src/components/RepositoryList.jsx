
import { View } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import { globalStyles } from '../utils/styles';
import RepositoryListContainer from './RepositoryListContainer';
import { useNavigation } from '@react-navigation/native';

const RepositoryList = () => {
  const { repositories } = useRepositories(); 
  const navigation = useNavigation();

  const handleRepositoryItemPress = (repositoryId) => {
    navigation.navigate('SingleRepositoryView', { repositoryId });
  };

  return <View style={globalStyles.container}>
      <RepositoryListContainer repositories={repositories} onRepositoryItemPress={handleRepositoryItemPress}/>
    </View>
};

export default RepositoryList;
