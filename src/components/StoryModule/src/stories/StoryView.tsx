import React from 'react';
import { StoryViewProps } from '../../../../utiles/interfaceHelper';
import { View, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import ProgressiveImage from './ProgressiveImage';

function StoryView(props: StoryViewProps) {
  const image = props?.images[props.progressIndex]?.story_image;

  return (
    <SafeAreaView style={styles.divStory}>
      <View style={styles.divStory}>
        <ProgressiveImage
          style={props.imageStyle ? props.imageStyle : styles.imgStyle}
          source={{ uri: image }}
          thumbnailSource={{ uri: image }}
          setStopProgress={props?.setStopProgress}
        />
      </View>
    </SafeAreaView>
  );
}

export default StoryView;

const styles = StyleSheet.create({
  divStory: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    // width: '100%',
    // height: '100%',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  imgStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
});
