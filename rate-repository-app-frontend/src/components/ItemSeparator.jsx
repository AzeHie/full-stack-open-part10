import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  separator: {
    height: 20,
    backgroundColor: '#ededed'
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export default ItemSeparator;