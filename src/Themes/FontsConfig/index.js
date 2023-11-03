import {BlackThemeFonts, fontsStyle1, fontsStyle2} from "./BlackThemeFonts";

export const fonts = (fontStyle) => {

    if (fontStyle == "f1") {
        return BlackThemeFonts
    } else if (fontStyle == 'f2') {
        return fontsStyle1
    } else if (fontStyle == 'f3') {
        return fontsStyle2
    }
}