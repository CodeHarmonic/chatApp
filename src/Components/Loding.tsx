import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

const Loding = ({visible}: any) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalView}>
        <View style={styles.modalMainView}>
          <ActivityIndicator size={'large'} />
        </View>
      </View>
    </Modal>
  );
};

export default Loding;

const styles = StyleSheet.create({
  modalView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#10172973',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalMainView: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignContent: 'center',
  },
});
