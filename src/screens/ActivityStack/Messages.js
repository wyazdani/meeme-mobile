import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
    Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from 'react-native-paper';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {HitApi} from '../../APIHits/APIHandler';
import {CREATE_MESSAGES, USER_NOTIFICATION_SETTING} from '../../APIHits/urls';
import MessagesCard from '../../components/Cards/MessagesCard';
import {AppLoader} from '../../components/RNLoader';
import {fonts} from '../../Themes/FontsConfig';
import {SvgUri} from 'react-native-svg';

const Messages = ({navigation}) => {
    const {token, user} = useSelector((state) => state.authReducer);
    const {color} = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const {fontChange, theme_data} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);

    const bgImage = theme_data?.bgImage;
    const icons = theme_data?.nav_bar;

    useFocusEffect(useCallback(() => {
        getConversations();
        notificationPaused();
    }, [navigation]),);

    const notificationPaused = async () => {
        const data = new FormData();
        data.append('notification_alert', true);
        let res = await HitApi(USER_NOTIFICATION_SETTING, 'post', data, token);
        if (res?.status == 200) {
        } else {
            Alert.alert('Error', res?.message);
        }
    };

    // get conversations
    const getConversations = async () => {
        setIsLoading(true);
        let res = await HitApi(CREATE_MESSAGES, 'GET', '', token);

        if (res?.status == 200) {
            setData(res?.data?.messages);
            setIsLoading(false);
        } else if (res?.status == 404) {
            setData([]);
            setIsLoading(false);
        } else {
            setIsLoading(false);
            Alert.alert('Error', res?.message);
        }
    };

    const onPressChat = (item) => {
        navigation.navigate('ChatScreen', {
            selectedUser: item,
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
                    source={// theme_data ? require('../../../assets/background.jpg') : null
                        {uri: bgImage}}
                    style={styles.mainContainer}
                    resizeMode="cover"
                >
                    <>
                        {data?.length == 0 ? (<View style={styles.noMessages}>
                                <Text style={{color: color.g3, fontFamily: font.medium}}>
                                    No Messages
                                </Text>
                            </View>) : (<View style={{marginHorizontal: wp(5)}}>
                                <FlatList
                                    data={data}
                                    keyExtractor={(item, index) => `key-${index}${item}`}
                                    renderItem={({item, index}) => {
                                        return (<MessagesCard
                                                status={user?.id == item?.sender_id ? item?.receiver_active_status : item?.sender_active_status}
                                                item={item}
                                                purpose="arrow"
                                                onPress={() => onPressChat(item)}
                                                navigation={navigation}
                                            />);
                                    }}
                                    showsVerticalScrollIndicator={false}
                                />
                            </View>)}
                    </>

                    {/* create new message  */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('NewMessage')}
                        activeOpacity={0.8}
                        style={styles.createButtonContainer}
                    >
                        <LinearGradient
                            colors={[color.linerClr1, color.linerClr2]}
                            style={styles.gradientStyle}
                            start={{y: 0, x: 0.0}}
                            end={{y: 0.9, x: 0.0}}
                        >
                            <View style={styles.buttonStyle}>
                                {icons?.edit ? (<SvgUri alignSelf="center" uri={icons?.edit}/>) : (<Image
                                        style={[styles.editIcon, {tintColor: color.white}]}
                                        source={require('../../../assets/pngs/editIcon.png')}
                                    />)}
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                    <AppLoader loading={isLoading}/>
                </ImageBackground>
            </LinearGradient>
        </View>);
};

export default Messages;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    }, createButtonContainer: {
        alignSelf: 'center', position: 'absolute', bottom: hp(3), right: hp(3),
    }, gradientStyle: {
        shadowOffset: {
            width: 0, height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: hp(10),
    }, buttonStyle: {
        width: wp(17), height: wp(17), justifyContent: 'center', alignItems: 'center',
    }, editIcon: {
        width: wp(5), height: wp(5), resizeMode: 'contain',
    }, noMessages: {
        flex: 0.85, alignSelf: 'center', justifyContent: 'center',
    },
});
