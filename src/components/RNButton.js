import {
    View, Text, TouchableOpacity, StyleSheet, ActivityIndicator,
} from 'react-native';
import React from 'react';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from 'react-native-paper';

const RNButton = ({
                      title,
                      svg,
                      onPress,
                      isLoading,
                      isSelect,
                      clr1,
                      clr2,
                      btnHeight,
                      btnRadius,
                      btnWidth,
                      btnVertical,
                      textColor,
                      family,
                      fontWeight,
                      borderWidth,
                      borderClr,
                      fontSize,
                      btnTop,
                      padding,
                      index,
                  }) => {
    const {color} = useTheme();

    if (index == isSelect) {
        return (<LinearGradient
            colors={[clr1, clr2]}
            style={{
                ...styles.gradientStyle,
                borderWidth: borderWidth || 1,
                width: btnWidth,
                height: btnHeight,
                borderRadius: btnRadius,
                marginVertical: btnVertical,
                borderColor: borderClr ? borderClr : color.borderClr,
                marginTop: btnTop,
            }}
            start={{y: 0, x: 0}}
            end={{y: 0.7, x: 0}}
        >
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={onPress}
                style={{
                    flexDirection: 'row',
                    justifyContent: svg && !isLoading ? 'space-between' : 'center',
                    width: btnWidth,
                    height: btnHeight,
                }}
                disabled={isLoading}
            >
                {isLoading ? (<View style={styles.loaderContainer}>
                    <ActivityIndicator color={color.white}/>
                </View>) : (<>
                    <View
                        key={Math.random()}
                        style={{width: svg ? wp(30) : null, justifyContent: 'center'}}
                    >
                        {svg}
                    </View>
                    <View
                        style={{width: svg ? wp(60) : null, justifyContent: 'center'}}
                    >
                        <Text
                            style={{
                                ...styles.textStyle,
                                fontSize: fontSize || wp(4.5),
                                color: textColor,
                                fontFamily: family,
                                fontWeight: fontWeight,
                                padding: padding ? padding : null,
                            }}
                            numberOfLines={1}
                        >
                            {title}
                        </Text>
                    </View>
                </>)}
            </TouchableOpacity>
        </LinearGradient>);
    } else {
        return (<TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            style={{
                flexDirection: 'row',
                justifyContent: svg && !isLoading ? 'space-between' : 'center',
                width: btnWidth,
                height: btnHeight,
            }}
            disabled={isLoading}
        >
            {isLoading ? (<View style={styles.loaderContainer}>
                <ActivityIndicator color={color.white}/>
            </View>) : (<>
                <View
                    key={Math.random()}
                    style={{width: svg ? wp(30) : null, justifyContent: 'center'}}
                >
                    {svg}
                </View>
                <View
                    style={{width: svg ? wp(60) : null, justifyContent: 'center'}}
                >
                    <Text
                        style={{
                            ...styles.textStyle,
                            fontSize: fontSize || wp(4.5),
                            color: textColor,
                            fontFamily: family,
                            fontWeight: fontWeight,
                            padding: padding ? padding : null,
                        }}
                        numberOfLines={1}
                    >
                        {title}
                    </Text>
                </View>
            </>)}
        </TouchableOpacity>);
    }
};

export default RNButton;

const styles = StyleSheet.create({
    gradientStyle: {
        alignSelf: 'center', justifyContent: 'center',
    }, textStyle: {
        alignSelf: 'flex-start',
    }, loaderContainer: {
        width: wp(100), justifyContent: 'center', alignItems: 'center',
    },
});
