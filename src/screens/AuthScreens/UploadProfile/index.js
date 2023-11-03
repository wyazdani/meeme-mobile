import React, {useState} from 'react';
import {
    Alert, Image, ScrollView, Text, TouchableOpacity, View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-simple-toast';

let FormData = require('form-data');

import {useSelector} from 'react-redux';
import Plus from '../../../../assets/svgs/plus.svg';
import {HitApi} from '../../../APIHits/APIHandler';
import {SIGNUP} from '../../../APIHits/urls';
import Header from '../../../components/Header';
import RNButton from '../../../components/RNButton';
import {fonts} from '../../../Themes/FontsConfig';
import FastImage from 'react-native-fast-image';

const UploadProfile = ({navigation, route}) => {
    const {fontChange} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);
    const userData = route?.params?.item;

    // States
    const [profileImg, setProfileImage] = useState({
        type: 'image/jpg', uri: null, name: 'image',
    });
    const [isLoading, setIsLoading] = useState(false);

    // ================== Image Picker ==========================
    const SelectImage = () => {
        ImagePicker.openPicker({
            cropping: true, media: 'photo', maxWidth: 500, maxHeight: 500, quality: 0.5,
        }).then((image) => {
            console.log('Image:=>  ', image);
            let imgObj = {
                type: image?.mime, uri: image?.sourceURL || image?.path, name: image?.filename || image?.mime,
            };
            setProfileImage(imgObj);
        });
    };
    // ================= END ========================

    const SignUpUser = () => {
        setIsLoading(true);
        const data = new FormData();
        if (profileImg?.uri == null) {
            setIsLoading(false);
            Alert.alert('Note', 'Please upload profile image');
        } else {
            data.append('username', userData?.name);
            data.append('password', userData?.password);
            data.append('password_confirmation', userData?.confirmPassword);
            data.append('email', userData?.email.toLowerCase());
            data.append('profile_image', profileImg);
            HitApi(SIGNUP, 'post', data)
                .then((res) => {
                    console.log("res",res);
                    if (res?.status == 200) {
                        navigation.navigate('SignInScreen');
                        Toast.showWithGravity('User successfully create.', Toast.SHORT, Toast.BOTTOM,);
                    } else {
                        Alert.alert('Error', res?.message);
                    }
                    setIsLoading(false);
                })
                .catch((e) => {
                    let {message} = e;
                    setIsLoading(false);
                    Alert.alert('Error', message);
                });
        }
    };

    return (<View style={{...styles.container, backgroundColor: 'black'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Header
                marginRight={30}
                isLeftIcon
                isCenterText
                isRightIcon
                navigation={navigation}
            />
            <View style={{marginHorizontal: wp(5), height: hp(75)}}>
                <Text
                    style={{
                        ...styles.uploadStyle, fontFamily: font.bold, color: 'white',
                    }}
                >
                    Upload Photo
                </Text>
                <Text
                    style={{
                        ...styles.textStyle, fontFamily: font.regular, color: '#BABABA',
                    }}
                >
                    Upload your profile photo here
                </Text>

                <TouchableOpacity
                    onPress={() => SelectImage()}
                    style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        marginTop: hp(6),
                        backgroundColor: '#41414160',
                        width: wp(50),
                        height: wp(50),
                        borderRadius: wp(50),
                        borderStyle: 'dashed',
                        borderWidth: 2,
                        borderColor: '#414141', // opacity: 0.4,
                    }}
                >
                    {profileImg.uri == null ? (<Plus alignSelf="center"/>) : (<FastImage
                        source={{uri: profileImg.uri}}
                        resizeMode="cover"
                        style={styles.imageStyle}
                    />)}
                </TouchableOpacity>
            </View>
            <View style={{height: hp(17)}}>
                <RNButton
                    isLoading={isLoading}
                    clr1={'rgba(255, 226, 153, 1)'}
                    clr2={'rgba(246, 178, 2, 1)'}
                    textColor={'black'}
                    borderClr={'transparent'}
                    family={font.bold}
                    btnWidth={wp(90)}
                    btnHeight={hp(7.5)}
                    btnRadius={wp(10)}
                    btnVertical={hp(1)}
                    title={'Sign up'}
                    onPress={() => SignUpUser()}
                />
            </View>
        </ScrollView>
    </View>);
};

export default UploadProfile;

const styles = {
    container: {flex: 1},
    uploadStyle: {fontSize: hp(4), marginTop: hp(1.5), marginBottom: hp(2)},
    textStyle: {fontSize: hp(2), marginBottom: hp(3.5)},
    arrowStyle: {
        justifyContent: 'center', height: hp(8), marginHorizontal: wp(5),
    },
    imageStyle: {width: wp(49), height: wp(49), borderRadius: wp(49)},
};
