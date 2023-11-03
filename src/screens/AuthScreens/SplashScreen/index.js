import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import {useSelector} from 'react-redux';

let randomNum = '';

const SplashScreen = ({navigation}) => {
    const isLogin = useSelector((state) => state.authReducer.isLogin);
    randomNum = Math.floor(Math.random() * 5 + 1);

    useEffect(() => {
        setTimeout(() => {
            if (isLogin) {
                navigation.replace('After');
            } else {
                navigation.replace('Before');
            }
        }, 1000);
    }, []);

    return (<View style={styles.container}>
        <Image
            source={randomNum == 1 ? require('../../../../assets/pngs/splash1.png') : randomNum == 2 ? require('../../../../assets/pngs/splash4.png') : randomNum == 3 ? require('../../../../assets/pngs/splash3.png') : require('../../../../assets/pngs/splash2.png')}
            resizeMode="cover"
            style={styles.imageStyle}
        />
    </View>);
};

export default SplashScreen;

const styles = {
    container: {
        flex: 1, backgroundColor: 'black',
    }, imageStyle: {height: '100%', width: '100%', alignSelf: 'center'},
};
