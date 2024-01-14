import { Pressable, StyleSheet, Text } from 'react-native';

const AppBarTab = ({ tabText }) => {

  const styles = StyleSheet.create({
    
    text: {
      flexGrow: 0,
      color: 'white',
      marginLeft: 10,
      paddingTop: 3,
      paddingBottom: 3
    },
  })

  return (
    <Pressable
      onPress={() => null}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? 'rgba(210, 230, 255, 1)' : 'transparent',
        },
      ]}
    >
      <Text style={styles.text}>{tabText}</Text>
    </Pressable>
  );
};

export default AppBarTab;
