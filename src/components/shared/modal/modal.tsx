import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';

interface Props {
  visible: boolean;
  hide: () => void;
  styleContainer: any;
  styleMainContainer?: any;
}

export const ModalContainer: React.FC<Props> = ({
                                                  visible,
                                                  hide,
                                                  styleContainer,
                                                  styleMainContainer = {},
                                                  children,
                                                }) => {
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={visible}
      onRequestClose={hide}
    >
      <View
        style={{ ...style.container, ...styleMainContainer }}
        onTouchStart={hide}
      >
        <View
          style={styleContainer}
          onTouchStart={e => e.stopPropagation()}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, .5)',
  },
});