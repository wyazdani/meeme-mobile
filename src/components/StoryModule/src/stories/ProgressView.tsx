import React, { useCallback, useEffect, useState } from 'react';
import ProgressItem from './ProgressItem';
import { ProgressViewProps } from '../../../../utiles/interfaceHelper';
import { View, StyleSheet, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

function ProgressView(props: ProgressViewProps) {
  const [progressIndex, setProgressIndex] = useState(0);

  useEffect(() => {
    setProgressIndex(props.progressIndex);
  }, [props.progressIndex]);
  useEffect(() => {
    setProgressIndex(progressIndex);
  }, [props.enableProgress]);

  function changePosition() {
    if (props.enableProgress) {
      if (progressIndex < props.images.length) {
        const mProgress = progressIndex + 1;
        props.onChange(mProgress);
        setTimeout(() => {
          setProgressIndex(mProgress);
        }, props.duration);
      }
    } else {
      // TODO (compare with web version)
      setProgressIndex(progressIndex);
    }
  }

  return (
    <View style={styles.parent}>
      <FlatList
        contentContainerStyle={styles.flatStyle}
        pagingEnabled={true}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        legacyImplementation={false}
        data={props.images}
        ItemSeparatorComponent={() => <View style={{ marginLeft: 4 }} />}
        renderItem={({ item, index }) => (
          <ProgressItem
            enableProgress={props.enableProgress}
            size={props.images.length}
            duration={props.duration}
            barStyle={props.barStyle}
            progressIndex={progressIndex}
            currentIndex={index}
            onChangePosition={() => changePosition()}
          />
        )}
      />
    </View>
  );
}

export default ProgressView;

const styles = StyleSheet.create({
  parent: {
    top: -10,
    left: 0,
    right: 0,
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    flex: 1,
  },
  flatStyle: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingTop: '5%',
    paddingBottom: '4%',
  },
});
