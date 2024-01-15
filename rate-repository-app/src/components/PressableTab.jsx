import { Pressable } from 'react-native';

const PressableTab = ({ onPress, children }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? 'rgba(210, 230, 255, 1)' : 'transparent',
        },
      ]}
    >
      {children}
    </Pressable>
  );
};

export default PressableTab;
