import React, { useCallback, useState } from 'react';
import RNRestart from 'react-native-restart';
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  DevSettings,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Coin from '../../../../assets/svgs/smallCoin.svg';
import { HitApi } from '../../../APIHits/APIHandler';
import { BUY_AN_ITEM, SETTHEME, THEME } from '../../../APIHits/urls';
import GradientBtn from '../../../components/gradientBtn';
import Header from '../../../components/Header';
import RNButton from '../../../components/RNButton';
import { AppLoader } from '../../../components/RNLoader';
import StoreCard from '../../../components/StoreCard';
import {
  ChangeFonts,
  ChangeTheme,
  ProfileBackGround,
  SetJudgeCount_Coins,
} from '../../../redux/Actions/appAction';
import { fonts } from '../../../Themes/FontsConfig';
import {
  CustomFontImage,
  CustomProfileBtns,
  CustomProfileImage,
  giftCardData,
  CustomThemeImage
} from '../../../utiles/dummyData';
import { coinConvert } from '../../../utiles/export';
import LinearGradient from 'react-native-linear-gradient';
import { TextStroke } from '../../../components/ShadowText';
import { textColor } from '../../../utiles/themeSelectot';
import RNFetchBlob from 'rn-fetch-blob';

const ShopeScreen = ({ navigation }) => {
  const {
    themeImageStyle,
    aCardView,
    aFontStyle,
    aImgStyle,
    contentContainerStyle,
    profileImageStyle,
    storeItem,
    bgGradientbtnStyle,
    themeGradientbtnStyle,
    fontImageStyle,
    btnsStyle,
    modalText,
  } = styles;
  const dispatch = useDispatch();
  const { color } = useTheme();
  const { token } = useSelector((state) => state.authReducer);
  const { fontChange, judgedMemes, theme_data, app_Theme } = useSelector(
    (state) => state.appReducer,
  );
  const font = fonts(fontChange);
  const [isModal, setIsModal] = useState({
    isVisible: false,
    type: '',
    action: '',
    coin: '',
    ref: '',
    img: '',
    name: '',
  });
  const [isIndex, setIsindex] = useState(0);
  const [isPurachsed, setIsPurchased] = useState(false);
  const [allPurchased, setAllPurchased] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tournament, setTournament] = useState(null);
  const [isShop, setIsShop] = useState(null);

  const bgImage = theme_data?.bgImage;

  const getTheme = async () => {
    setIsLoading(true);
    let res = await HitApi(`${THEME}`, 'get');
    console.log("res>>>",JSON.stringify(res,null,2));

    if (res.status == 200) {
      setIsShop(res?.data);
      setIsLoading(false);
    }else if(res.status==404){
      setIsLoading(false);
    }else{
      setIsLoading(false);
    }

  };

  const SetTheme = async () => {
    setIsLoading(true);
    let res = await HitApi(`${SETTHEME}?ref=${isModal?.ref}`, 'get', '', token);
    if (res?.status == 200) {
      // try {
      //   const folderName = 'assets'; // Specify the desired folder name
      //   const fileName = 'background.jpg'; // Specify the desired file name and extension
      //   const path = `/Users/alihaider/Documents/ReactNativeWork/Memee-mobile-app/${folderName}/${fileName}`; // Combine the project directory, folder name, and file name

      //   const response = await RNFetchBlob.config({
      //     fileCache: true,
      //     path: path, // Specify the full path for the downloaded image
      //   }).fetch('GET', res?.data.bgImage);
      //   console.log('Background image saved to:', response.path());

      // } catch (error) {
      //   console.log('Error saving background image:', error);
      // }

      dispatch(ChangeTheme(isModal?.ref, res?.data));

      await AsyncStorage.setItem('theme', isModal?.ref);
      setIsLoading(false);

      // setTimeout(() => {
      //   DevSettings.reload();
      //   setIsLoading(false);
      // }, 4000);
    } else {
      Alert.alert('Error', res?.message);
      setIsLoading(false);
    }
  };

  const funCall = async () => {
    switch (isIndex) {
      case 0:
        {
          if (isPurachsed) {
            setIsLoading(true);
            setIsModal({ ...isModal, isVisible: false });
            setIsPurchased(false);
            setTimeout(async () => {
              if (isModal?.ref == 'black' || isModal?.ref == 'space') {
                dispatch(ChangeTheme(isModal.ref, null));
                await AsyncStorage.setItem('theme', isModal.ref);
                setIsLoading(false);
                // setTimeout(() => {
                //   RNRestart.restart();
                //   // DevSettings.reload();
                //   setIsLoading(false);
                // }, 4000);
              } else {
                SetTheme();
              }
            }, 1500);
          } else {
            BuyItemAPi(isModal);
          }
        }
        break;
      case 1:
        {
          if (isPurachsed) {
            setIsModal({ ...isModal, isVisible: false });
            setIsPurchased(false);
            dispatch(ChangeFonts(isModal.ref));
          } else {
            BuyItemAPi(isModal);
          }
        }
        break;
      case 2:
        {
          if (isPurachsed) {
            setIsModal({ ...isModal, isVisible: false });
            setIsPurchased(false);
            dispatch(ProfileBackGround(isModal.img));
            navigation.navigate('Profile');
          } else {
            BuyItemAPi(isModal);
          }
        }
        break;
      case 3:
        {
          setIsPurchased(true);
          setIsModal({
            ...isModal,
            type: `Please wait for memee app to send you amazon gift card to your email`,
          });
        }
        break;
    }
  };

  const modelRender = () => {
    switch (isIndex) {
      case 0:
        {
          return (
            <StoreCard
              coins={coinConvert(isModal?.coin)}
              coinIcon={isPurachsed ? null : <Coin alignSelf="center" />}
              name={isModal.name}
              img={isModal?.img}
              // isHttps={isModal?.img.startsWith('https')}
              imgResizeMode="contain"
              btnStyle={{ padding: wp(2) }}
              disabled={true}
              imgStyle={{
                width: wp(80),
                height: hp(15),
                alignSelf: 'center',
              }}
            />
          );
        }
        break;
      case 1:
        {
          return (
            <StoreCard
              coins={coinConvert(isModal?.coin)}
              coinIcon={isPurachsed ? null : <Coin alignSelf="center" />}
              name={isModal.name}
              img={isModal?.img}
              imgResizeMode="contain"
              btnStyle={{ padding: wp(2) }}
              disabled={true}
              imgStyle={{
                width: wp(80),
                height: hp(15),
                alignSelf: 'center',
              }}
            />
          );
        }
        break;
      case 2:
        {
          return (
            <TouchableOpacity disabled={true} style={{ marginVertical: hp(2) }}>
              <Image
                source={isModal.img}
                resizeMode="cover"
                style={profileImageStyle}
              />
              <GradientBtn
                leftIcon={isPurachsed ? null : <Coin alignSelf="center" />}
                coins={coinConvert(isModal?.coin)}
                style={bgGradientbtnStyle}
              />
            </TouchableOpacity>
          );
        }
        break;
      case 5: {
        return null;
      }
      default: {
        if (!isPurachsed) {
          return (
            <TouchableOpacity
              style={[
                aCardView,
                {
                  backgroundColor: color.g6,
                  justifyContent: 'center',
                  width: wp(58),
                  height: hp(18),
                },
              ]}
              disabled={true}
            >
              <Image
                source={require('../../../../assets/pngs/a.png')}
                resizeMode="contain"
                style={aImgStyle}
              />
            </TouchableOpacity>
          );
        }
      }
    }
  };
  const RNModal = () => {
    return (
      <View
        style={{ justifyContent: 'center', flex: 1, marginHorizontal: wp(5) }}
      >
        {modelRender()}
        <Text
          style={[modalText, { fontFamily: font.bold, color: color.white }]}
        >
          {isModal.type}
        </Text>

        <View
          style={[
            btnsStyle,
            {
              justifyContent:
                (isIndex == 3 && isPurachsed) || isIndex == 5
                  ? 'center'
                  : 'space-between',
            },
          ]}
        >
          {(isIndex == 3 && isPurachsed) || isIndex == 5 ? null : (
            <RNButton
              isLoading={false}
              clr1={color.linerClr3}
              clr2={color.linerClr4}
              textColor={color.bl4}
              family={font.bold}
              btnWidth={wp(35)}
              btnHeight={hp(7)}
              btnRadius={wp(10)}
              btnVertical={hp(1)}
              title={isPurachsed ? 'Check' : 'Buy'}
              borderWidth={0}
              borderClr={'transparent'}
              onPress={funCall}
            />
          )}
          <RNButton
            isLoading={false}
            clr1={color.white == 'black' ? 'white' : color.white}
            clr2={color.white == 'black' ? 'white' : color.white}
            textColor={color.black}
            family={font.bold}
            btnWidth={wp(35)}
            btnHeight={hp(7)}
            btnRadius={wp(10)}
            btnVertical={hp(2)}
            title={
              (isIndex == 3 && isPurachsed) || isIndex == 5
                ? 'Close'
                : isPurachsed
                ? 'Go Back'
                : 'Deny'
            }
            borderWidth={0}
            borderClr={'transparent'}
            onPress={() => {
              setIsModal({ ...isModal, isVisible: false });
              setIsPurchased(false);
              if (isIndex == 3 || isIndex == 5) {
                setIsindex(0);
              }
            }}
          />
        </View>
      </View>
    );
  };

  const RenderComponent = () => {
    switch (isIndex) {
      case 0:
        {
          return (
            <>
              {/* {isShop?.themes?.map((i, index) => { */}
              {CustomThemeImage.map((i, index) => {
                console.log("iiiiiiii",i);
                return (
                  <View key={index}>
                    <StoreCard
                      coinIcon={
                        isPurachsed ? null : <Coin alignSelf="center" />
                      }
                      coins={coinConvert(i?.coin)}
                      name={i?.name}
                      img={i?.path}
                      // isHttps={i?.path.startsWith('https')}
                      imgResizeMode="contain"
                      btnStyle={{ padding: wp(2) }}
                      onPress={() => {
                        BuyAnItem(i, 'theme');
                      }}
                      imgStyle={{
                        width: wp(80),
                        height: hp(12),
                        alignSelf: 'center',
                      }}
                    />
                  </View>
                );
              })}
            </>
          );
        }
        break;
      case 1:
        {
          return (
            <>
              {CustomFontImage.map((i, index) => {
                return (
                  <View key={index}>
                    <StoreCard
                      coinIcon={
                        isPurachsed ? null : <Coin alignSelf="center" />
                      }
                      coins={coinConvert(i?.coin)}
                      name={i.name}
                      img={i.path}
                      imgResizeMode="contain"
                      imgStyle={fontImageStyle}
                      onPress={() => {
                        BuyAnItem(i, 'font');
                      }}
                    />
                  </View>
                );
              })}
            </>
          );
        }
        break;
      default: {
        return (
          <ScrollView contentContainerStyle={contentContainerStyle}>
            {CustomProfileImage.map((i, index) => {
              return (
                <View key={index}>
                  <TouchableOpacity
                    // disabled={true} //navigation.navigate('BottomTab', { screen: 'ProfileScreen' })
                    style={{ marginVertical: hp(2) }}
                    onPress={() => {
                      BuyAnItem(i, 'profile background');
                    }}
                  >
                    <Image
                      key={i.id}
                      source={i.path}
                      resizeMode="cover"
                      style={profileImageStyle}
                    />
                    <GradientBtn
                      leftIcon={<Coin alignSelf="center" />}
                      coins={coinConvert(i?.coin)}
                      style={bgGradientbtnStyle}
                      disabled={true}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        );
      }
    }
  };

  const GiftCard = () => {
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginLeft: wp(3) }}
      >
        {giftCardData.map((i, index) => {
          return (
            <View key={index}>
              <TouchableOpacity
                key={index}
                style={[aCardView, { backgroundColor: color.g6 }]}
                onPress={() => {
                  setIsindex(3);
                  setIsModal({
                    ...isModal,
                    isVisible: true,
                    type: `Are you sure you want to buy ${i.coin} amazon gift card  and use your ${i.price} memee coins?`,
                    coin: i.coin,
                    ref: i.path,
                    img: require('../../../../assets/pngs/a.png'),
                    name: i.name,
                  });
                }}
              >
                <Text
                  style={[
                    aFontStyle,
                    {
                      fontFamily: font.bold,
                      color: textColor(app_Theme, color?.white).text,
                    },
                  ]}
                >
                  ${i.coin}
                </Text>
                <Image
                  source={require('../../../../assets/pngs/a.png')}
                  resizeMode="contain"
                  style={aImgStyle}
                />
                <GradientBtn
                  leftIcon={<Coin alignSelf="center" />}
                  coins={i.price}
                  style={themeGradientbtnStyle}
                  disabled={true}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    );
  };

  const ScreenReturn = () => {
    if (isModal.isVisible) {
      return <RNModal />;
    } else {
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('BottomTab', { screen: 'Tournament' })
            }
          >
            <LinearGradient
              colors={[color?.linerClr3, color?.linerClr4]}
              style={{ ...styles.innerView }}
              start={{ y: 0, x: 1 }}
              end={{ y: 0.7, x: 1 }}
            >
              <ImageBackground
                source={require('../../../../assets/pngs/MaskCoin.png')}
                resizeMode="cover"
                style={styles.topBannerStyle}
              >
                <View
                  style={{
                    position: 'absolute',
                    alignSelf: 'center',
                  }}
                >
                  <TextStroke stroke={1} color={'white'}>
                    <Text
                      style={{
                        ...styles.textStyle,
                        fontFamily: font.medium,
                      }}
                      numberOfLines={2}
                    >
                      {tournament}
                    </Text>
                  </TextStroke>
                </View>
              </ImageBackground>
            </LinearGradient>
          </TouchableOpacity>

          <Text
            style={[storeItem, { color: color.white, fontFamily: font.bold }]}
          >
            Gift cards
          </Text>
          {GiftCard()}
          <Text
            style={[storeItem, { color: color.white, fontFamily: font.bold }]}
          >
            Store Items
          </Text>

          <View style={styles.headerBtnStyle}>
            {CustomProfileBtns.map((i, index) => {
              return (
                <View key={index}>
                  <TouchableOpacity
                    key={i.id}
                    style={{
                      borderBottomColor: color.y1,
                      borderBottomWidth: index == isIndex ? 2 : 0,
                      ...styles.btnStyle,
                    }}
                    onPress={() => setIsindex(index)}
                  >
                    <Text
                      style={{
                        ...styles.headerBtnTextStyle,
                        color: index == isIndex ? color.white : color.g2,
                        fontFamily: font.medium,
                      }}
                    >
                      {i.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          {/* <RNDrive borderClr={color.g1} marginVertical={hp(2)} /> */}

          {RenderComponent()}
        </ScrollView>
      );
    }
  };

  const BuyAnItem = async (i, ref) => {
    console.log('ref:=>  ', ref);
    // if (!theme_data) {
    //   const folderName = 'assets'; // Specify the desired folder name
    //   const fileName = 'background.jpg';
    //   // If imageUrl is empty, delete the existing background.jpg file if it exists
    //   const existingImagePath = `/Users/alihaider/Documents/ReactNativeWork/Memee-mobile-app/${folderName}/${fileName}`;
    //   await RNFetchBlob.fs.unlink(existingImagePath);
    // }
    let obj;
    if (ref == 'profile background') {
      obj = allPurchased?.store?.find((j) => j?.name == i?.name);
    } else {
      obj = allPurchased?.store?.find((j) => j?.name == i?.ref);
    }

    switch (obj?.status) {
      case true:
        {
          setIsPurchased(true);
          setIsModal({
            ...isModal,
            isVisible: true,
            type: `Congratulations you purchased ${i?.name}, please check it in your profile`,
            coin: 'Yours',
            ref: i.ref,
            img: i.path,
            name: i.name,
          });
        }
        break;
      default: {
        setIsModal({
          ...isModal,
          isVisible: true,
          type: `Are you sure you want to buy this ${ref} for 100 memee coins?`,
          coin: i.coin,
          ref: i.ref,
          img: i.path,
          name: i.name,
        });
      }
    }
  };

  const GetAllStatus = async (i) => {
    let res = await HitApi(BUY_AN_ITEM, 'GET', '', token);

    switch (res?.status) {
      case 200:
        {
          setTournament(res?.data?.tournament);
          setAllPurchased(res?.data);
          console.log(res?.data);
        }
        break;
      case 404:
        {
          setAllPurchased([]);
          setTournament(res?.message);
        }
        break;
      default: {
        Alert.alert('Error', res?.message);
      }
    }
  };

  const BuyItemAPi = async (i) => {
    setIsLoading(true);
    const data = new FormData();
    data.append('name', isModal?.ref || isModal?.name);
    data.append('amount', isModal?.coin);
    let res = await HitApi(BUY_AN_ITEM, 'POST', data, token);

    switch (res?.status) {
      case 200:
        {
          setIsPurchased(true);
          setIsModal({
            ...isModal,
            type: `Congratulations you purchased ${isModal.name}, please check it in your profile`,
            coin: 'yours',
          });
          GetAllStatus();
          setIsLoading(false);
          dispatch(SetJudgeCount_Coins(res?.data?.coins, judgedMemes));
        }
        break;
      default: {
        // Alert.alert('Error', res?.message);
        //  isModal.isVisible;
        setIsModal({
          ...isModal,
          isVisible: true,
          type: `Insufficient coins, you can't buy this yet.`,
          img: '',
        });
        setIsindex(5);
        setIsLoading(false);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      GetAllStatus();
      getTheme();
    }, [navigation]),
  );

  return (
    <View style={{ ...styles.mainContainer, backgroundColor: color.bgColor }}>
      <LinearGradient
        colors={[color.bgColor1, color.bgColor2]}
        style={styles.mainContainer}
        start={{ y: 0, x: 0 }}
        end={{ y: 1, x: 0 }}
      >
        <ImageBackground
          source={
            // theme_data ? require('../../../../assets/background.jpg') : null
            { uri: bgImage }
          }
          style={styles.mainContainer}
          resizeMode="cover"
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
        >
          <Header
            title={isModal.isVisible ? 'Buy' : 'Shop'}
            isLeftIcon
            isCenterText
            isRightIcon
            fontSize={hp(2.2)}
            goBack={() => {
              if (isModal.isVisible) {
                setIsModal({ ...isModal, isVisible: false });
              } else {
                navigation.goBack();
              }
            }}
          />

          {ScreenReturn()}
          <AppLoader loading={isLoading} />
        </ImageBackground>
      </LinearGradient>
    </View>
  );
};

export default ShopeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerBtnStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: hp(8),
    marginHorizontal: wp(8),
    marginTop: hp(2),
  },
  btnStyle: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  headerBtnTextStyle: {
    fontSize: hp(2.1),
    marginBottom: hp(1),
  },
  themeImageStyle: {
    width: wp(90),
    height: hp(12),
    alignSelf: 'center',
    marginBottom: hp(2),
    zIndex: 1,
  },
  align: {
    justifyContent: 'center',
  },
  contentContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: wp(5),
  },
  profileImageStyle: {
    width: wp(43),
    height: hp(35),
    borderRadius: wp(7),
    alignSelf: 'center',
  },
  storeItem: {
    marginHorizontal: wp(5),
    marginTop: hp(3),
    fontSize: wp(4.5),
  },
  gradientStyle: {
    position: 'absolute',
    bottom: -15,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    flexDirection: 'row',
    width: wp(20),
    height: hp(3.8),
    borderRadius: wp(5),
  },
  coinsStyle: {
    marginHorizontal: wp(1),
    fontSize: hp(2),
    alignSelf: 'center',
  },
  bgGradientbtnStyle: {
    width: wp(20),
    height: hp(4),
    position: 'absolute',
    bottom: -15,
  },
  themeGradientbtnStyle: {
    width: wp(25),
    height: hp(5),
    alignSelf: 'flex-end',
    marginRight: wp(1),
  },
  cardView: {
    marginHorizontal: wp(5),
    borderRadius: wp(5),
    alignSelf: 'center',
    marginBottom: hp(2),
  },
  flexStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(5),
    marginTop: hp(2.5),
  },
  fontImageStyle: {
    width: wp(80),
    height: hp(11),
    alignSelf: 'center',
    marginHorizontal: wp(6),
  },
  aCardView: {
    width: wp(70),
    height: hp(22.5),
    marginHorizontal: wp(1.5),
    alignSelf: 'center',
    borderRadius: wp(5),
    padding: hp(1),
    marginTop: hp(2),
  },
  aFontStyle: {
    marginLeft: wp(2.5),
    fontSize: wp(5),
    marginTop: hp(0.8),
  },
  aImgStyle: {
    width: wp(18),
    height: hp(10),
    alignSelf: 'center',
    marginBottom: hp(0.8),
  },

  dialogStyle: {
    borderRadius: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnsStyle: {
    flexDirection: 'row',

    alignSelf: 'center',
    width: wp(80),
  },
  modalText: {
    fontSize: hp(2.5),
    marginVertical: hp(2),
    textAlign: 'center',
    marginHorizontal: wp(10),
  },
  innerView: {
    marginHorizontal: wp(5),
    marginBottom: hp(1.5),
    height: hp(10),
    borderRadius: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: '#F7CD36',
    fontSize: hp(2.5),

    width: wp(50),
    zIndex: 1,
    textAlign: 'center',
  },
  topBannerStyle: {
    height: hp(9),
    width: wp('80%'),
    zIndex: 0,
    justifyContent: 'center',
  },
});
