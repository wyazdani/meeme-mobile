import React, {useState} from 'react';
import {
    Alert, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {PESDK} from 'react-native-photoeditorsdk';
import {VESDK} from 'react-native-videoeditorsdk';

import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Video from 'react-native-video';
import {useSelector} from 'react-redux';
import Edit from '../../../../assets/svgs/edit.svg';
import {HitApi} from '../../../APIHits/APIHandler';
import {TOURNAMENT_POST} from '../../../APIHits/urls';
import Header from '../../../components/Header';
import RNButton from '../../../components/RNButton';
import {fonts} from '../../../Themes/FontsConfig';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

const CreateTournamentMemee = ({navigation, route}) => {
    if (Platform.OS == 'android') {
        PESDK.unlockWithLicense(require('../../../utiles/imgly/pesdk_android_license.json'),);
        VESDK.unlockWithLicense(require('../../../utiles/imgly/vesdk_android_license.json'),);
    } else {
        PESDK.unlockWithLicense(require('../../../utiles/imgly/pesdk_ios_license.json'),);
        VESDK.unlockWithLicense(require('../../../utiles/imgly/vesdk_ios_license.json'),);
    }

    const {item} = route?.params;

    const {token} = useSelector((state) => state.authReducer);
    const {color} = useTheme();
    const {fontChange, theme_data} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);
    const [isImage, setIsImage] = useState(item);
    const [isLoading, setIsLoading] = useState(false);
    const [des, setDes] = useState('');
    const [isTags, setIsTags] = useState([]);
    const [tags, setTags] = useState('');

    let type = item?.type.split('/')[0];

    const bgImage = theme_data?.bgImage;

    const selectAndEdittheImage = () => {
        // Set up sample image
        let image = {uri: item?.uri};
        let video = {uri: item?.uri};
        // Set up configuration

        let configuration = {
            // Configure sticker tool
            sticker: {
                // Enable personal stickers
                personalStickers: true, // Configure sticker library
                categories: [// Create sticker category with stickers
                    {
                        identifier: 'example_sticker_category_logos', name: 'Logos',
                    }, // Use existing sticker category
                    {identifier: 'imgly_sticker_category_emoticons'}, // Modify existing sticker category
                    {
                        identifier: 'imgly_sticker_category_shapes',
                        items: [{identifier: 'imgly_sticker_shapes_badge_01'}, {identifier: 'imgly_sticker_shapes_arrow_02'}, {identifier: 'imgly_sticker_shapes_spray_03'},],
                    },],
            },
        };

        if (type == 'video') {
            VESDK.openEditor(video, configuration).then((result) => {
                if (result?.hasChanges) {
                    setIsImage({
                        type: 'video/mp4', uri: result?.video, name: 'video',
                    });
                }
            }, (error) => {
                console.log(error);
            },);
        } else {
            PESDK.openEditor(image, configuration).then((result) => {
                if (result?.hasChanges) {
                    setIsImage({
                        type: 'image/jpeg', uri: result?.image, name: 'image',
                    });
                }
            }, (error) => {
                Alert.alert(error);
                return error;
            },);
        }
    };

    const createPost = () => {
        setIsLoading(true);
        let img = {
            type: 'mage/jpg', uri: isImage?.uri, name: 'image',
        };
        if (isImage.uri == null) {
            Alert.alert('Alert', 'Create the memee first');
            setIsLoading(false);
        } else {
            const data = new FormData();
            data.append('description', 'Tournament Memee');
            data.append('tag_list', '');
            data.append('post_image', img);

            HitApi(TOURNAMENT_POST, 'post', data, token)
                .then((res) => {
                    if (res?.status == 200) {
                        navigation.navigate('BottomTab');
                        //Toast.showWithGravity(res?.message, Toast.SHORT, Toast.BOTTOM);
                    } else {
                        Alert.alert('Error', res?.message);
                    }
                    setIsLoading(false);
                })
                .catch((e) => {
                    let {message} = e;
                    setIsLoading(false);
                    Alert.alert('Error', message);
                });
        }
    };

    const deleteTag = (index) => {
        setIsTags([...isTags.slice(0, index), ...isTags.slice(index + 1)]);
    };

    return (<View style={{flex: 1, backgroundColor: color.bgColor}}>
        <LinearGradient
            colors={[color.bgColor1, color.bgColor2]}
            style={{flex: 1}}
            start={{y: 0, x: 0}}
            end={{y: 1, x: 0}}
        >
            <ImageBackground
                source={// theme_data ? require('../../../../assets/background.jpg') : null
                    {uri: bgImage}}
                style={{flex: 1}}
                resizeMode="cover"
            >
                <Header
                    title={'Tournament Memee'}
                    isLeftIcon
                    isCenterText
                    isRightIcon
                    fontSize={hp(2.2)}
                    navigation={navigation}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flex: 1}}
                >
                    <View style={styles.imageView}>
                        <TouchableOpacity
                            onPress={selectAndEdittheImage}
                            style={{
                                position: 'absolute',
                                flexDirection: 'row',
                                top: 20,
                                right: 30,
                                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                width: wp(20),
                                justifyContent: 'center',
                                borderRadius: wp(15),
                                height: hp(4),
                                zIndex: 0,
                            }}
                        >
                            <Edit alignSelf="center"/>
                            <Text
                                style={{
                                    ...styles.selectStyle, fontFamily: font.regular, color: color.white,
                                }}
                            >
                                Edit
                            </Text>
                        </TouchableOpacity>
                        {type == 'video' ? (<Video
                            source={{uri: isImage?.uri}}
                            poster={isImage?.uri}
                            style={styles.imageStyle}
                            paused={true}
                            muted={false}
                            resizeMode={'contain'}
                        />) : (<FastImage
                            source={{uri: isImage?.uri}}
                            style={styles.imageStyle}
                            resizeMode="contain"
                        />)}

                        <View style={styles.buttonStyle}>
                            <RNButton
                                isLoading={isLoading}
                                clr1={color.linerClr1}
                                clr2={color.linerClr2}
                                textColor={color.bl1}
                                family={font.bold}
                                btnWidth={wp(90)}
                                btnHeight={hp(7.5)}
                                btnRadius={wp(10)}
                                btnVertical={hp(1)}
                                title={'Create Tournament Post'}
                                onPress={createPost}
                                borderClr="transparent"
                            />
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </LinearGradient>
    </View>);
};

export default CreateTournamentMemee;

const styles = StyleSheet.create({
    imageView: {
        flex: 0.99, marginVertical: hp(2), justifyContent: 'center',
    }, selectStyle: {
        alignSelf: 'center', fontSize: hp(1.8), marginHorizontal: wp(2),
    }, imageStyle: {
        width: '100%', height: '100%', zIndex: -1,
    }, desView: {
        marginHorizontal: wp(5), marginTop: hp(5),
    }, tagInputStyle: {
        fontSize: hp(2.5), width: wp(73), height: hp(6),
    }, tagTextSylse: {
        marginVertical: hp(2), fontSize: hp(1.7),
    }, tagsShowView: {
        flexDirection: 'row', flexWrap: 'wrap',
    }, tagsView: {
        flexDirection: 'row', justifyContent: 'space-around', borderRadius: wp(10), marginTop: hp(1),

        borderWidth: 1, padding: 8,
    }, buttonStyle: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
    },
});
