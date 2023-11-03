import {Formik} from 'formik';
import React, { useRef, useState} from 'react';
import {
    Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-simple-toast';
import * as yup from 'yup';

let FormData = require('form-data');

import {useDispatch, useSelector} from 'react-redux';
import Camera from '../../../../assets/svgs/camera.svg';
import {HitApi} from '../../../APIHits/APIHandler';
import {UPDATEUSER} from '../../../APIHits/urls';
import Header from '../../../components/Header';
import MediaSelectionPopup from '../../../components/Modals/MediaSelectionPopup';
import RNButton from '../../../components/RNButton';
import RNInput from '../../../components/RNInputField';
import {ProfileUpdate} from '../../../redux/Actions/authAction';
import {fonts} from '../../../Themes/FontsConfig';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

const dummyImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';

const EditProfile = ({navigation, route}) => {
    const dispatch = useDispatch();
    const formikRef = useRef(null);
    const {color} = useTheme();
    const {fontChange, theme_data} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);
    const {item, img} = route?.params;
    const {token} = useSelector((state) => state.authReducer);
    const [isLoading, setIsLoading] = useState(false);
    const [mediaSelect, setMediaSelect] = useState(false);
    const [isImage, setIsImage] = useState({
        type: 'image/jpeg', uri: img || dummyImg, name: 'image',
    });

    const bgImage = theme_data?.bgImage;

    // ================= Validation funtion with formik ==========================
    const userInfo = {
        email: item?.email || '', name: item?.username || '', phone: item?.phone || '', bio: item?.bio || '',
    };
    const validationSchema = yup.object({
        email: yup
            .string()
            .label('email')
            .required('Email must required')
            .email('Email must be a valid email address'),
        name: yup.string().label('name').required('Name must required'),
        phone: yup.string().label('phone'),
        bio: yup.string().label('bio'),
    });
    // =================  END ======================================

    const submitForm = () => {
        setIsLoading(true);
        setTimeout(() => {
            if (formikRef.current) {
                formikRef.current.handleSubmit();
                setIsLoading(false);
            }
        }, 300);
    };

    const UpdateUserProfile = (v) => {
        setIsLoading(true);
        const data = new FormData();
        data.append('username', v?.name);
        data.append('phone', v?.phone);
        data.append('bio', v?.bio);
        data.append('profile_image', isImage);

        HitApi(UPDATEUSER, 'PUT', data, token).then((res) => {
            if (res?.status == 200) {
                var userInfo = {
                    ...res?.data?.user, img: res?.data?.profile_image,
                };
                dispatch(ProfileUpdate(userInfo));
                Toast.showWithGravity(res?.message, Toast.SHORT, Toast.BOTTOM);
                navigation.goBack();
            } else {
                Alert.alert('Error', res?.message);
            }
            setIsLoading(false);
        });
    };

    return (<View style={{...styles.mainContainer, backgroundColor: color.bgColor}}>
            <LinearGradient
                colors={[color.bgColor1, color.bgColor2]}
                style={styles.mainContainer}
                start={{y: 0, x: 0}}
                end={{y: 1, x: 0}}
            >
                <ImageBackground
                    source={// theme_data ? require('../../../../assets/background.jpg') : null
                        {uri: bgImage}}
                    style={styles.mainContainer}
                    resizeMode="cover"
                >
                    <Header
                        title="Edit Profile"
                        isLeftIcon
                        isCenterText
                        isRightIcon
                        navigation={navigation}
                        fontSize={hp(2.2)}
                    />

                    <View style={{...styles.ImageView, borderColor: color.y6}}>
                        <FastImage
                            source={{uri: isImage?.uri || dummyImg}}
                            resizeMode="cover"
                            style={styles.ImageStyle}
                        />
                        <TouchableOpacity
                            style={styles.cameraStyle}
                            onPress={() => setMediaSelect(true)}
                        >
                            <Camera/>
                        </TouchableOpacity>
                    </View>
                    <Text
                        style={{
                            ...styles.nameStyle, fontFamily: font.bold, color: color.white,
                        }}
                        numberOfLines={1}
                    >
                        {item?.username}
                    </Text>
                    <Text
                        style={{
                            ...styles.mailStyle, fontFamily: font.light, color: color.g19,
                        }}
                        numberOfLines={1}
                    >
                        {item?.email}
                    </Text>
                    <Formik
                        initialValues={userInfo}
                        validationSchema={validationSchema}
                        innerRef={formikRef}
                        onSubmit={(v) => {
                            UpdateUserProfile(v);
                        }}
                    >
                        {({
                              handleChange, handleBlur, handleSubmit, values, touched, errors,
                          }) => {
                            const {email, name, phone, bio} = values;
                            return (<ScrollView showsVerticalScrollIndicator={false}>
                                    <View style={{marginHorizontal: wp(5), marginTop: hp(5)}}>
                                        <RNInput
                                            title="NAME"
                                            marginVertical={hp(1.5)}
                                            editable={!isLoading}
                                            input={{
                                                placeholder: 'Name',
                                                onChangeText: handleChange('name'),
                                                onBlur: handleBlur('name'),
                                                editable: !isLoading,
                                                value: name,
                                                numberOfLines: 1,
                                                keyboardType: 'default',
                                            }}
                                        />
                                        {touched.name && errors.name && (
                                            <Text style={{...styles.warningStyle, color: color.r1}}>
                                                {errors.name}
                                            </Text>)}
                                        <RNInput
                                            title="EMAIL"
                                            marginVertical={hp(1.5)}
                                            editable={false}
                                            input={{
                                                placeholder: 'Example@gmail.com',
                                                onChangeText: (t) => handleChange('email')(t.trim()),
                                                onBlur: handleBlur('email'),
                                                editable: false,
                                                value: email,
                                                numberOfLines: 1,
                                                keyboardType: 'default',
                                            }}
                                        />
                                        {touched.email && errors.email && (
                                            <Text style={{...styles.warningStyle, color: color.r1}}>
                                                {errors.email}
                                            </Text>)}
                                        <RNInput
                                            title="PHONE"
                                            marginVertical={hp(1.5)}
                                            editable={!isLoading}
                                            input={{
                                                placeholder: 'Phone number',

                                                onChangeText: handleChange('phone'),
                                                onBlur: handleBlur('phone'),
                                                editable: !isLoading,
                                                value: phone,
                                                numberOfLines: 1,
                                                keyboardType: 'number-pad',
                                                maxLength: 15,
                                            }}
                                        />
                                        {touched.phone && errors.phone && (
                                            <Text style={{...styles.warningStyle, color: color.r1}}>
                                                {errors.phone}
                                            </Text>)}
                                        <RNInput
                                            title="BIO"
                                            marginVertical={hp(1.5)}
                                            editable={!isLoading}
                                            input={{
                                                placeholder: 'Bio',
                                                onChangeText: handleChange('bio'),
                                                onBlur: handleBlur('bio'),
                                                editable: !isLoading,
                                                value: bio,
                                                numberOfLines: 1,
                                                keyboardType: 'default',
                                                multiline: true,
                                            }}
                                        />
                                        {touched.bio && errors.bio && (
                                            <Text style={{...styles.warningStyle, color: color.r1}}>
                                                {errors.bio}
                                            </Text>)}
                                        <View style={{marginVertical: hp(2)}}>
                                            <RNButton
                                                isLoading={isLoading}
                                                clr1={color.linerClr1}
                                                clr2={color.linerClr2}
                                                textColor={color.bl1}
                                                borderClr={'transparent'}
                                                family={font.bold}
                                                btnWidth={wp(90)}
                                                btnHeight={hp(7.5)}
                                                btnRadius={wp(10)}
                                                btnVertical={hp(1)}
                                                title={'Save'}
                                                onPress={() => {
                                                    submitForm();
                                                }}
                                            />
                                        </View>
                                    </View>
                                </ScrollView>);
                        }}
                    </Formik>
                    <MediaSelectionPopup
                        isVisible={mediaSelect}
                        navigation={navigation}
                        setMediaSelect={setMediaSelect}
                        screenName="createMemee"
                        setImg={setIsImage}
                        mediaType="photo"
                    />
                </ImageBackground>
            </LinearGradient>
        </View>);
};

export default EditProfile;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    }, warningStyle: {
        fontSize: wp(2.8),
    }, ImageView: {
        width: wp(43),
        height: wp(43),
        borderRadius: wp(43),
        borderWidth: wp(0.8),
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: hp(2),
    }, ImageStyle: {
        width: wp(41.5), height: wp(41.3), borderRadius: wp(41.5), alignSelf: 'center',
    }, cameraStyle: {
        position: 'absolute', bottom: -10, right: 0,
    }, nameStyle: {
        fontSize: hp(3.2), marginHorizontal: wp(5), marginVertical: hp(0.5), alignSelf: 'center',
    }, mailStyle: {
        fontSize: hp(2), marginHorizontal: wp(5), alignSelf: 'center',
    },
});
