import React, { useState } from 'react';
import { View } from 'react-native';
import { Menu, Button } from 'react-native-paper';

const RepositoryOrderSelection = ({ onOrderChange }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>Change order</Button>}
      >
        <Menu.Item onPress={() => { onOrderChange('CREATED_AT'); closeMenu(); }} title="Latest repositories" />
        <Menu.Item onPress={() => { onOrderChange('RATING_AVERAGE_DESC'); closeMenu(); }} title="Highest rated repositories" />
        <Menu.Item onPress={() => { onOrderChange('RATING_AVERAGE_ASC'); closeMenu(); }} title="Lowest rated repositories" />
      </Menu>
    </View>
  );
};

export default RepositoryOrderSelection;