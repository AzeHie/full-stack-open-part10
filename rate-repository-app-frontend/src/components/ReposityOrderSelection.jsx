import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  item: {
    fontSize: 18,
    color: 'black',
  },
});

const RepositoryOrderSelection = ({ onOrderChange, orderBy }) => {
  const [selectedValue, setSelectedValue] = useState('Change order..');

  useEffect(() => {
    switch (orderBy) {
      case 'CREATED_AT':
        setSelectedValue('Order: Latest repositories');
        break;
      case 'RATING_AVERAGE_DESC':
        setSelectedValue('Order: Highest rated repositories');
        break;
      case 'RATING_AVERAGE_ASC':
        setSelectedValue('Order: Lowest rated repositories');
        break;
      default:
        setSelectedValue('Change order..');
    }
  }, [orderBy]);

  return (
    <Picker
      style={styles.container}
      selectedValue={selectedValue} 
      onValueChange={(itemValue) => {
        console.log('Item value: ', itemValue);
        onOrderChange(itemValue);
      }}
    >
      <Picker.Item
        style={styles.item}
        label='Latest repositories'
        value='CREATED_AT'
      />
      <Picker.Item
        style={styles.item}
        label='Highest rated repositories'
        value='RATING_AVERAGE_DESC'
      />
      <Picker.Item
        style={styles.item}
        label='Lowest rated repositories'
        value='RATING_AVERAGE_ASC'
      />
    </Picker>
  );
};

export default RepositoryOrderSelection;
