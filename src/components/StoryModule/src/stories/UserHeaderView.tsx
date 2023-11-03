import { wrap } from 'lodash';
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Cross from '../../../../../assets/svgs/lightCross.svg';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Dotes from '../../../../../assets/svgs/threeDot.svg';
import { WHITE, GREEN, TINT_GRAY } from '../utils/colors';
import { UserProps } from '../../../../utiles/interfaceHelper';
import RNAvatar from '../../../RNAvatar';
import { useTheme } from 'react-native-paper';

const UserHeaderView = ({
  userImage,
  userName,
  userMessage,
  imageArrow,
  onImageClick,
  crossPress,
  deletePress,
}: UserProps) => {
  const { color } = useTheme();
  return (
    <View style={styles.parentStyle}>
      {userImage && (
        <RNAvatar
          width={wp(15)}
          height={wp(15)}
          borderRadius={wp(10)}
          marginHorizontal="3%"
          img={userImage}
          clr1={color.linerClr1}
          clr2={color.linerClr2}
        />
      )}
      <View style={styles.verticalStyle}>
        <Text style={styles.titleStyle}>{userName}</Text>
        <Text style={styles.descStyle}>{userMessage}</Text>
      </View>
      <View style={styles.rightIconStyle}>
        {/* <TouchableOpacity
          style={{ justifyContent: 'center', marginHorizontal: 10 }}
          onPress={deletePress}
        >
          <Dotes alignSelf="center" />
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={crossPress}
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
          }}
        >
          <Cross alignSelf="center" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserHeaderView;

const styles = StyleSheet.create({
  parentStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    marginTop: '5%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    paddingBottom: '3%',
  },

  titleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: WHITE,
    marginTop: 2,
  },
  descStyle: {
    fontSize: 14,
    fontWeight: '400',
    color: WHITE,
    marginTop: 5,
  },
  circleDiv: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: '2%',
  },
  verticalStyle: {
    flexDirection: 'column',

    justifyContent: 'center',
    width: '60%',
  },
  imgLeftArrow: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: '3%',
  },
  rightIconStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    width: '15%',
    height: '50%',
  },
});
