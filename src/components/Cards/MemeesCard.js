import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import VideoPost from '../VideoPost';

export default function MemeesCard({
                                       item,
                                       onPressCross,
                                       onPressHeart,
                                       like,
                                       dislike,
                                       onPressVideo,
                                       videoPlayerModal,
                                       isPlay,
                                       index,
                                   }) {
    let type = item?.post_type?.slice(0, 5) || 'image/jpg';
    const {color} = useTheme();
    const [isLoading, setIsLoading] = useState(true);

    return (
        <View style={styles.mainContianer}>
            {/* {type == 'image' ? ( */}
            <TouchableOpacity
                onPress={onPressVideo}
                activeOpacity={0.7}
                style={{
                    width: '100%',
                    height: hp(44),
                }}
            >
                <FastImage
                    source={{
                        uri:
                            type == 'video'
                                ? item?.thumbnail ||
                                'https://www.realfinityrealty.com/wp-content/uploads/2018/08/video-poster.jpg'
                                : item?.post_image || item?.compress_image,
                    }}
                    resizeMode="cover"
                    style={styles.imageStyle}
                    onLoadEnd={() => setIsLoading(false)}
                    onLoadStart={() => setIsLoading(true)}
                />
            </TouchableOpacity>
            {/* ) : (
        <View style={{ padding: 10 }}>
          <VideoPost
            image={item?.post_image}
            videoPlayerModal={videoPlayerModal}
            isJudgement={true}
            isPlay={isPlay}
            index={index}
          />
        </View>
      )} */}

            {isLoading ? (
                <ActivityIndicator
                    style={styles.activityIndicator}
                    animating={isLoading}
                />
            ) : null}

            {/* like/dislike memees */}
            <View style={[styles.likeDislike, {backgroundColor: color.white}]}>
                <TouchableOpacity onPress={onPressHeart} activeOpacity={0.8}>
                    <Image
                        source={require('../../../assets/pngs/greenHeart.png')}
                        style={[
                            styles.icon,
                            {left: 8, tintColor: like ? color.green : color.g1},
                        ]}
                    />
                </TouchableOpacity>
                <View style={styles.verticalLine}/>
                <TouchableOpacity onPress={onPressCross} activeOpacity={0.8}>
                    <Image
                        source={require('../../../assets/pngs/redCross.png')}
                        style={[
                            styles.crossIcon,
                            {right: 10, tintColor: dislike ? color.r1 : color.g1},
                        ]}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContianer: {
        width: '100%',
        height: hp(44),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(1),
        backgroundColor: '#ffffff10',
    },
    likeDislike: {
        width: wp(30),
        height: hp(5.5),
        borderRadius: hp(5),
        position: 'absolute',
        bottom: hp(1.5),
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        opacity: 0.95,
        zIndex: 999,
    },
    icon: {
        width: wp(5),
        height: hp(4),
        resizeMode: 'contain',
    },
    crossIcon: {
        width: wp(4),
        height: hp(4),
        resizeMode: 'contain',
    },
    imageStyle: {
        width: '100%',
        height: hp(40),
    },
    verticalLine: {
        height: hp(6),
        width: 1,
        backgroundColor: 'black',
    },
    activityIndicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: -1,
    },
});
