import React, {useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import StartScreen from '../screens/AuthScreens/StartScreen';
import SplashScreen from '../screens/AuthScreens/SplashScreen';
import SignInScreen from '../screens/AuthScreens/SignInScreen';
import SignUpScreen from '../screens/AuthScreens/SignupScreen';
import UploadProfile from '../screens/AuthScreens/UploadProfile';
import PrivacyPolicy from '../screens/AuthScreens/PrivacyPolicy';
import TermsAndCondition from '../screens/AuthScreens/TermsAndCondition';
import ForgotPassword from '../screens/AuthScreens/ForgotPassword';
import VerifyEmail from '../screens/AuthScreens/VerifyEmail';
import PasswordReset from '../screens/AuthScreens/PasswordReset';
import BottomTabScreen from './BottomTabNavigation';
import CommentScreen from '../screens/AppScreens/CommentScreen';
import {themeSelector} from '../utiles/themeSelectot';
import ExploreTabStack from '../screens/ExploreTabStack';
import CreateMemee from '../screens/AppScreens/CreateMemeeScreen';
import TournamentTabStack from '../screens/TournamentTabStack';
import EditProfile from '../screens/AppScreens/EditProfileScreen';
import SettingScreen from '../screens/AppScreens/SettingScreen';
import OtherUserProfile from '../screens/AppScreens/OtherUserProfile';
import OpenPost from '../screens/AppScreens/OpenPost';
import SupportScreen from '../screens/SupportStack/SupportScreen';
import CreateNewTicket from '../screens/SupportStack/CreateNewTicket';
import BuyCoins from '../screens/AppScreens/BuyCoins/BuyCoins';
import SupportChat from '../screens/SupportStack/SupportChat';
import Activities from '../screens/ActivityStack/Activities';
import FollowRequest from '../screens/ActivityStack/FollowRequest';
import PaymentScreen from '../screens/PaymentsStack/PaymentScreen';
import CreateTournamentMemee from '../screens/TournamentTabStack/CreateTournamentMemee';
import ShopeScreen from '../screens/StoreStack/ShopScreen';
import NewMessage from '../screens/ActivityStack/NewMessage';
import ChatScreen from '../screens/ActivityStack/ChatScreen';
import VideoPlay from '../screens/AppScreens/VideoPlayScreen';
import OrganizeBadges from '../screens/BadgesStack';
import {HitApi} from '../APIHits/APIHandler';
import {USER_STATUS} from '../APIHits/urls';
import AppTutorial from '../screens/AppScreens/AppTutorial';
import FollowingList from '../screens/AppScreens/FollowingList';
import FollowerList from '../screens/AppScreens/FollowerList';
import BlockedUsers from '../screens/AppScreens/BlockedUsers';

const RootStack = createNativeStackNavigator();

const MainStack = () => {
    const {app_Theme} = useSelector((state) => state.appReducer);
    const {token} = useSelector((state) => state.authReducer);
    const appState = useRef(AppState.currentState);
    const [isAppState, setIsAppState] = useState(true);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            appState.current = nextAppState;

            let state = appState.current == 'active' ? true : false;
            setIsAppState(state);
            if (token != null) {
                User_Status_Update(state);
            }
        });

        return () => {
            subscription.remove();
        };
    }, []);

    const User_Status_Update = async (state) => {
        let data = new FormData();
        data.append('status', state);
        let res = await HitApi(USER_STATUS, 'POST', data, token);
        if (res?.status == 200) {
            console.log('Update user status--', res?.data, res?.status);
        } else {
            console.log('Update user status fail--', res);
        }
    };

    return (
        <PaperProvider theme={themeSelector(app_Theme)}>
            <NavigationContainer>
                <RootStack.Navigator
                    initialRouteName="Splash"
                    screenOptions={{
                        gestureEnabled: true,
                        headerMode: 'none',
                        headerShown: false,
                        animation: 'slide_from_right',
                    }}
                >
                    <RootStack.Screen name={'Splash'} component={SplashScreen}/>
                    <RootStack.Screen
                        name={'Before'}
                        component={BeforeLoginAppContainer}
                    />
                    <RootStack.Screen name={'After'} component={AfterLoginAppContainer}/>
                </RootStack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
};
export default MainStack;

