import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from 'react-native';
import React from 'react';
import ImageIcon from '../../assets/svgs/image.svg';
import Send from '../../assets/svgs/send.svg';
import {useTheme} from 'react-native-paper';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {SvgUri} from 'react-native-svg';

const ChatInput = ({
                       onChangeText,
                       value,
                       onPressGallery,
                       onPressSend,
                       textInputWidth = wp(80),
                       disabled,
                       media,
                       loading,
                       icon,
                   }) => {
    const {color} = useTheme();

    const {theme_data, app_Theme} = useSelector((state) => state.appReducer);
    const icons = theme_data?.nav_bar;

    const textColorCheck = () => {
        switch (app_Theme) {
            case 'ultra_rare10':
                return 'black';
                break;
            case 'ultra_rare11':
                return 'black';
                break;
            case 'ultra_rare12':
                return 'black';
                break;
            case 'ultra_rare13':
                return 'black';
                break;
            case 'ultra_rare14':
                return 'black';
                break;
            case 'ultra_rare15':
                return 'black';
                break;
            default:
                return color.white;
                break;
        }
    };

    return (
        <View style={styles.inputViewStyle}>
            <TouchableOpacity
                onPress={onPressGallery}
                style={styles.btnStyle}
                disabled={loading}
            >
                {icons?.gallery ? (
                    <SvgUri alignSelf="center" uri={icons?.gallery}/>
                ) : (
                    <ImageIcon alignSelf="center"/>
                )}
            </TouchableOpacity>
            <View
                style={{
                    ...styles.inputStyle,
                    backgroundColor: color.g8,
                    width: textInputWidth,
                }}
            >
                <TextInput
                    placeholder="Aa"
                    placeholderTextColor={textColorCheck()}
                    style={{
                        backgroundColor: color.g8,
                        width: '90%',
                        height: hp(6),
                        alignSelf: 'center',
                        color: textColorCheck(),
                    }}
                    onChangeText={onChangeText}
                    value={value}
                    editable={!loading}
                />
            </View>
            {loading ? (
                <ActivityIndicator animating={loading}/>
            ) : (
                <TouchableOpacity
                    disabled={disabled}
                    onPress={onPressSend}
                    style={styles.btnStyle}
                >
                    {icons?.send_support ? (
                        <SvgUri alignSelf={'center'} uri={icons?.send_support}/>
                    ) : (
                        <Send alignSelf="center"/>
                    )}
                </TouchableOpacity>
            )}
        </View>
    );
};

export default ChatInput;

const styles = StyleSheet.create({
    inputViewStyle: {
        height: hp(10),
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    inputStyle: {
        justifyContent: 'center',
        borderRadius: wp(10),
        height: hp(7),
        marginTop: hp(1),
    },
    btnStyle: {justifyContent: 'center', bottom: hp(0.3)},
});
