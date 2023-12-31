import React, { FunctionComponent } from 'react';
import { ArrowViewProps } from '../../../../utiles/interfaceHelper';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Text,
} from 'react-native';

const ArrowNavigator: FunctionComponent<ArrowViewProps> = (props) => {
  return (
    <View style={styles.parentArrow}>
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
          props.onArrowClick('left');
        }}
        onPressIn={() => {
          Keyboard.dismiss();
          props.onArrowClick('longIn');
        }}
        onPressOut={() => {
          Keyboard.dismiss();
          props.onArrowClick('longOut');
        }}
        delayPressIn={500}
        style={styles.circleDiv}
      >
        <Text />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
          props.onArrowClick('right');
        }}
        onPressIn={() => {
          Keyboard.dismiss();
          props.onArrowClick('longIn');
        }}
        onPressOut={() => {
          Keyboard.dismiss();
          props.onArrowClick('longOut');
        }}
        delayPressIn={500}
        style={styles.circleDiv}
      >
        <Text />
      </TouchableOpacity>
    </View>
  );
};

export default ArrowNavigator;

const styles = StyleSheet.create({
  parentArrow: {
    flexDirection: 'row',
    width: '100%',
    height: '80%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    position: 'absolute',
    top: '13%',
    flex: 1,
    // backgroundColor:TINT_GRAY
  },

  imgLeftStyle: {
    width: 15,
    height: 15,
    marginTop: 2,
    marginRight: 3,
  },
  imgRightStyle: {
    width: 15,
    height: 15,
    marginTop: 2,
    marginLeft: 3,
  },
  circleDiv: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    // backgroundColor:'red'
  },
});
