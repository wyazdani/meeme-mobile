import * as React from "react";
import {StyleSheet, View} from "react-native";
import {Children, cloneElement, isValidElement} from "react";

const styles = StyleSheet.create({
    outline: {
        position: "absolute",
    },
});

export class TextStroke extends React.Component {
    createClones = (w, h, color) => {
        const {children} = this.props;
        return Children.map(children, (child) => {
            if (isValidElement(child)) {
                const currentProps = child.props;
                const currentStyle = currentProps ? currentProps.style || {} : {};

                const newProps = {
                    ...currentProps, style: {
                        ...currentStyle, textShadowOffset: {
                            width: w, height: h,
                        }, textShadowColor: color, textShadowRadius: 1,
                    },
                };
                return cloneElement(child, newProps);
            }
            return child;
        });
    };

    render() {
        const {color, stroke, children} = this.props;
        const strokeW = stroke;
        const topLeft = this.createClones(-strokeW, -strokeW, color);
        const topRight = this.createClones(strokeW, -strokeW, color);
        const bottomLeft = this.createClones(-strokeW, strokeW, color);
        const bottomRight = this.createClones(strokeW, strokeW, color);

        return (<View>
            <View style={styles.outline}>{topLeft}</View>
            <View style={styles.outline}>{topRight}</View>
            <View style={styles.outline}>{bottomLeft}</View>
            {bottomRight}
        </View>);
    }
}
