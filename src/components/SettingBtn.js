import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useTheme} from 'react-native-paper';
import ToggleSwitch from 'toggle-switch-react-native';
import {SvgUri} from 'react-native-svg';
import {fonts} from '../Themes/FontsConfig';
import {useSelector} from 'react-redux';

const SettingBtn = ({
                        icon,
                        boldText,
                        lightText,
                        isSwith,
                        arrow,
                        bgColor,
                        onToggle,
                        isToggle,
                        onPress,
                    }) => {
    const {fontChange, theme_data} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);
    const {color} = useTheme();
    const icons = theme_data?.nav_bar;
    const svgReturn = (data) => {
        if (typeof data == 'string')
            return (
                <SvgUri
                    width={25}
                    height={25}
                    alignSelf={'center'}
                    uri={data}
                    onError={(err) => console.log('Error:=>', err)}
                />
            );
        else return data;
    };

    return (
        <TouchableOpacity
            style={styles.mainView}
            disabled={isSwith}
            onPress={onPress}
        >
            <View style={{flexDirection: 'row'}}>
                <View
                    style={{
                        backgroundColor: bgColor,
                        width: wp(15),
                        height: wp(15),
                        borderRadius: wp(4),
                        justifyContent: 'center',
                    }}
                >
                    {svgReturn(icon)}
                </View>
                <View
                    style={{marginLeft: wp(5), justifyContent: 'center', width: wp(55)}}
                >
                    <Text
                        style={{
                            fontFamily: font.bold,
                            color: color.white,
                            fontSize: hp(2.4),
                            marginBottom: hp(0.5),
                        }}
                    >
                        {boldText}
                    </Text>
                    {lightText ? (
                        <Text
                            style={{
                                fontFamily: font.regular,
                                color: color.white,
                                fontSize: hp(1.8),
                                opacity: 0.6,
                            }}
                        >
                            {lightText}
                        </Text>
                    ) : null}
                </View>
            </View>

            {isSwith ? (
                <>
                    <ToggleSwitch
                        isOn={isToggle}
                        onToggle={onToggle}
                        offColor={color.g6}
                        onColor={color.y5}
                        size="medium"
                    />
                </>
            ) : (
                <>
                    {icons?.forward ? (
                        <SvgUri alignSelf="center" uri={icons?.forward}/>
                    ) : (
                        arrow
                    )}
                </>
            )}
        </TouchableOpacity>
    );
};

export default SettingBtn;

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: wp(5),
        marginVertical: hp(1.5),
    },
});
