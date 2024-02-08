import { Searchbar } from 'react-native-paper';

const RepositorySearch = ({ onSearchChange, searchKeyword }) => {
  return (
    <Searchbar
      placeholder='Search'
      onChangeText={(value) => onSearchChange(value)}
      value={searchKeyword}
    />
  );
};

export default RepositorySearch;