const AfterLoginAppContainer = () => {
    return (
        <KeyboardAwareScrollView
            enableOnAndroid={false}
            enableAutomaticScroll={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1, backgroundColor: 'black'}}
            style={{flex: 1, backgroundColor: 'black'}}
        >
            <RootStack.Navigator
                screenOptions={{
                    headerMode: 'none',
                    headerShown: false,
                    animation: 'slide_from_right',
                }}
            >
                <RootStack.Screen name={'BottomTab'} component={BottomTabScreen}/>
                <RootStack.Screen
                    name={'CommentScreen'}
                    component={CommentScreen}
                    options={{gestureEnabled: false}}
                />
                <RootStack.Screen name={'CreateMemeeScreen'} component={CreateMemee}/>

                <RootStack.Screen
                    name={'ExploreTabStack'}
                    component={ExploreTabStack}
                />
                <RootStack.Screen
                    name={'TournamentTabStack'}
                    component={TournamentTabStack}
                />
                <RootStack.Screen
                    name={'EditProfile'}
                    component={EditProfile}
                    options={{gestureEnabled: false}}
                />
                <RootStack.Screen name={'SettingScreen'} component={SettingScreen}/>
                <RootStack.Screen
                    name={'OtherUserProfile'}
                    component={OtherUserProfile}
                />
                <RootStack.Screen name={'OpenPost'} component={OpenPost}/>
                <RootStack.Screen
                    name={'SupportScreen'}
                    component={SupportScreen}
                    options={{gestureEnabled: false}}
                />
                <RootStack.Screen
                    name={'CreateNewTicket'}
                    component={CreateNewTicket}
                    options={{gestureEnabled: false}}
                />
                <RootStack.Screen name={'BuyCoins'} component={BuyCoins}/>
                <RootStack.Screen
                    name={'SupportChat'}
                    component={SupportChat}
                    options={{gestureEnabled: false}}
                />

                <RootStack.Screen
                    name={'NewMessage'}
                    component={NewMessage}
                    options={{gestureEnabled: false}}
                />
                <RootStack.Screen
                    name={'ChatScreen'}
                    component={ChatScreen}
                    options={{gestureEnabled: false}}
                />

                <RootStack.Screen name={'ActivitiesScreen'} component={Activities}/>
                <RootStack.Screen name={'FollowRequest'} component={FollowRequest}/>
                <RootStack.Screen
                    name={'Payment'}
                    component={PaymentScreen}
                    options={{gestureEnabled: false}}
                />
                <RootStack.Screen
                    name={'CreateTournamentMemee'}
                    component={CreateTournamentMemee}
                />
                <RootStack.Screen name={'StoreScreen'} component={ShopeScreen}/>
                <RootStack.Screen name={'VideoPlay'} component={VideoPlay}/>
                <RootStack.Screen name={'AppTutorial'} component={AppTutorial}/>
                <RootStack.Screen name={'FollowingList'} component={FollowingList}/>
                <RootStack.Screen name={'FollowerList'} component={FollowerList}/>
                <RootStack.Screen
                    name={'BlockedUsers'}
                    component={BlockedUsers}
                    options={{gestureEnabled: false}}
                />
                <RootStack.Screen
                    options={{gestureEnabled: false}}
                    name={'OrganizeBadges'}
                    component={OrganizeBadges}
                />
            </RootStack.Navigator>
        </KeyboardAwareScrollView>
    );
};

const BeforeLoginAppContainer = () => {
    return (
        <KeyboardAwareScrollView
            enableOnAndroid
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1, backgroundColor: 'black'}}
            style={{flex: 1, backgroundColor: 'black'}}
        >
            <RootStack.Navigator
                screenOptions={{
                    headerMode: 'none',
                    headerShown: false,
                    animation: 'slide_from_right',
                }}
            >
                <RootStack.Screen
                    name="StartScreen"
                    component={StartScreen}
                    options={{gestureEnabled: false}}
                />
                <RootStack.Screen
                    name="SignInScreen"
                    component={SignInScreen}
                    options={{gestureEnabled: false}}
                />
                <RootStack.Screen
                    name="SignUpScreen"
                    component={SignUpScreen}
                    options={{gestureEnabled: false}}
                />
                <RootStack.Screen
                    name="UploadProfile"
                    component={UploadProfile}
                    options={{gestureEnabled: false}}
                />
                <RootStack.Screen
                    name="PrivacyPolicy"
                    component={PrivacyPolicy}
                    options={{gestureEnabled: false}}
                />
                <RootStack.Screen
                    name="TermsAndCondition"
                    component={TermsAndCondition}
                />
                <RootStack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                    options={{gestureEnabled: false}}
                />
                <RootStack.Screen
                    name="VerifyEmail"
                    component={VerifyEmail}
                    options={{gestureEnabled: false}}
                />
                <RootStack.Screen
                    name="PasswordReset"
                    component={PasswordReset}
                    options={{gestureEnabled: false}}
                />
            </RootStack.Navigator>
        </KeyboardAwareScrollView>
    );
};
