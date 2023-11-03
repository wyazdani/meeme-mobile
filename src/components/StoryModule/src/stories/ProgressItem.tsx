import React, { useCallback, useState } from 'react';
import { BAR_INACTIVE_COLOR, BAR_ACTIVE_COLOR } from '../utils/colors';
import { ProgressItemProps } from '../../../../utiles/interfaceHelper';
import { View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

var isValid = true;
var isBlock = false;
var listener: any;
const OFFSET = 100;
const BAR_WIDTH = 100;
const BAR_HEIGHT = 7;

var count = 0;

function ProgressItem(props: ProgressItemProps) {
  const [progress, setProgress] = useState(count);

  const barActiveColor =
    props.barStyle && props.barStyle.barActiveColor
      ? props.barStyle.barActiveColor
      : BAR_ACTIVE_COLOR;
  const barInActiveColor =
    props.barStyle && props.barStyle.barInActiveColor
      ? props.barStyle.barInActiveColor
      : BAR_INACTIVE_COLOR;
  const barWidth =
    props.barStyle && props.barStyle.barWidth
      ? props.barStyle.barWidth
      : BAR_WIDTH;
  const barHeight =
    props.barStyle && props.barStyle.barHeight
      ? props.barStyle.barHeight
      : BAR_HEIGHT;

  useFocusEffect(
    useCallback(() => {
      if (props.enableProgress) {
        if (progress >= 0 && progress < OFFSET) {
          if (progress == OFFSET - 1) {
            isValid = true;
          }
          if (!isBlock) {
            startProgress();
          } else {
            isBlock = false;
            startProgress();
          }
        } else {
          if (isValid) {
            clearTimeout(listener);

            isValid = false;
            props.onChangePosition();
          }
        }
      } else {
        blockProgress();
      }
    }, [progress, props.enableProgress]),
  );

  useFocusEffect(
    useCallback(() => {
      if (props.enableProgress) {
        // This if condition is critical at it blocks the multiple callbacks for other position in row
        if (props.currentIndex === props.progressIndex) {
          if (props.progressIndex != 0) {
            count = 0;
            setProgress(count);
            blockProgress();
          } else {
            isValid = false;
            count = 0;
            setProgress(count);
          }
        }
      } else {
        blockProgress();
      }
    }, [props.progressIndex]),
  );

  function startProgress() {
    listener = setTimeout(() => {
      count = count + 1;
      setProgress(count);
    }, 50);
  }

  function blockProgress() {
    clearTimeout(listener);
    isValid = false;
    isBlock = true;
  }

  return (
    <View
      style={[
        styles.mainParent,
        {
          minWidth: `${barWidth / props.size - 1}%`,
          backgroundColor: barInActiveColor,
        },
      ]}
    >
      {props.currentIndex === props.progressIndex && (
        <View
          style={[
            styles.childActive,
            {
              width: `${progress}%`,
              height: barHeight,
              backgroundColor: barActiveColor,
            },
          ]}
        />
      )}

      {props.currentIndex != props.progressIndex && (
        <View
          style={[
            styles.childInactive,
            {
              backgroundColor:
                props.currentIndex >= props.progressIndex
                  ? barInActiveColor
                  : barActiveColor,
              minWidth: `${barWidth / props.size - 1}%`,
              height: barHeight,
            },
          ]}
        />
      )}
    </View>
  );
}

export default ProgressItem;

const styles = StyleSheet.create({
  mainParent: {
    borderRadius: 20,
  },
  childActive: {
    borderRadius: 20,
  },
  childInactive: {
    borderRadius: 20,
  },
});
