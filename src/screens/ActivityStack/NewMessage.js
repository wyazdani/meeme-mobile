import {debounce} from 'lodash';
import React, {useEffect, useState} from 'react';
import {
    Alert, FlatList, StyleSheet, TouchableOpacity, Text, TextInput, View, ImageBackground,
} from 'react-native';

import {useTheme} from 'react-native-paper';
import Cross from '../../../assets/svgs/lightCross.svg';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {HitApi} from '../../APIHits/APIHandler';
import {
    CREATE_CONVERSATION, CREATE_MESSAGES, SEARCH_USER,
} from '../../APIHits/urls';
import FoundUserCard from '../../components/Cards/FoundUserCard';
import ChatInput from '../../components/ChatInput';
import Header from '../../components/Header';
import MediaSelectionPopup from '../../components/Modals/MediaSelectionPopup';
import RNDrive from '../../components/RNDrive';
import {fonts} from '../../Themes/FontsConfig';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

const NewMessage = ({navigation}) => {
    const {color} = useTheme();
    const {fontChange, theme_data, app_Theme} = useSelector((state) => state.appReducer,);
    const {token, user} = useSelector((state) => state.authReducer);
    const font = fonts(fontChange);

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isMessage, setIsMessage] = useState('');
    const [mediaSelect, setMediaSelect] = useState(false);
    const [media, setMedia] = useState(null);
    const [conversation, setConversation] = useState(null);
    const [loading, setLoading] = useState(false);

    const bgImage = theme_data?.bgImage;

    const textColorCheck = () => {
        switch (app_Theme) {
            case 'ultra_rare10':
                return 'black';
                break;
            case 'ultra_rare11':
                return 'black';
                break;
            case 'ultra_rare12':
                return 'black';
                break;
            case 'ultra_rare13':
                return 'black';
                break;
            case 'ultra_rare14':
                return 'black';
                break;
            case 'ultra_rare15':
                return 'black';
                break;
            default:
                return color.white;
                break;
        }
    };

    useEffect(() => {
        HitApi(`${SEARCH_USER}?username=${''}`, 'GET', '', token)
            .then((res) => {
                if (res?.status == 200) {
                    setUsers(res?.data?.user);
                } else {
                    Alert.alert('Error', res?.message);
                }
            })
            .catch((e) => {
                let {message} = e;
                Alert.alert('Error', message);
            });
    }, []);

    const onSearchUser = debounce((value) => {
        HitApi(`${SEARCH_USER}?username=${value}`, 'GET', '', token)
            .then((res) => {
                if (res?.status == 200) {
                    setUsers(res?.data?.user);
                } else {
                    setUsers([]);
                }
            })
            .catch((e) => {
                let {message} = e;
                Alert.alert('Error', message);
            });
    }, 1000);

    // create conversation
    const onPressUser = async (selectedUser) => {
        setSelectedUser(selectedUser);
        setUsers([]);
        const id = selectedUser?.receiver_id != undefined ? selectedUser?.receiver_id : selectedUser?.id != undefined ? selectedUser?.id : selectedUser?.user_id != undefined ? selectedUser?.user_id : '';

        const data = new FormData();
        data.append('receiver_id', id);
        let res = await HitApi(CREATE_CONVERSATION, 'post', data, token);

        if (res?.status == 200) {
            // onPressSend(res?.data?.conversation)
            if (res?.data?.message == 'Conversation Exists') {
                navigation.replace('ChatScreen', {
                    selectedUser: {
                        ...res?.data?.conversation,
                        user_image: selectedUser?.user_image,
                        username: selectedUser?.username,
                    },
                });
            } else {
                setConversation(res?.data?.conversation);
            }
        }
    };

    // message send button
    const onPressSend = async () => {
        setLoading(true);
        const id = user?.id == conversation?.sender_id ? conversation?.receiver_id != undefined ? conversation?.receiver_id : conversation?.id != undefined ? conversation?.id : conversation?.user_id != undefined ? conversation?.user_id : '' : conversation?.sender_id != undefined ? conversation?.sender_id : conversation?.id != undefined ? conversation?.id : conversation?.user_id != undefined ? conversation?.user_id : '';

        const data = new FormData();
        data.append('conversation_id', conversation?.conversation_id || conversation?.id,);
        data.append('receiver_id', id);
        if (media != null) {
            data.append('message_images[]', media);
        }
        if (isMessage != null) {
            data.append('body', isMessage);
        }

        let res = await HitApi(CREATE_MESSAGES, 'post', data, token);

        if (res?.status == 200) {
            setIsMessage(null);
            setMedia(null);
            setLoading(false);
            navigation.replace('ChatScreen', {
                selectedUser: {
                    ...conversation, user_image: selectedUser?.user_image, username: selectedUser?.username,
                },
            });
        } else {
            Alert.alert('Error', res?.message);
            setLoading(false);
        }
    };

    return (<View style={{...styles.main, backgroundColor: color?.bgColor}}>
            <LinearGradient
                colors={[color.bgColor1, color.bgColor2]}
                style={styles.main}
                start={{y: 0, x: 0}}
                end={{y: 1, x: 0}}
            >
                <ImageBackground
                    source={// theme_data ? require('../../../assets/background.jpg') : null
                        {uri: bgImage}}
                    style={styles.main}
                    resizeMode="cover"
                >
                    <Header
                        title={'New Messages'}
                        isLeftIcon
                        isCenterText
                        isRightIcon
                        fontSize={hp(2.2)}
                        navigation={navigation}
                    />
                    <View style={styles.innerContainer}>
                        {/* search input  */}
                        <View
                            style={[styles.inputContainer, {backgroundColor: color?.g8}]}
                        >
                            <Text
                                style={[styles.textStyle, {
                                    color: textColorCheck(), fontFamily: font.medium,
                                },]}
                            >
                                To:
                            </Text>
                            <>
                                {selectedUser == null ? (<TextInput
                                        style={[styles.textInput, {
                                            color: textColorCheck(), fontFamily: font.regular,
                                        },]}
                                        onChangeText={(val) => onSearchUser(val)}
                                        placeholder={'Search here'}
                                        placeholderTextColor={color.g15}
                                    />) : (<View style={styles.selectedItemContainer}>
                                        <View
                                            style={[styles.selectedItemInner, {borderColor: color.g20},]}
                                        >
                                            <Text
                                                style={{color: color.g20, fontFamily: font.medium}}
                                            >
                                                {selectedUser?.username}
                                            </Text>
                                        </View>
                                    </View>)}
                            </>
                        </View>

                        {/* search results */}
                        <FlatList
                            data={users}
                            keyExtractor={(item, index) => `key-${index}${item}`}
                            style={{marginTop: hp(5)}}
                            renderItem={({item, index}) => (<>
                                    <FoundUserCard
                                        key={index}
                                        item={item}
                                        onPress={() => onPressUser(item)}
                                    />
                                    <RNDrive borderClr={'transparent'} marginVertical={hp(1.5)}/>
                                </>)}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={() => (<Text
                                    style={{
                                        color: color.g3,
                                        fontFamily: font.medium,
                                        alignSelf: 'center',
                                        marginVertical: hp(5),
                                    }}
                                >
                                    No Data Found
                                </Text>)}
                        />

                        {media != null ? (<View style={styles.mainImageView}>
                                <TouchableOpacity
                                    style={styles.crossBtnStyle}
                                    onPress={() => setMedia(null)}
                                >
                                    <Cross alignSelf="center"/>
                                </TouchableOpacity>

                                <View
                                    style={[styles.btnStyle, {
                                        height: media == null ? wp(13) : wp(30),
                                        marginTop: media == null ? hp(5) : hp(2),
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
                        {selectedUser != null && (<ChatInput
                                value={isMessage}
                                onChangeText={(text) => setIsMessage(text)}
                                onPressGallery={() => setMediaSelect(true)}
                                onPressSend={onPressSend}
                                disabled={isMessage?.replace(/\s+/g, '').length == 0 && media == null ? true : false}
                                media={media}
                                loading={loading}
                            />)}
                    </View>
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

export default NewMessage;

const styles = StyleSheet.create({
    main: {
        flex: 1,
    }, innerContainer: {
        flex: 1, marginHorizontal: wp(3), marginTop: hp(2),
    }, textInput: {
        width: wp(81), height: hp(6.5), marginStart: hp(2),
    }, textStyle: {
        marginStart: hp(3), fontSize: hp(1.8),
    }, inputContainer: {
        width: '100%', height: hp(7), borderRadius: hp(4), flexDirection: 'row', alignItems: 'center',
    }, selectedItemContainer: {
        justifyContent: 'center', marginStart: hp(2),
    }, selectedItemInner: {
        padding: hp(1.4), borderRadius: hp(3), justifyContent: 'center', alignItems: 'center', borderWidth: hp(0.1),
    }, btnStyle: {
        justifyContent: 'center', width: wp(30), borderRadius: wp(5), zIndex: 0,
    }, imageStyle: {
        width: wp(28), height: wp(28), borderRadius: wp(3), alignSelf: 'center',
    }, crossBtnStyle: {
        position: 'absolute', right: 0, top: hp(2), width: wp(5), height: hp(5), zIndex: 1,
    }, mainImageView: {
        marginTop: hp(5), width: wp(32),
    },
});
