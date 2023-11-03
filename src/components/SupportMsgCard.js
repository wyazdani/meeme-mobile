import {
    View, Text, TouchableOpacity, Image, Alert, ScrollView, ActivityIndicator,
} from 'react-native';
import React from 'react';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useTheme} from 'react-native-paper';
import {fonts} from '../Themes/FontsConfig';
import {useSelector} from 'react-redux';
import RNFS from 'react-native-fs';
import FastImage from 'react-native-fast-image';

const SupportMsgCard = (props) => {
    const {color} = useTheme();
    const {fontChange, app_Theme} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);

    //Download Multiple Files
    const downloadFiles = (media) => {
        props?.setIsLoading(true);

        const promise = RNFS.downloadFile({
            fromUrl: media, toFile: `${RNFS.DownloadDirectoryPath}/download_${Math.random()}.png`,
        });

        setTimeout(() => {
            props?.setIsLoading(false);
            Alert.alert('Success', 'Downloading Completed');
        }, 5000);
        return promise;
    };

    const textColorCheck = () => {
        switch (app_Theme) {
            case 'ultra_rare14':
                return 'black';
                break;
            default:
                return color.white;
                break;
        }
    };

    return (<View style={{...styles.cardView}}>
        <View
            style={{
                flexDirection: 'row', alignSelf: 'center',
            }}
        >
            <FastImage
                source={{uri: props.image}}
                style={{
                    width: wp(14), height: wp(14), borderRadius: wp(14), marginHorizontal: wp(2),
                }}
            />
            <View
                style={{
                    alignSelf: 'center',
                    width: wp(70),
                    backgroundColor: color.msgTextColor,
                    borderRadius: wp(2),
                    padding: 5,
                }}
            >
                <View style={styles.card1View}>
                    <Text
                        numberOfLines={1}
                        style={{
                            ...styles.dateStyle, color: textColorCheck(), fontFamily: font.bold,
                        }}
                    >
                        {props?.name}
                    </Text>
                    <Text
                        numberOfLines={1}
                        style={{
                            ...styles.statusStyle, color: color.o1, fontFamily: font.medium,
                        }}
                    >
                        {props?.status}
                    </Text>
                </View>

                <Text
                    numberOfLines={1}
                    style={{
                        ...styles.codeStyle, color: textColorCheck(), fontFamily: font.medium,
                    }}
                >
                    {props?.code}
                </Text>
                {props?.message != '' ? (<Text
                    style={{
                        ...styles.messageStyle, color: textColorCheck(), fontFamily: font.regular,
                    }}
                >
                    {props?.message}
                </Text>) : null}

                {props?.attachedImage != '' ? (<ScrollView horizontal={true}>
                    {props?.attachedImage.map((i) => (<TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            props.setIsState({
                                uri: i?.message_image || i, check: true,
                            });
                        }}
                        onLongPress={() => downloadFiles(i?.message_image || i)}
                        style={{margin: 2}}
                    >
                        <Image
                            source={{uri: i.message_image || i}}
                            style={{
                                width: wp(28), height: wp(28), borderRadius: wp(1), marginVertical: hp(2), zIndex: 1,
                            }}
                        />
                        <View style={styles.activityIndicator}>
                            <ActivityIndicator size={'small'} color={color.white}/>
                        </View>
                    </TouchableOpacity>))}
                </ScrollView>) : null}
            </View>
        </View>
    </View>);
};

export default SupportMsgCard;

const styles = {
    cardView: {
        minheight: hp(13),
        marginHorizontal: wp(1),
        borderRadius: wp(5),
        marginTop: hp(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: wp(2)
    }, card1View: {
        flexDirection: 'row', justifyContent: 'space-between', marginLeft: 4,
    }, dateStyle: {
        fontSize: hp(2.3), marginBottom: hp(0.5),
    }, statusStyle: {
        marginRight: wp(2), fontSize: hp(1.4),
    }, codeStyle: {
        fontSize: hp(1.5), marginBottom: hp(0.2), marginLeft: 4,
    }, messageStyle: {
        fontSize: hp(2), marginBottom: hp(0.2), marginTop: hp(3),
    }, activityIndicator: {
        position: 'absolute', top: 0, bottom: 0, alignSelf: 'center', justifyContent: 'center', zIndex: 0,
    },
};
