import React, {useState} from 'react';
import {
    Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground,
} from 'react-native';
import {useTheme} from 'react-native-paper';

import DropDownPicker from 'react-native-dropdown-picker';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {useSelector} from 'react-redux';
import Camera from '../../../assets/svgs/cameraL.svg';
import {HitApi} from '../../APIHits/APIHandler';
import {CREATE_NEW_TICKET} from '../../APIHits/urls';
import Header from '../../components/Header';
import RNButton from '../../components/RNButton';
import {fonts} from '../../Themes/FontsConfig';
import {categories} from '../../utiles/dummyData';
import Cross from '../../../assets/svgs/lightCross.svg';
import MediaSelectionPopup from '../../components/Modals/MediaSelectionPopup';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

const CreateNewTicket = ({navigation}) => {
    const {color} = useTheme();
    const {token} = useSelector((state) => state.authReducer);
    const {fontChange, theme_data, app_Theme} = useSelector((state) => state.appReducer,);
    const font = fonts(fontChange);

    const [isMessage, setIsMessage] = useState('');
    const [ticketImage, setTicketImage] = useState(null);
    // console.log("ticketImage",ticketImage);
    const [items, setItems] = useState(categories);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    console.log("value",value);
    const [isLoading, setIsLoading] = useState(false);
    const [mediaSelect, setMediaSelect] = useState(false);

    const bgImage = theme_data?.bgImage;

    // ================= END ========================

    const CreateTicket = async () => {
        setIsLoading(true);

        const data = new FormData();
        data.append('admin_user_id', 1);
        if (ticketImage != null) {
            ticketImage.forEach((img) => {
                let imgObj = {
                    type: img?.mime || img?.type,
                    uri: img?.sourceURL || img?.path || img?.uri,
                    name: img?.filename || img?.mime || img?.name,
                };
                data.append('message_images[]', imgObj);
            });
        }
        data.append('body', isMessage);
        data.append('subject', value);
         console.log("form data",JSON.stringify(data,null,2));
        let res = await HitApi(CREATE_NEW_TICKET, 'POST', data, token);
        if (res?.status == 200) {
            navigation.goBack();
        } else {
            Alert.alert('Error', res?.message);
        }

        setIsLoading(false);
    };

    const RemoveImage = (index) => {
        setTicketImage([...ticketImage.slice(0, index), ...ticketImage.slice(index + 1),]);
    };

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
                <Header
                    title="Support"
                    isLeftIcon
                    isCenterText
                    isRightIcon
                    navigation={navigation}
                    fontSize={hp(2.2)}
                />

                <View style={{marginBottom: hp(0.4), zIndex: 1}}>
                    <DropDownPicker
                        dropDownDirection="BOTTOM"
                        style={{
                            ...styles.dropdownStyle, backgroundColor: color.bgColor, borderColor: color.g13,
                        }}
                        open={open}
                        maxHeight={hp(50)}
                        props={{activeOpacity: 1}}
                        scrollViewProps={{nestedScrollEnabled: true}}
                        flatListProps={{nestedScrollEnabled: true}}
                        placeholder="Select Subject"
                        searchPlaceholderTextColor={color.white}
                        placeholderStyle={{
                            color: textColorCheck(), fontFamily: font.medium, fontSize: wp(4),
                        }}
                        textStyle={{
                            color: textColorCheck(), marginHorizontal: wp(4), fontSize: hp(2), fontFamily: font.medium,
                        }}
                        zIndex={0}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        showArrowIcon={true}
                        showTickIcon={true}
                        dropDownContainerStyle={[styles.dropDownContainerStyle, {
                            backgroundColor: color.g8, borderColor: color.g13,
                        },]}
                        arrowIconStyle={{
                            ...styles.arrowIconStyle, tintColor: color.white,
                        }}
                        containerStyle={styles.containerStyle}
                        setValue={setValue}
                        setItems={setItems}
                    />
                </View>
                <ScrollView>
                    <View style={styles.inputView} zIndex={-1}>
                        <Text
                            style={{
                                color: color.g2, fontFamily: font.bold, fontSize: hp(1.3), marginBottom: hp(1),
                            }}
                        >
                            {' '}
                            YOUR MESSAGE
                        </Text>
                        <TextInput
                            style={{
                                color: color.white,
                                height: hp(15),
                                textAlignVertical: 'top',
                                fontSize: hp(1.6),
                                fontFamily: font.medium,
                            }}
                            onChangeText={(txt) => setIsMessage(txt)}
                            multiline={true}
                            maxLength={500}
                            placeholderTextColor={color.g2}
                            placeholder="Type here"
                        />
                        <Text
                            style={{
                                alignSelf: 'flex-end', color: color.g11, fontFamily: font.medium,
                            }}
                        >{`${isMessage.length}/500`}</Text>
                        <View style={{borderWidth: 0.5, borderColor: color.g4}}/>
                    </View>

                    <View style={{zIndex: -1}}>
                        {ticketImage != null ? (<View style={{flexDirection: 'row', alignSelf: 'center'}}>
                            {ticketImage?.map((i, index) => {
                                return (<View style={styles.mainImageView}>
                                    <TouchableOpacity
                                        // disabled={loading}
                                        style={styles.crossBtnStyle}
                                        onPress={() => RemoveImage(index)}
                                    >
                                        <Cross alignSelf="center"/>
                                    </TouchableOpacity>

                                    <View
                                        style={[styles.btnStyle1, {
                                            height: ticketImage == null ? wp(13) : wp(30),
                                            marginTop: ticketImage == null ? hp(5) : hp(2),
                                        },]}
                                    >
                                        <FastImage
                                            source={{
                                                uri: Platform.OS === 'ios' ? i?.sourceURL : i?.path || i?.uri,
                                            }}
                                            style={styles.imageStyle}
                                        />
                                    </View>
                                </View>);
                            })}
                        </View>) : null}
                        <TouchableOpacity
                            style={[styles.btnStyle, {
                                height: wp(13), marginTop: hp(5),
                            },]}
                            onPress={() => setMediaSelect(true)}
                        >
                            <Camera alignSelf="center"/>
                        </TouchableOpacity>
                        <Text
                            style={{
                                ...styles.textStyle1, color: color.white, fontFamily: font.medium,
                            }}
                        >
                            Attach images or proof
                        </Text>
                    </View>
                </ScrollView>
                <View style={{marginBottom: hp(2)}}>
                    <RNButton
                        isLoading={isLoading}
                        clr1={color.linerClr1}
                        clr2={color.linerClr2}
                        textColor={color.bl1}
                        borderClr="transparent"
                        family={font.bold}
                        btnWidth={wp(90)}
                        btnHeight={hp(7.5)}
                        btnRadius={wp(10)}
                        btnVertical={hp(1)}
                        title={'Send New Ticket'}
                        onPress={() => {
                            if (value != null) {
                                CreateTicket();
                            } else {
                                Alert.alert('Alert', 'Select atleast one subject');
                            }
                        }}
                    />
                </View>
                <MediaSelectionPopup
                    isVisible={mediaSelect}
                    navigation={navigation}
                    setMediaSelect={setMediaSelect}
                    screenName="CreateSupport"
                    setImg={setTicketImage}
                    mediaType="photo"
                    multiple={true}
                />
            </ImageBackground>
        </LinearGradient>
    </View>);
};

