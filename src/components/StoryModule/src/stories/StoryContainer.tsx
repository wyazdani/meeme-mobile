import React, { useState, useEffect, useCallback } from 'react';
import ProgressView from './ProgressView';
import moment from 'moment';
import StoryView from './StoryView';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { StoryContainerProps } from '../../../../utiles/interfaceHelper';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import { TINT_GRAY } from '../utils/colors';
import ArrowNavigator from './ArrowNavigator';

import UserHeaderView from './UserHeaderView';
import { DEFAULT_DURATION } from '../utils/constant';
import Heart from '../../../../../assets/svgs/heart.svg';
import RedHeart from '../../../../../assets/svgs/redHeart.svg';
import { fonts } from '../../../../Themes/FontsConfig';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

const dummyImg =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';
var check = false;
const StoryContainer =React.memo( (props: StoryContainerProps) => {
  const [progressIndex, setProgressIndex] = useState(0);
  const [stopProgress, setStopProgress] = useState(true);
  const { fontChange } = useSelector((state) => state.appReducer);
  const [seeMore, setSeeMore] = useState(false);
  const font = fonts(fontChange);

  useFocusEffect(
    useCallback(() => {
      setProgressIndex(0);
    }, [props?.enableProgress, props?.images]),
  );

  function onArrorClick(type: string) {
    switch (type) {
      case 'left':
        onChange(progressIndex === 0 ? progressIndex : progressIndex - 1);
        break;
      case 'right':
        onChange(stopProgress ? progressIndex + 1 : progressIndex);
        break;
      case 'longIn':
        setStopProgress(false);
        break;
      case 'longOut':
        setStopProgress(true);
        break;
    }
  }

  function onChange(position: number) {
    if (stopProgress) {
      check = false;
      if (position < props?.images.length) {
        setProgressIndex(position);
        props?.setIsOpen({ isOpen: false, id: 0, index: 0 });
      } else {
        if (typeof props?.onComplete === 'function') {
          props?.onComplete();
        }
      }
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {Platform.OS === 'ios' && (
        <KeyboardAvoidingView behavior="padding">
          <View>{props.visible ? getView() : <View></View>}</View>
        </KeyboardAvoidingView>
      )}

      {Platform.OS === 'android' && (
        <View>{props?.visible ? getView() : <View></View>}</View>
      )}
    </SafeAreaView>
  );

  function getView() {
    return (
      <View
        style={
          props?.containerStyle ? props?.containerStyle : styles.parentView
        }
      >
        <StoryView
          images={props?.images}
          duration={props?.duration ? props?.duration : DEFAULT_DURATION}
          progressIndex={progressIndex}
          imageStyle={props?.imageStyle}
          setStopProgress={setStopProgress}
        />

        <View style={styles.customView}>
          <View style={styles.topView}>
            <UserHeaderView
              userImage={props?.images[progressIndex]?.user_image || dummyImg}
              userName={props?.images[progressIndex]?.username}
              userMessage={moment(props?.images[progressIndex]?.story_created)
                .startOf('seconds')
                .fromNow()}
              imageArrow={props?.userProfile?.imageArrow}
              crossPress={props?.crossPress}
              deletePress={() =>
                props?.deletePress(
                  props?.images[progressIndex]?.id,
                  progressIndex,
                )
              }
            />

            {!props.userProfile && props.headerComponent}
          </View>
          <ArrowNavigator onArrowClick={(type: string) => onArrorClick(type)} />
        </View>

        <View style={styles.progressView}>
          <ProgressView
            enableProgress={stopProgress}
            images={props?.images}
            duration={props?.duration ? props?.duration : DEFAULT_DURATION}
            barStyle={props?.barStyle}
            progressIndex={progressIndex}
            onChange={(position: number) => onChange(position)}
          />
        </View>
        {props?.images[progressIndex]?.description ? (
          <View style={styles.storyDesView}>
            <Text
              style={[
                styles.desText,
                {
                  fontFamily: font?.light,
                },
              ]}
              numberOfLines={seeMore ? 12 : 4}
            >
              {props?.images[progressIndex]?.description}
            </Text>
            {props?.images[progressIndex]?.description?.length > 230 ? (
              <TouchableOpacity
                onPress={() => {
                  check = !check;
                  if (check) {
                    setStopProgress(false);
                  } else {
                    setStopProgress(true);
                  }
                  setSeeMore(check);
                }}
                style={styles.readView}
              >
                <Text style={{ color: 'white', fontFamily: font?.medium }}>
                  {seeMore ? 'Read less' : 'Read more'}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ) : null}
        <View style={styles.heartBackgroundStyle}>
          <TouchableOpacity
            onPress={() => {
              props?.storyLike(props?.images[progressIndex]?.id, progressIndex);
            }}
            style={styles.heartBtnStyle}
          >
            {props?.images[progressIndex]?.liked_by_current_user ? (
              <RedHeart alignSelf="center" />
            ) : (
              <Heart alignSelf="center" />
            )}
            <Text
              style={[
                styles.textCountStyle,
                {
                  fontFamily: font?.bold,
                },
              ]}
            >
              {props?.images[progressIndex]?.story_likes == 0
                ? ''
                : props?.images[progressIndex]?.story_likes}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
})

export default StoryContainer;

const styles = StyleSheet.create({
  parentView: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: TINT_GRAY,
    // marginTop: Platform.OS === 'ios' ? -40 : 0
  },
  customView: {
    position: 'absolute',
    flexDirection: 'column',
    width: Dimensions.get('window').width, // Important
    height: '100%',
  },
  topView: {
    position: 'absolute',
    flexDirection: 'column',
    width: Dimensions.get('window').width, // Important
    paddingTop: 0,
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'baseline',
    textAlignVertical: 'bottom',
    paddingTop: '3%',
    paddingBottom: '2%',
    // backgroundColor: TINT_GRAY,
  },
  progressView: {
    flex: 1,
    width: Dimensions.get('window').width, // Important
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: TINT_GRAY,
  },
  heartBackgroundStyle: {
    bottom: Platform.OS == 'android' ? hp(5) : hp(10),
    width: wp(100),
    justifyContent: 'center',
  },
  heartBtnStyle: {
    marginLeft: wp(6),
    flexDirection: 'row',
    width: wp(10),
  },
  textCountStyle: {
    fontSize: hp(2),
    alignSelf: 'center',
    color: 'white',
    marginHorizontal: wp(3),
  },
  storyDesView: {
    position: 'absolute',
    bottom: Platform.OS == 'android' ? hp(5) : hp(10),
    justifyContent: 'center',
    width: wp(100),
    marginVertical: hp(1),
  },
  desText: {
    color: 'white',
    fontSize: wp(4),
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginHorizontal: wp(5),
    marginVertical: hp(1.5),
  },
  readView: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginHorizontal: wp(5),
    marginBottom: hp(1),
  },
});
