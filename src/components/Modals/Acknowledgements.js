import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {fonts} from '../../Themes/FontsConfig';
import {useTheme} from 'react-native-paper';
import RNButton from '../RNButton';
import {useSelector} from 'react-redux';

const Acknowledgements = ({title, description, show, hide, onPressAgree}) => {
    const {color} = useTheme();
    const {fontChange} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);

    return (
        <Modal
            isVisible={show}
            onBackdropPress={() => hide(false)}
            animationIn="fadeIn"
            animationOut="fadeOut"
        >
            <View style={{...styles.main, backgroundColor: color?.g6}}>
                <View style={styles.rulesContainer}>
                    <Text
                        style={{
                            ...styles.title,
                            fontFamily: font?.bold,
                            color: color?.white,
                        }}
                    >
                        {title}
                    </Text>
                    {description?.map((str, index) => {
                        return (
                            <Text
                                key={index}
                                style={{
                                    ...styles.description,
                                    fontFamily: font?.medium,
                                    color: color?.white,
                                }}
                            >
                                {str}
                            </Text>
                        );
                    })}
                    {onPressAgree ? (
                        <RNButton
                            clr1={color.linerClr1}
                            clr2={color.linerClr2}
                            textColor={color.bl1}
                            family={font.medium}
                            btnWidth={wp(43)}
                            btnHeight={hp(6)}
                            btnTop={hp(3)}
                            btnRadius={wp(10)}
                            title={'Agree'}
                            onPress={onPressAgree}
                        />
                    ) : null}
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => hide(false)}
                    style={styles.cross}
                >
                    <Image
                        source={require('../../../assets/pngs/cross.png')}
                        style={{width: 40, height: 40, resizeMode: 'contain'}}
                    />
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default Acknowledgements;

const styles = StyleSheet.create({
    main: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: hp(5),
        borderWidth: 1,
        borderColor: 'white',
    },
    title: {
        fontSize: hp(2.5),
        textAlign: 'center',
        marginBottom: hp(3),
    },
    description: {
        fontSize: hp(1.8),
        marginTop: hp(0.5),
    },
    rulesContainer: {
        width: '80%',
        justifyContent: 'center',
        marginVertical: hp(4),
    },
    cross: {
        position: 'absolute',
        top: -15,
        right: 5,
    },
});
