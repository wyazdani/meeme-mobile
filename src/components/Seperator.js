import {StyleSheet, View} from "react-native";
import React from "react";
import {color} from "../../assets/colors";

const Seperator = () => {
    return <View style={styles.line}/>;
};

export default Seperator;

const styles = StyleSheet.create({
    line: {
        width: "100%", height: 1, backgroundColor: color?.g10,
    },
});
