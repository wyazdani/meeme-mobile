import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {
    Alert, FlatList, StyleSheet, ActivityIndicator, Text, TouchableOpacity, View, ImageBackground,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {CHATURL} from '@env';
import ImageView from 'react-native-image-viewing';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from 'react-native-paper';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {HitApi} from '../../APIHits/APIHandler';
import {
    CREATE_MESSAGES, GET_INDIVIDUAL_MESSAGES, USER_NOTIFICATION_SETTING,
} from '../../APIHits/urls';
import ChatHeader from '../../components/ChatHeader';
import ChatInput from '../../components/ChatInput';
import MediaSelectionPopup from '../../components/Modals/MediaSelectionPopup';
import { AppLoader } from '../../components/RNLoader';
import { fonts } from '../../Themes/FontsConfig';
import { useActionCable, useChannel } from '../../utiles/Hooks';
import Cross from '../../../assets/svgs/lightCross.svg';

const ChatScreen = ({navigation, route}) => {
    const {selectedUser, profileImage} = route.params;
    const {token, user} = useSelector((state) => state.authReducer);
    const {color} = useTheme();
    const {fontChange, theme_data} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);

    const [isState, setIsState] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isMessage, setIsMessage] = useState('');
    const [mediaSelect, setMediaSelect] = useState(false);
    const [media, setMedia] = useState(null);
    const [allMessages, setAllMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const {actionCable} = useActionCable(`${CHATURL}?token=${token}`);

    const bgImage = theme_data?.bgImage;
    const icons = theme_data?.nav_bar;

    const {subscribe, unsubscribe} = useChannel(actionCable);

    useFocusEffect(useCallback(() => {
        notificationPaused(false);
        getIndividualMessages();
        return () => {
            notificationPaused(true);
        };
    }, [navigation]),);

    useEffect(() => {
        try {
            subscribe({
                channel: `ConversationsChannel`,
                channel_key: `conversation_${selectedUser?.conversation_id || selectedUser?.id}`,
                conversation_id: selectedUser?.conversation_id || selectedUser?.id,
            }, {
                received: (msg) => {
                    handleMessageObj(msg);
                }, connected: () => {
                    console.log('Connected');
                },
            },);
        } catch (err) {
            console.log('err', err);
        }

        return () => {
            unsubscribe();
        };
    }, []);

    const handleMessageObj = (msg) => {
        setAllMessages((allMessages) => [msg?.body, ...allMessages]);
    };

    const notificationPaused = async (check) => {
        const data = new FormData();
        data.append('notification_alert', check);
        let res = await HitApi(USER_NOTIFICATION_SETTING, 'post', data, token);

        if (res?.status == 200) {
            return null;
        } else {
            Alert.alert('Error', res?.message);
        }
    };

    const ImageViwer = () => {
        return (<ImageView
                images={[{uri: isState?.uri}]}
                imageIndex={0}
                visible={isState?.check}
                onRequestClose={() => setIsState({uri: '', check: false})}
                swipeToCloseEnabled={false}
                animationType="fade"
            />);
    };

    // sender and receiver views
    const renderChatBubbles = ({item, index}) => {
        return (<>
                {item.sender_id === user?.id ? (// Sender view
                    <View style={styles.senderBubble}>
                        <View style={styles.bubbleInnerContainer}>
                            <LinearGradient
                                colors={[color.linerClr1, color.linerClr2]}
                                style={styles.senderBubbleStyles}
                                start={{y: 0, x: 0.0}}
                                end={{y: 0.9, x: 0.0}}
                            >
                                {item?.body != '' ? (<Text style={{fontFamily: font.regular, color: color.bl1}}>
                                        {item?.body}
                                    </Text>) : null}
                                {item?.message_images?.length != 0 ? (<TouchableOpacity
                                        style={{alignSelf: 'center', marginBottom: hp(-2.3)}}
                                        onPress={() => setIsState({
                                            uri: item?.message_images[0]?.message_image || item?.message_images[0],
                                            check: true,
                                        })}
                                    >
                                        <FastImage
                                            source={{
                                                uri: item?.message_images[0]?.message_image || item?.message_images[0],
                                            }}
                                            style={styles.imageStyle1}
                                            resizeMode="cover"
                                        />
                                        <View style={styles.activityIndicator}>
                                            <ActivityIndicator size={'small'} color={color.white}/>
                                        </View>
                                    </TouchableOpacity>) : null}
                            </LinearGradient>
                            <Text style={[styles.sendingTime, {color: color.g16}]}>
                                {moment(item?.created_at).format('hh:mm A')}
                            </Text>
                        </View>
                    </View>) : (// Receiver view
                    <View style={styles.receiverBubble}>
                        <View style={styles.bubbleInnerContainer}>
                            <View
                                style={[styles.receiverBubbleStyles, {backgroundColor: color.g8},]}
                            >
                                {item?.body != '' ? (<Text
                                        style={{fontFamily: font.regular, color: color.white}}
                                    >
                                        {item?.body}
                                    </Text>) : null}
                                {item?.message_images?.length != 0 ? (<TouchableOpacity
                                        activeOpacity={0.9}
                                        style={{alignSelf: 'center', marginBottom: hp(-2.3)}}
                                        onPress={() => setIsState({
                                            uri: item?.message_images[0]?.message_image || item?.message_images[0],
                                            check: true,
                                        })}
                                    >
                                        <FastImage
                                            source={{
                                                uri: item?.message_images[0]?.message_image || item?.message_images[0],
                                            }}
                                            style={styles.imageStyle1}
                                            resizeMode="cover"
                                        />
                                        <View style={styles.activityIndicator}>
                                            <ActivityIndicator size={'small'} color={color.white}/>
                                        </View>
                                    </TouchableOpacity>) : null}
                            </View>
                            <Text style={[styles.receivingTime, {color: color.g16}]}>
                                {moment(item?.created_at).format('hh:mm A')}
                            </Text>
                        </View>
                    </View>)}
            </>);
    };

    // message send button
    const onPressSend = async () => {
        setLoading(true);
        const id = user?.id == selectedUser?.sender_id ? selectedUser?.receiver_id != undefined ? selectedUser?.receiver_id : selectedUser?.id != undefined ? selectedUser?.id : selectedUser?.user_id != undefined ? selectedUser?.user_id : '' : selectedUser?.sender_id != undefined ? selectedUser?.sender_id : selectedUser?.id != undefined ? selectedUser?.id : selectedUser?.user_id != undefined ? selectedUser?.user_id : '';

        const data = new FormData();
        data.append('conversation_id', selectedUser?.conversation_id || selectedUser?.id,);
        data.append('receiver_id', id);
        if (media != null) {
            data.append('message_images[]', media);
        }
        data.append('body', isMessage);
        console.log("from data",data);

        let res = await HitApi(CREATE_MESSAGES, 'post', data, token);
            console.log("res",JSON.stringify(res,null,2));
        if (res?.status == 200) {
            setIsMessage('');
            setMedia(null);
            setLoading(false);
           await getIndividualMessages()
        } else {
            Alert.alert('Error', res?.message);
            setLoading(false);
        }
    };

    // get individual messages
    const getIndividualMessages = async () => {
        setIsLoading(true);
        const id = user?.id == selectedUser?.sender_id ? selectedUser?.receiver_id != undefined ? selectedUser?.receiver_id : selectedUser?.id != undefined ? selectedUser?.id : selectedUser?.user_id != undefined ? selectedUser?.user_id : '' : selectedUser?.sender_id != undefined ? selectedUser?.sender_id : selectedUser?.id != undefined ? selectedUser?.id : selectedUser?.user_id != undefined ? selectedUser?.user_id : '';

        let res = await HitApi(`${GET_INDIVIDUAL_MESSAGES}?receiver_id=${id}`, 'GET', '', token,);
          console.log("GET_INDIVIDUAL_MESSAGES",JSON.stringify(res,null,2));
        if (res?.status == 200) {
            setAllMessages(res?.data?.messages);
            setIsLoading(false);
        } else if (res?.status == 404) {
            setAllMessages([]);
            setIsLoading(false);
        } else {
            setIsLoading(false);
            Alert.alert('Error', res?.message);
        }
    };

    const openUserProfile = () => {
        navigation.navigate('OtherUserProfile', {
            item: user?.id == selectedUser?.sender_id ? selectedUser?.receiver_id : selectedUser?.sender_id,
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
                    {ImageViwer()}
                    {/* header */}
                    <ChatHeader
                        navigation={navigation}
                        userName={user?.id == selectedUser?.sender_id ? selectedUser?.receiver_name || selectedUser?.username : selectedUser?.sender_name || selectedUser?.username}
                        receiverImage={user?.id == selectedUser?.sender_id ? selectedUser?.receiver_image || selectedUser?.user_image || profileImage : selectedUser?.sender_image || selectedUser?.user_image || profileImage}
                        status={user?.id == selectedUser?.sender_id ? selectedUser?.receiver_active_status : selectedUser?.sender_active_status}
                        onPressUser={() => openUserProfile()}
                    />
                    <View style={styles.innerContainer}>
                        {allMessages?.length > 0 ? (<FlatList
                                inverted
                                data={allMessages}
                                extraData={allMessages}
                                renderItem={renderChatBubbles}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                            />) : (<View style={styles.noRecordsContainer}>
                                <Text
                                    style={[styles.noRecords, {color: color.g3, fontFamily: font.medium},]}
                                >
                                    {'No Messages found'}
                                </Text>
                            </View>)}
                    </View>
                    {media != null ? (<View style={styles.mainImageView}>
                            <TouchableOpacity
                                disabled={loading}
                                style={styles.crossBtnStyle}
                                onPress={() => setMedia(null)}
                            >
                                <Cross alignSelf="center"/>
                            </TouchableOpacity>

                            <View
                                style={[styles.btnStyle, {
                                    height: media == null ? wp(13) : wp(30), marginTop: media == null ? hp(5) : hp(2),
                                },]}
                            >
                                <FastImage
                                    source={{
                                        uri: media.uri,
                                    }}
                                    style={styles.imageStyle}
                                />
                            </View>
                        </View>) : null}

                    {/* input and media for messages  */}
                    <ChatInput
                        value={isMessage}
                        onChangeText={(text) => setIsMessage(text)}
                        onPressGallery={() => setMediaSelect(true)}
                        onPressSend={onPressSend}
                        disabled={isMessage.replace(/\s+/g, '').length == 0 && media == null ? true : false}
                        media={media}
                        loading={loading}
                        icons={icons}
                    />

                    <AppLoader loading={isLoading}/>
                    <MediaSelectionPopup
                        isVisible={mediaSelect}
                        navigation={navigation}
                        setMediaSelect={setMediaSelect}
                        screenName="CreateSupport"
                        setImg={setMedia}
                        mediaType="photo"
                    />
                </ImageBackground>
            </LinearGradient>
        </View>);
};

export default ChatScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    }, innerContainer: {
        flex: 1, marginHorizontal: wp(4),
    }, noRecordsContainer: {
        flex: 1, alignItems: 'center', justifyContent: 'center',
    }, noRecords: {
        marginBottom: hp(10),
    }, senderBubble: {
        width: '100%', flexDirection: 'row', justifyContent: 'flex-end',
    }, sendingTime: {
        right: wp('4'), width: '105%', textAlign: 'right', fontSize: hp(1.4), marginTop: hp(1),
    }, bubbleInnerContainer: {
        width: '70%', marginVertical: hp(1),
    }, senderBubbleStyles: {
        padding: hp(2), maxWidth: '100%', borderRadius: 15, borderBottomRightRadius: 0,
    }, receiverBubble: {
        width: '100%', flexDirection: 'row',
    }, receiverBubbleStyles: {
        padding: hp(2), maxWidth: '100%', borderRadius: 15, borderBottomStartRadius: 0, backgroundColor: 'red',
    }, receivingTime: {
        width: '105%', fontSize: hp(1.4), marginTop: hp(1),
    }, btnStyle: {
        justifyContent: 'center', width: wp(30), borderRadius: wp(5), zIndex: 0,
    }, imageStyle: {
        width: wp(28), height: wp(28), borderRadius: wp(3), alignSelf: 'center',
    }, crossBtnStyle: {
        position: 'absolute', right: 0, top: hp(2), width: wp(5), height: hp(5), zIndex: 1,
    }, mainImageView: {
        marginTop: hp(5), width: wp(32),
    }, activityIndicator: {
        position: 'absolute', top: 0, bottom: 0, alignSelf: 'center', justifyContent: 'center', zIndex: 0,
    }, imageStyle1: {
        width: wp(60), height: wp(30), borderRadius: wp(1), marginVertical: hp(2), zIndex: 1,
    },
});
