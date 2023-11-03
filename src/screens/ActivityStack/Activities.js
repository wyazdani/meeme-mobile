import React, {useState} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import Header from '../../components/Header';
import RNButton from '../../components/RNButton';
import {fonts} from '../../Themes/FontsConfig';
import {ActivitiesBtn} from '../../utiles/dummyData';
import Messages from './Messages';
import Notification from './Notification';
import LinearGradient from 'react-native-linear-gradient';

const Activities = ({navigation}) => {
    const {color} = useTheme();
    const {fontChange, theme_data, app_Theme} = useSelector(
        (state) => state.appReducer,
    );

    const font = fonts(fontChange);
    const [btnSelect, setBtnSelect] = useState(false);
    const bgImage = theme_data?.bgImage;

    const BtnCall = (index) => {
        setBtnSelect(index);
    };

    return (
        <View
            style={{
                ...styles.mainContainer,
                backgroundColor: color.bgColor,
            }}
        >
            <LinearGradient
                colors={[color.bgColor1, color.bgColor2]}
                style={styles.mainContainer}
                start={{y: 0, x: 0}}
                end={{y: 1, x: 0}}
            >
                <ImageBackground
                    source={
                        // theme_data ? require('../../../assets/background.jpg') : null
                        {uri: bgImage}
                    }
                    style={styles.mainContainer}
                    resizeMode="cover"
                >
                    <Header
                        title="Activities"
                        isLeftIcon
                        isCenterText
                        isRightIcon
                        fontSize={hp(2.2)}
                        marginRight={hp(5)}
                        navigation={navigation}
                    />

                    <View
                        style={[
                            styles.buttonGroup,
                            {
                                backgroundColor: color.g8,
                                borderColor:
                                    app_Theme == 'ultra_rare4' ? color.borderClr : 'transparent',
                            },
                        ]}
                    >
                        {ActivitiesBtn?.map((i, index) => (
                            <RNButton
                                key={i?.id}
                                index={index}
                                clr1={index == btnSelect ? color.linerClr1 : color.transparent}
                                clr2={index == btnSelect ? color.linerClr2 : color.transparent}
                                textColor={index == btnSelect ? color.bl1 : color.g7}
                                family={index == btnSelect ? font.medium : font.regular}
                                isSelect={btnSelect}
                                btnWidth={wp(45)}
                                btnHeight={hp(7)}
                                btnRadius={wp(10)}
                                btnVertical={hp(1)}
                                borderWidth={0.01}
                                fontSize={hp(1.5)}
                                borderClr={color.borderClr}
                                title={i.name}
                                onPress={() => BtnCall(index)}
                            />
                        ))}
                    </View>

                    {btnSelect == 0 ? (
                        <Messages navigation={navigation}/>
                    ) : (
                        <Notification navigation={navigation}/>
                    )}
                </ImageBackground>
            </LinearGradient>
        </View>
    );
};

export default Activities;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    buttonGroup: {
        marginHorizontal: wp(5),
        marginVertical: hp(1),
        height: hp(7),
        borderRadius: wp(10),
        //borderWidth: 1,
        flexDirection: 'row',
    },
});