export default CreateNewTicket;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    }, inputView: {
        marginHorizontal: wp(5), marginVertical: hp(2),
    }, btnStyle: {
        alignSelf: 'center', justifyContent: 'center', width: wp(30), borderRadius: wp(5),
    }, imageStyle: {
        width: wp(28), height: wp(28), borderRadius: wp(3), alignSelf: 'center',
    }, textStyle1: {
        alignSelf: 'center', marginTop: hp(2),
    }, dropdownStyle: {
        marginTop: hp(1),
        width: wp(90),
        height: hp(8),
        borderRadius: wp(5),
        color: 'white',
        borderWidth: 1,
        alignSelf: 'center',
    }, dropDownContainerStyle: {
        borderWidth: 1,
        borderRadius: wp(7),
        zIndex: 0,
        maxHeight: hp(45),
        width: wp(90),
        marginTop: hp(1),
        alignSelf: 'center',
    }, arrowIconStyle: {
        height: 25, width: 25,
    }, containerStyle: {
        alignSelf: 'center', width: wp(81), height: hp(10),
    }, mainImageView: {
        marginTop: hp(5), width: wp(32),
    }, crossBtnStyle: {
        position: 'absolute', right: 0, top: hp(2), width: wp(5), height: hp(5), zIndex: 1,
    }, btnStyle1: {
        justifyContent: 'center', width: wp(30), borderRadius: wp(5), zIndex: 0,
    }
});
