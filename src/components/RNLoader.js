import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SkypeIndicator} from 'react-native-indicators';
import {useTheme} from 'react-native-paper';

export const AppLoader = ({loader_color, loading}) => {
    const {color} = useTheme();
    return (<>
            {loading ? (<View style={styles.container}>
                    <SkypeIndicator size={50} color={loader_color || color.white}/>
                </View>) : null}
        </>);
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
    },
});
