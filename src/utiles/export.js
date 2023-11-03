import {Alert, Image, StyleSheet} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Toast from 'react-native-simple-toast';
import appleAuth from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {bottomICons} from './dummyData';
import {Login} from '../redux/Actions/authAction';
import {SetJudgeCount_Coins} from '../redux/Actions/appAction';
import {HitApi} from '../APIHits/APIHandler';
import {SOCIALLOGIN} from '../APIHits/urls';

const checkConnected = async () => {
    const state = await NetInfo.fetch();
    return state.isConnected;
};

const onGoogleButtonPress = async (fcmToken, dispatch, setIsLoading, navigation,) => {
    try {
        await GoogleSignin.hasPlayServices();
        const {idToken} = await GoogleSignin.signIn();
        const data = new FormData();
        data.append('provider', 'google');
        data.append('token', idToken);
        data.append('mobile_token', fcmToken);
        console.log("from data google",data);
        let res = await HitApi(SOCIALLOGIN, 'post', data);
        if (res?.status == 200) {
            var userInfo = {
                ...res?.data?.user, img: res?.data?.profile_image,
            };
            dispatch(Login(userInfo, res?.data?.token));
            dispatch(SetJudgeCount_Coins(res?.data?.user?.coins, 0));
            Toast.showWithGravity('User successfully login', Toast.SHORT, Toast.BOTTOM,);
            setIsLoading(false);
            GoogleSignin.signOut();
            navigation.replace('After');
        } else {
            setIsLoading(false);
            GoogleSignin.signOut();
        }
    } catch (e) {
        setIsLoading(false);
        GoogleSignin.signOut();
        Toast.showWithGravity('User cancelled the signin request ', Toast.SHORT, Toast.BOTTOM,);
    }
};

const onFacebookButtonPress = async () => {
    try {
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email',]);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken,);

        let obj = {
            status: 1, accessToken: data.accessToken, data: facebookCredential,
        };
        return obj;
    } catch (err) {
        Alert.alert('Error', 'User Cancelled the Login Flow');
        let {error, message} = err;
        let obj = {
            status: 0, error: error, message: message,
        };
        return obj;
    }
};

const onAppleButtonPress = async (fcmToken, dispatch, setIsLoading, navigation,) => {
    // performs login request
    try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN, // Note: it appears putting FULL_NAME first is important, see issue #293
            requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        });
        const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user,);
        // use credentialState response to ensure the user is authenticated
        if (credentialState === appleAuth.State.AUTHORIZED) {
            // user is authenticated
            const data = new FormData();
            data.append('provider', 'apple');
            data.append('token', appleAuthRequestResponse.identityToken);
            data.append('mobile_token', fcmToken);
            console.log("form data",data);
            let res = await HitApi(SOCIALLOGIN, 'post', data);

            if (res?.status == 200) {
                var userInfo = {
                    ...res?.data?.user, img: res?.data?.profile_image,
                };
                console.log("res?.data?.token",res?.data?.token);
                console.log("res?.data>>>>>",res?.data);
                dispatch(Login(userInfo, res?.data?.token));
                dispatch(SetJudgeCount_Coins(res?.data?.user?.coins, 0));
                Toast.showWithGravity('User successfully login', Toast.SHORT, Toast.BOTTOM,);
                setIsLoading(false);
                navigation.replace('After');
            } else {
                setIsLoading(false);
                Toast.showWithGravity(res.message, Toast.SHORT, Toast.BOTTOM);
            }
        }
    } catch (e) {
        setIsLoading(false);
        Toast.showWithGravity(e.message, Toast.SHORT, Toast.BOTTOM);
    }
};

const coinConvert = (coins) => {
    let coin = coins;

    if (coin >= 1000000) {
        if (coin % 1000000 == 0) {
            coin = `${coin / 1000000}M`;
            return coin;
        } else {
            coin = `${(coin / 1000000).toFixed(1)}M`;
            return coin;
        }
    } else if (coin >= 1000) {
        if (coin % 1000 == 0) {
            coin = `${coin / 1000}K`;
            return coin;
        } else {
            coin = `${(coin / 1000).toFixed(1)}K`;
            return coin;
        }
    } else {
        return coin;
    }
};

const staticRules = [`1. Meme user can post their memes and join the tournament.\n\n2. To qualify for coin rewards, you need to judge 100 memes per day.\n\n3. The judging of memes resets daily.\n\n4. You need to have the highest number of likes to win the tournament.\n\n5. Meme Users will have a chance to win Amazon Gift cards or coins when they are the successful winner of the tournament. First, second and third in votes will win Amazon Gift cards, while the 4th to 10th place will get Memee coins.\n\n6. Apple is not involved in any activity of tournament.`,];

const BottomTabCenterICon = ({themeName, icon}) => {
    let res = bottomICons.find((e) => e.name == themeName);
    let resizeMode;
    switch (themeName) {
        case 'space':
            resizeMode = 'cover';
            break;
        default:
            resizeMode = 'contain';
            break;
    }
    return (<Image
        source={icon ? {uri: icon} : res.src}
        style={[styles.iconStyles]}
        resizeMode={resizeMode}
    />);
};

const styles = StyleSheet.create({
    iconStyles: {
        width: wp(20), height: hp(13),
    },
});

export {
    coinConvert,
    BottomTabCenterICon,
    onAppleButtonPress,
    onFacebookButtonPress,
    onGoogleButtonPress,
    checkConnected,
    staticRules,
};
