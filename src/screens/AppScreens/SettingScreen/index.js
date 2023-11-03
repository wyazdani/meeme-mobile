import React, {useEffect, useState} from 'react';
import {
    Alert, Platform, ScrollView, StyleSheet, View, ImageBackground,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import {AppIcons} from '../../../../assets/svgs';

import RightArrow from '../../../../assets/svgs/rightArrow.svg';
import {HitApi} from '../../../APIHits/APIHandler';
import {USER_NOTIFICATION_SETTING, USER_STATUS, USER_PRIVATE_SETTING} from '../../../APIHits/urls';
import Header from '../../../components/Header';
import RNButton from '../../../components/RNButton';
import SettingBtn from '../../../components/SettingBtn';
import {Logout} from '../../../redux/Actions/authAction';
import {setSms_Alert, setPrivate_Alert} from '../../../redux/Actions/appAction';
import {fonts} from '../../../Themes/FontsConfig';
import Acknowledgements from '../../../components/Modals/Acknowledgements';
import LinearGradient from 'react-native-linear-gradient';
import {AppLoader} from '../../../components/RNLoader';
import {staticRules} from '../../../utiles/export';

const SettingScreen = ({navigation}) => {
    const {token, user} = useSelector((state) => state.authReducer);
    const {smsAlert, is_private} = useSelector((state) => state.appReducer);

    const dispatch = useDispatch();

    const {color} = useTheme();
    const {fontChange, cardInfo, theme_data} = useSelector((state) => state.appReducer,);
    // theme_data ? theme_data?.setting :
    const font = fonts(fontChange);
    const icons = AppIcons('black');
    const bgImage = theme_data?.bgImage;
    const [isLoading, setIsLoading] = useState(false);
    const [isPush, setIsPush] = useState(false);
    const [isPrivate, setIsPrivate] = useState(is_private);
    const [isAlert, setIsAlert] = useState(smsAlert);
    const [isReminder, setIsReminder] = useState(false);
    const [showModal, setShowModal] = useState(false);

    let cardNumber = cardInfo?.length != 0 ? `${cardInfo[0]?.brand}*****${cardInfo[0]?.last4}` : '';

    const User_Status_Update = async () => {
        setIsLoading(true);
        let data = new FormData();
        data.append('status', false);
        let res = await HitApi(USER_STATUS, 'POST', data, token);

        if (res?.status == 200) {
            navigation?.replace('Before');
            dispatch(Logout());
            setIsLoading(false);
        } else {
            Alert.alert('Error', res?.message);
            setIsLoading(false);
        }
    };

    const PravicySetting = async (params) => {
        const data = new FormData();
        data.append('is_private', params);
        let res = await HitApi(USER_PRIVATE_SETTING, 'put', data, token);

        if (res?.status == 200) {
            setIsPrivate(res?.data?.is_private);
            dispatch(setPrivate_Alert(res?.data?.is_private))
        } else {
            Alert.alert('Error', res?.message);
        }
    };

    const NotificationSetting = async (params) => {
        const data = new FormData();
        data.append('notification_alert', params);
        let res = await HitApi(USER_NOTIFICATION_SETTING, 'post', data, token);

        if (res?.status == 200) {
            setIsPush(res?.data?.notification);
        } else {
            Alert.alert('Error', res?.message);
        }
    };

    const DeleteAccount = async () => {
        Alert.alert('Delete Account', 'Are you sure to delete your account?', [{
            text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel',
        }, {
            text: 'Yes', onPress: async () => {
                setIsLoading(true);
                let res = await HitApi(`users/${user.id}`, 'delete', '', token);
                if (res.status == 200) {
                    dispatch(Logout());
                    navigation?.replace('Before');
                    setIsLoading(false);
                } else {
                    Alert.alert('Error', res?.message);
                    setIsLoading(false);
                }
            },
        },]);
    };

    useEffect(() => {
        setIsLoading(true);
        NotificationSetting('');
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

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
                        title="Settings"
                        isLeftIcon
                        isCenterText
                        isRightIcon
                        navigation={navigation}
                        fontSize={hp(2.2)}
                    />

                    <ScrollView>
                        <View style={{marginTop: hp(1)}}>
                            <SettingBtn
                                bgColor={color.g6}
                                icon={icons.SettingProfile}
                                boldText="Account Details"
                                lightText={user?.username || ''}
                                arrow={<RightArrow alignSelf="center"/>}
                                isSwith={false}
                                onPress={() => navigation.navigate('EditProfile', {
                                    item: user, img: user?.img,
                                })}
                            />
                            {Platform.OS === 'android' ? (<SettingBtn
                                    bgColor={color.g6}
                                    icon={icons.SettingBilling}
                                    boldText="Billing Details"
                                    lightText={cardNumber}
                                    arrow={<RightArrow alignSelf="center"/>}
                                    onPress={() => navigation.navigate('Payment')}
                                    isSwith={false}
                                />) : null}
                            <SettingBtn
                                bgColor={color.g6}
                                icon={icons.SettingNoti}
                                boldText="Push Notifications"
                                isSwith={true}
                                isToggle={isPush}
                                onToggle={() => {
                                    setIsPush(!isPush);
                                    NotificationSetting(!isPush);
                                }}
                            />
                            <SettingBtn
                                bgColor={color.g6}
                                icon={icons.SettingMsg}
                                boldText="Private Account"
                                isSwith={true}
                                isToggle={isPrivate}
                                onToggle={() => {
                                    setIsPrivate(!isPrivate);
                                    PravicySetting(!isPrivate);
                                }}
                            />
                            <SettingBtn
                                bgColor={color.g6}
                                icon={icons.SettingMsg}
                                boldText="SMS Alerts"
                                isSwith={true}
                                isToggle={isAlert}
                                onToggle={() => {
                                    setIsAlert(!isAlert);
                                    dispatch(setSms_Alert(isAlert));
                                }}
                            />
                            <SettingBtn
                                bgColor={color.g6}
                                icon={icons.SettingMail}
                                boldText="Email Reminders"
                                isSwith={true}
                                isToggle={isReminder}
                                onToggle={() => setIsReminder(!isReminder)}
                            />
                            <SettingBtn
                                bgColor={color.g6}
                                icon={icons.SettingSupport}
                                boldText="Support"
                                arrow={<RightArrow alignSelf="center"/>}
                                isSwith={false}
                                onPress={() => navigation.navigate('SupportScreen')}
                            />
                            <SettingBtn
                                bgColor={color.g6}
                                icon={icons.SettingSupport}
                                boldText="Blocked Users"
                                arrow={<RightArrow alignSelf="center"/>}
                                isSwith={false}
                                onPress={() => navigation.navigate('BlockedUsers')}
                            />
                            <SettingBtn
                                bgColor={color.g6}
                                icon={icons.Roles}
                                boldText="Rules & Regulation"
                                arrow={<RightArrow alignSelf="center"/>}
                                isSwith={false}
                                onPress={() => setShowModal(true)}
                            />
                            <SettingBtn
                                bgColor={color.g6}
                                icon={icons.AppTutorial}
                                boldText="App Tutorial"
                                arrow={<RightArrow alignSelf="center"/>}
                                isSwith={false}
                                onPress={() => navigation.navigate('AppTutorial')}
                            />
                            <SettingBtn
                                bgColor={color.g6}
                                icon={icons.DeleteAccount}
                                boldText="Delete Account"
                                arrow={<RightArrow alignSelf="center"/>}
                                onPress={DeleteAccount}
                            />
                        </View>
                    </ScrollView>

                    <RNButton
                        isLoading={isLoading}
                        clr1={color.r2}
                        clr2={color.r2}
                        textColor={color.white}
                        family={font.bold}
                        btnWidth={wp(90)}
                        btnHeight={hp(7.5)}
                        btnRadius={wp(10)}
                        btnVertical={hp(2)}
                        title={'Logout'}
                        borderWidth={0}
                        borderClr={color.r2}
                        onPress={() => User_Status_Update()}
                    />
                    {showModal && (<Acknowledgements
                            title={'Rules & Regulations'}
                            description={staticRules}
                            show={showModal}
                            hide={setShowModal}
                        />)}
                </ImageBackground>
            </LinearGradient>
            <AppLoader loader_color={color.white} loading={isLoading}/>
        </View>);
};

export default SettingScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
});
