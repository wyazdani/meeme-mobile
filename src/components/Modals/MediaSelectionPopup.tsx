import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
  Alert,
} from 'react-native';
import React from 'react';
import { Dialog } from 'react-native-simple-dialogs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-crop-picker';
import { MediaSelectionProps } from '../../utiles/interfaceHelper';
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { fonts } from '../../Themes/FontsConfig';

const MediaSelectionPopup = ({
  setMediaSelect,
  navigation,
  isVisible,
  screenName,
  setImg,
  mediaType,
  multiple = false,
}: MediaSelectionProps) => {
  const { rowStyle, iconStyle, textStyle, dialogStyle } = styles;
  const { color } = useTheme();
  const { fontChange, coins } = useSelector((state) => state.appReducer);
  const font = fonts(fontChange);

  const OpenGallery = () => {
    setMediaSelect(false);
    setTimeout(() => {
      ImagePicker.openPicker({
        mediaType: mediaType,
        cropping: false,
        multiple: multiple,
        maxFiles: 3,
        width: 500,
        height: 500,
        quality: 1,
        avoidEmptySpaceAroundImage: true,
        smartAlbums: [
          'UserLibrary',
          'PhotoStream',
          'Panoramas',
          'Videos',
          'Bursts',
        ],
        compressVideoPreset: 'MediumQuality',

        compressImageQuality: 0.5,
        loadingLabelText: 'Processing assets...',
      })
        .then((img) => {
          if (!multiple) {
            let imgObj = {
              type: img?.mime,
              uri: img?.sourceURL || img?.path,
              name: img?.filename || img?.mime,
            };
            if (img?.size <= 10485760) {
              if (setImg) {
                setImg(imgObj);
              } else {
                if (screenName == 'tournament') {
                  navigation.navigate('CreateTournamentMemee', {
                    item: imgObj,
                  });
                } else {
                  navigation.navigate('CreateMemeeScreen', {
                    item: {
                      img: imgObj,
                      des: '',
                      tags: [],
                      postId: '',
                      check: screenName,
                      imgSize: { height: img?.height, width: img?.width },
                    },
                  });
                }
              }
            } else {
              Alert.alert('Limit Alert', 'Video should be smaller then 10 MB');
            }
          } else {
            if (img?.length > 3) {
              Alert.alert('Limit Alert', 'User can select max 3 pics');
            } else {
              setImg(img);
            }
          }
        })
        .catch((err) => {
          return err;
        });
    }, 500);
  };

  const OpenCamera = () => {
    setMediaSelect(false);
    setTimeout(() => {
      ImagePicker.openCamera({
        cropping: false,
        mediaType: mediaType,
        ompressImageMaxWidth: 500,
        compressImageMaxHeight: 550,
        compressImageQuality: 0.5,
        width: 500,
        height: 500,
        quality: 1,
        avoidEmptySpaceAroundImage: true,
        quality: 0.5,
        multiple: true,
      })
        .then((img) => {
          let imgObj = {
            type: img?.mime,
            uri: img?.sourceURL || img?.path,
            name: img?.filename || img?.mime,
          };

          if (setImg) {
            if (multiple) {
              setImg([imgObj]);
            } else {
              setImg(imgObj);
            }
          } else {
            if (screenName == 'tournament') {
              navigation.navigate('CreateTournamentMemee', { item: imgObj });
            } else {
              navigation.navigate('CreateMemeeScreen', {
                item: {
                  img: imgObj,
                  des: '',
                  tags: [],
                  postId: '',
                  check: screenName,
                  imgSize: { height: img?.height, width: img?.width },
                },
              });
            }
          }
        })
        .catch((err) => {
          return err;
        });
    }, 500);
  };

  return (
    <Dialog
      visible={isVisible}
      dialogStyle={[styles.dialogStyle, { backgroundColor: color.g6 }]}
      onTouchOutside={() => setMediaSelect(false)}
      title="Select"
      titleStyle={{
        color: color.white,
        fontFamily: font?.bold,
        alignSelf: 'center',
      }}
    >
      <View style={rowStyle}>
        <TouchableOpacity onPress={OpenCamera}>
          <Image
            source={require('../../../assets/pngs/camera.png')}
            style={iconStyle}
            resizeMode="contain"
          />
          <Text
            style={[textStyle, { fontFamily: font?.bold, color: color.white }]}
          >
            Camera
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={OpenGallery}>
          <Image
            source={require('../../../assets/pngs/gallery.png')}
            style={iconStyle}
            resizeMode="contain"
          />
          <Text
            style={[
              textStyle,
              { fontFamily: font?.medium, color: color.white },
            ]}
          >
            Gallery
          </Text>
        </TouchableOpacity>
      </View>
    </Dialog>
  );
};

export default MediaSelectionPopup;

const styles = StyleSheet.create({
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: wp(4),
    marginBottom: hp(1.3),
  },
  iconStyle: {
    width: wp(20),
    height: wp(15),
    alignSelf: 'center',
  },
  textStyle: {
    fontSize: wp(4),
    alignSelf: 'center',
    marginTop: hp(1),
  },
  dialogStyle: {
    maxHeight: hp(50),
    borderRadius: wp(5),
    borderWidth: 0.6,
    borderColor: 'white',
  },
});
