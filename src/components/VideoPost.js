import VideoPlayer from 'react-native-media-console';
import React,{useState} from 'react';
import FastImage from 'react-native-fast-image';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Video from 'react-native-video';
import {View,StyleSheet, Pressable,Text} from "react-native";

const VideoPost = React.memo(({videoPriview,image,image2, isPlay, videoPlayerModal, index, isJudgement = false}) => {
    // console.log("image2>>>",image2);
    const [state, setState] = useState(false);
    // console.log("state",state);
    const dummyImg =
    'http://simpleicon.com/wp-content/uploads/play1.png';
    return (<>
    {state?
    //  <View style={{alignSelf:'center', width: 380,}}>
    //      <Video
    //         source={{uri: image}}
    //         style={styles.postImageStyle}
    //         paused={false}
    //         muted={false}
    //         onBuffer={() => {
    //             setState({...state, isLoading: true});
    //         }}
    //         resizeMode="contain"
    //         onLoad={() => {
    //             setState({...state, isLoading: false});
    //         }}
    //         controls={false}
    //         fullScreen={false}
    //     />
    //  </View>
    <VideoPlayer
        source={{uri: image}}
        paused={isPlay == index ? false : true}
        muted={false}
        autoPlay={false}
        ignoreSilentSwitch={'ignore'}
        resizeMode="contain"
        bufferConfig={{
            minBufferMs: 1500, maxBufferMs: 5000, bufferForPlaybackMs: 2500, bufferForPlaybackAfterRebufferMs: 5000,
        }}
        selectedVideoTrack={{
            type: 'resolution', value: 280,
        }}
        controls={false}
        repeat={false}
        disableBack={true}
        // onEnterFullscreen={videoPlayerModal}
        disableFullscreen={true}
        rewindTime={3}
        isFullscreen={false}
        disableFocus={true}
        disablePlayPause={isJudgement ? true : false}
        disableVolume={isJudgement ? true : false}
    />
    :<Pressable style={{alignItems:'center'}} onPress={()=>setState(true)}>
        <FastImage source={{uri:image2}} style={{height:hp(40),width:wp(50),alignItems:'center',justifyContent:'center'}}>
         
            <FastImage source={{uri:dummyImg}} style={{height:hp(10),width:hp(10)}}/>
        </FastImage>
    </Pressable>}</>);
},);

export default VideoPost;
const styles = StyleSheet.create({
    activityIndicator: {
        position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
    }, root: {
        alignItems: 'flex-end',
    }, postImageStyle: {
        position: 'absolute', width: wp(100), height: hp(45), zIndex: 0,
    }, closeButton: {
        marginRight: 8,
        marginTop: 8,
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 22,
        backgroundColor: '#00000077',
    }, closeText: {
        lineHeight: 22, fontSize: 19, textAlign: 'center', color: '#FFF', includeFontPadding: false,
    },
});
