import React, {useEffect, useRef, useState} from 'react';
import {
    ActivityIndicator, Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ImageView from 'react-native-image-viewing';
import {useTheme} from 'react-native-paper';
import {CHATURL} from '@env';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Cross from '../../../assets/svgs/lightCross.svg';
import ImageIcon from '../../../assets/svgs/image.svg';
import Send from '../../../assets/svgs/send.svg';
import Header from '../../components/Header';
import SupportMsgCard from '../../components/SupportMsgCard';
import {fonts} from '../../Themes/FontsConfig';
import {inputColor, textColor} from '../../utiles/themeSelectot';

import moment from 'moment';
import {useSelector} from 'react-redux';
import {HitApi} from '../../APIHits/APIHandler';
import {
    CREATE_NEW_SUPPORT_MESSAGE, GET_ALL_SUPPORTS_Messages,
} from '../../APIHits/urls';
import {AppLoader} from '../../components/RNLoader';
import {useActionCable, useChannel} from '../../utiles/Hooks';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {SvgUri} from 'react-native-svg';

const dummyImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';
const SupportChat = ({navigation, route}) => {
    const {color} = useTheme();
    const {fontChange, theme_data, app_Theme} = useSelector((state) => state.appReducer,);
    const font = fonts(fontChange);
    const {token} = useSelector((state) => state.authReducer);
    const {actionCable} = useActionCable(`${CHATURL}?token=${token}`);

    const {subscribe, unsubscribe} = useChannel(actionCable);
    const [isMsg, setIsMsg] = useState('');
    const [list, setList] = useState([]);
    const [profileImage, setProfileImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isState, setIsState] = useState(null);
    const [loading, setLoading] = useState(false);
    const {item} = route?.params;
    const flatlistRef = useRef();

    const bgImage = theme_data?.bgImage;
    const icons = theme_data?.nav_bar;

    useEffect(() => {
        getAllMessages();
        try {
            subscribe({
                channel: `ConversationsChannel`,
                channel_key: `conversation_${item?.conversation_id}`,
                conversation_id: item?.conversation_id,
            }, {
                received: (msg) => {
                    setList((pre) => [...pre, msg?.body]);
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

    const getAllMessages = async () => {
        setIsLoading(true);
        const data = new FormData();
        data.append('admin_user_id', 1);
        data.append('message_ticket', item?.message_ticket);

        let res = await HitApi(GET_ALL_SUPPORTS_Messages, 'post', data, token);

        if (res?.status == 200) {
            let Data = res?.data?.messages.sort(function compare(a, b) {
                var dateA = new Date(a?.created_at);
                var dateB = new Date(b?.created_at);
                return dateA - dateB;
            });
            setList(Data);
        } else if (res?.status == 404) {
            setList([]);
        } else {
            Alert.alert('Error', res?.message);
        }
        setIsLoading(false);
    };

    const onSend = async () => {
        setLoading(true);
        const data = new FormData();
        data.append('admin_user_id', 1);
        data.append('conversation_id', item?.conversation_id);
        data.append('body', isMsg);
        if (profileImage != null) {
            profileImage?.map((img) => {
                let imgObj = {
                    type: img.mime, uri: img.sourceURL || img.path, name: img.filename || img.mime,
                };
                data.append('message_images[]', imgObj);
            });
        }
        let res = await HitApi(CREATE_NEW_SUPPORT_MESSAGE, 'post', data, token);
        if (res?.status == 200) {
            setIsMsg('');
            setProfileImage(null);
            setLoading(false);
        } else {
            Alert.alert('Error', res?.message);
            setLoading(false);
        }
        handelScroll(list?.length - 1);
    };

    // ================== Image Picker ==========================
    const SelectImage = () => {
        ImagePicker.openPicker({
            cropping: true, media: 'photo', multiple: true, maxWidth: 500, maxHeight: 500, quality: 0.5,
        })
            .then(async (image) => {
                if (image?.length > 3) {
                    Alert.alert('Limit Alert', 'User can select max 3 pics');
                } else {
                    setProfileImage(image);
                }
            })
            .catch((err) => {
                return null;
            });
    };
    // ================= END ========================

    const ImageViwer = () => {
        return (<ImageView
            images={[{
                uri: isState?.uri,
            },]}
            imageIndex={0}
            visible={isState?.check}
            onRequestClose={() => setIsState({uri: '', check: false})}
            swipeToCloseEnabled={false}
            animationType="fade"
        />);
    };

    const RemoveImage = (index) => {
        setProfileImage([...profileImage.slice(0, index), ...profileImage.slice(index + 1),]);
    };

    const handelScroll = (index) => {
        flatlistRef.current.scrollToEnd({animated: true});
    };

    const placeholderColorCheck = () => {
        switch (app_Theme) {
            case 'ultra_rare9':
                return 'white';
                break;
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
                return color.g2;
                break;
        }
    };

    const textColorCheck = () => {
        switch (app_Theme) {
            case 'ultra_rare10':
                return inputColor(app_Theme);
                break;
            case 'ultra_rare11':
                return inputColor(app_Theme);
                break;
            case 'ultra_rare12':
                return inputColor(app_Theme);
                break;
            case 'ultra_rare13':
                return inputColor(app_Theme);
                break;
            case 'ultra_rare14':
                return inputColor(app_Theme);
                break;
            case 'ultra_rare15':
                return inputColor(app_Theme);
                break;

            default:
                return color.white;
                break;
        }
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
                <Header
                    title="Support"
                    isLeftIcon
                    isCenterText
                    isRightIcon
                    navigation={navigation}
                    fontSize={hp(2.2)}
                />
                {list.length == 0 ? (<View style={{flex: 1, justifyContent: 'center'}}>
                    <Text
                        style={{
                            alignSelf: 'center', color: color.g3, fontFamily: font.medium,
                        }}
                    >
                        No Messages
                    </Text>
                </View>) : (<FlatList
                    ref={flatlistRef}
                    onContentSizeChange={() => flatlistRef.current.scrollToEnd({animated: true})}
                    onLayout={() => flatlistRef.current.scrollToEnd({animated: true})}
                    data={list}
                    keyExtractor={(item, index) => `key-${index}${item}`}
                    renderItem={({item, index}) => {
                        return (<View key={item?.id + index}>
                            <SupportMsgCard
                                key={index}
                                status={item?.status || 'Pending'}
                                name={item?.sender_id ? item?.subject : item?.admin_user_name || 'Unknow'}
                                image={item?.sender_image || dummyImg}
                                code={moment(item?.created_at).format('MMM DD ,YYYY')}
                                message={item?.body || ''}
                                attachedImage={item?.message_images}
                                setIsLoading={setIsLoading}
                                setIsState={setIsState}
                            />
                        </View>);
                    }}
                    showsVerticalScrollIndicator={false}
                />)}

                {profileImage != null ? (<View style={{flexDirection: 'row'}}>
                    {profileImage?.map((i, index) => {
                        return (<View style={styles.mainImageView} key={index}>
                            <TouchableOpacity
                                disabled={loading}
                                style={styles.crossBtnStyle}
                                onPress={() => RemoveImage(index)}
                            >
                                <Cross alignSelf="center"/>
                            </TouchableOpacity>

                            <View
                                style={[styles.btnStyle1, {
                                    height: profileImage == null ? wp(13) : wp(30),
                                    marginTop: profileImage == null ? hp(5) : hp(2),
                                },]}
                            >
                                <FastImage
                                    source={{
                                        uri: Platform.OS === 'ios' ? i.sourceURL : i.path,
                                    }}
                                    style={styles.imageStyle}
                                />
                            </View>
                        </View>);
                    })}
                </View>) : null}

                <View style={styles.inputViewStyle}>
                    <TouchableOpacity
                        style={styles.btnStyle}
                        onPress={SelectImage}
                        disabled={loading}
                    >
                        {icons?.gallery ? (<SvgUri alignSelf="center" uri={icons?.gallery}/>) : (
                            <ImageIcon alignSelf="center"/>)}
                    </TouchableOpacity>
                    <View style={{...styles.inputStyle, backgroundColor: color.g8}}>
                        <TextInput
                            placeholder="Aa"
                            placeholderTextColor={placeholderColorCheck()}
                            style={{
                                width: '90%',
                                height: hp(6),
                                alignSelf: 'center',
                                color: textColorCheck(),
                                fontFamily: font.medium,
                            }}
                            onChangeText={(text) => setIsMsg(text)}
                            value={isMsg}
                            editable={!loading}
                        />
                    </View>
                    {loading ? (<ActivityIndicator animating={loading}/>) : (<TouchableOpacity
                        disabled={isMsg.replace(/\s+/g, '').length == 0 && profileImage == null ? true : false}
                        style={styles.btnStyle}
                        onPress={() => {
                            onSend();
                        }}
                    >
                        {icons?.send_support ? (<SvgUri alignSelf={'center'} uri={icons?.send_support}/>) : (
                            <Send alignSelf="center"/>)}
                    </TouchableOpacity>)}
                </View>
                <AppLoader loading={isLoading}/>
            </ImageBackground>
        </LinearGradient>
    </View>);
};

export default SupportChat;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    }, inputViewStyle: {
        height: hp(10), justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: wp(4),
    }, inputStyle: {
        width: wp(72), justifyContent: 'center', borderRadius: wp(10), height: hp(7), marginTop: hp(1),
    }, btnStyle: {
        justifyContent: 'center',
    }, mainImageView: {
        marginTop: hp(5), width: wp(32),
    }, crossBtnStyle: {
        position: 'absolute', right: 0, top: hp(2), width: wp(5), height: hp(5), zIndex: 1,
    }, btnStyle1: {
        justifyContent: 'center', width: wp(30), borderRadius: wp(5), zIndex: 0,
    }, imageStyle: {
        width: wp(28), height: wp(28), borderRadius: wp(3), alignSelf: 'center',
    },
});
