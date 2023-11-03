import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import RNButton from './RNButton';
import {fonts} from '../Themes/FontsConfig';
import {textColor} from '../utiles/themeSelectot';
import {colors} from 'react-native-elements';

const AppIntroCard = (props) => {
    const {item} = props;
    const {color} = useTheme();
    const {fontChange, app_Theme} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);
    const [isLoading, setIsLoading] = useState(false);
    return (<View
        style={[{backgroundColor: color.appTutorialColor}, styles.container]}
    >
        <View style={{alignSelf: 'flex-start', marginLeft: wp(5)}}>
            <RNButton
                clr1={color.linerClr1}
                clr2={color.linerClr2}
                textColor={textColor(app_Theme, colors.black)}
                family={font.bold}
                btnWidth={wp(9)}
                btnHeight={wp(9)}
                btnRadius={wp(9)}
                btnVertical={hp(2)}
                title={`${item?.step}.`}
                borderWidth={0}
                borderClr={color.r2}
            />
        </View>

        <Text
            style={[styles.titleStyle, {
                fontFamily: font.bold, color: color.white,
            },]}
        >
            {item?.description}
        </Text>

        <View style={styles.numColumn}>
            {item?.tutorial_images?.map((i) => {
                return (<>
                    <FastImage
                        source={{
                            uri: i,
                        }}
                        resizeMode="contain"
                        style={[styles.imageStyle, {width: item?.images?.length == 1 ? wp(60) : wp(44)},]}
                        onLoadStart={() => setIsLoading(true)}
                        onLoadEnd={() => setIsLoading(false)}
                    />
                    {isLoading ? (<ActivityIndicator
                        style={styles.activityIndicator1}
                        size="small"
                        color="white"
                    />) : null}
                </>);
            })}
        </View>
    </View>);
};

export default AppIntroCard;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: wp(5), marginVertical: hp(1), borderRadius: wp(6),
    }, titleStyle: {
        fontSize: wp(5), textAlign: 'center', marginHorizontal: wp(6), alignSelf: 'center',
    }, imageStyle: {
        maxHeight: hp(70), minHeight: hp(40), borderRadius: wp(5), zIndex: 1,
    }, numColumn: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: hp(4),
        justifyContent: 'space-evenly',
        marginTop: hp(5),
    }, activityIndicator1: {
        position: 'absolute', top: 0, bottom: 0, zIndex: -1, left: 0, right: 0,
    },
});
