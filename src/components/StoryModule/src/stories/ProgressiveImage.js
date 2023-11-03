import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import FastImage from 'react-native-fast-image';
import { AppLoader } from '../../../RNLoader';

const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    backgroundColor: 'black',
  },
});

class ProgressiveImage extends React.Component {
  thumbnailAnimated = new Animated.Value(0);
  imageAnimated = new Animated.Value(0);
  state = {
    loading: true,
  };

  render() {
    const { thumbnailSource, source, setStopProgress, style, ...props } =
      this.props;

    return (
      <View style={styles.container}>
        <FastImage
          {...props}
          source={thumbnailSource}
          style={style}
          onLoadEnd={() => {
            setStopProgress(true);
            this.setState({ loading: false });
          }}
          onLoadStart={() => {
            this.setState({ loading: true });
            setStopProgress(false);
          }}
          defaultSource={source}
          resizeMode="contain"
        />
        <AppLoader loading={this.state.loading} />
      </View>
    );
  }
}

export default ProgressiveImage;
