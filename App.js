import React, {useEffect, useRef} from 'react';
import {
    StatusBar, SafeAreaView, Platform, TouchableOpacity, Text, View,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificationPopup from 'react-native-push-notification-popup';
import {WEB_CLIENT_ID_IOS, WEB_CLIENT_ID_ANDROID} from '@env';
import {PersistGate} from 'redux-persist/integration/react';
import MainStack from './src/navigations/stackNavigation';
import messaging from '@react-native-firebase/messaging';
import {MenuProvider} from 'react-native-popup-menu';
import {persistor, store} from './src/redux/index';
import FastImage from 'react-native-fast-image';
import {Provider} from 'react-redux';

const App = () => {
    let popup = useRef(null);

    let web_client_id = Platform.OS == 'ios' ? WEB_CLIENT_ID_IOS : WEB_CLIENT_ID_ANDROID;

    useEffect(() => {
        GetThemeName();
        GoogleSignin.configure({
            webClientId: web_client_id,
        });

        const unsubscribe = messaging().onMessage((remoteMessage) => {
            handleNotification(remoteMessage);
        });
        requestUserPermission();
        getToken();

        messaging()
            .getInitialNotification()
            .then((remoteMessage) => {
                if (remoteMessage) {
                    console.log('Notification caused app to open from quit state:', remoteMessage.notification,);
                }
            });
        return () => {
            unsubscribe();
        };
    }, []);

    const GetThemeName = async () => {
        theme = await AsyncStorage.getItem('theme');
    };

    const getToken = async () => {
        const token = await messaging().getToken();
        console.log('FCM Token:  ', token);
        AsyncStorage.setItem('fcmToken', token);
    };

    const requestUserPermission = async () => {
        await messaging().requestPermission();
    };

    // messaging().onTokenRefresh(async token => {});
    const handleNotification = (remoteMessage) => {
        popup.current.show({
            appIconSource: require('./assets/pngs/appLogo.png'),
            appTitle: 'Memee',
            title: remoteMessage.notification.title,
            body: remoteMessage.notification.body,
            slideOutTime: 3000,
        });
    };

    const renderCustomPopup = ({title, body}) => (<TouchableOpacity style={styles.popUpStyle}>
        <View style={styles.popUpHeaderStyle}>
            <View style={styles.mergeStyle}>
                <FastImage
                    source={require('./assets/pngs/appLogo.png')}
                    resizeMode="contain"
                    style={styles.notiIcon}
                />
                <Text style={styles.titleStyle} numberOfLines={1}>
                    {title}
                </Text>
            </View>
            <Text style={styles.nowStyle}>Now</Text>
        </View>
        <Text style={styles.bodyStyle} numberOfLines={2}>
            {body}
        </Text>
    </TouchableOpacity>);

    return (<Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <StatusBar backgroundColor="black" barStyle={'light-content'}/>
            <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
                <MenuProvider>
                    <MainStack/>
                    <NotificationPopup
                        ref={popup}
                        renderPopupContent={renderCustomPopup}
                        shouldChildHandleResponderStart={true}
                        shouldChildHandleResponderMove={true}
                    />
                </MenuProvider>
            </SafeAreaView>
        </PersistGate>
    </Provider>);
};

export default App;

const styles = {
    popUpStyle: {
        backgroundColor: 'black', borderRadius: 12, borderWidth: 1, borderColor: '#BABABA', marginTop: hp(-5),
    }, popUpHeaderStyle: {
        padding: 4,
        backgroundColor: '#2B2B2B',
        flexDirection: 'row',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        justifyContent: 'space-between',
    }, notiIcon: {width: 22, height: 22, borderTopLeftRadius: 12}, titleStyle: {
        color: 'white', fontSize: 12, fontWeight: 'bold', marginLeft: 10, alignSelf: 'center', width: '80%',
    }, bodyStyle: {color: 'white', fontSize: 13, padding: 10}, mergeStyle: {flexDirection: 'row', flex: 1}, nowStyle: {
        color: 'white', alignSelf: 'center', fontSize: 12, marginHorizontal: 5,
    },
};
