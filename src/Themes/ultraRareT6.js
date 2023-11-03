import {configureFonts, DefaultTheme} from 'react-native-paper';
import {font} from './FontsConfig';

export const UltraRareT6 = {
    ...DefaultTheme,
    font: configureFonts(font),

    // Specify custom property
    myOwnProperty: true,
    // Specify custom property in nested object
    color: {
        //Primary Colr
        bgColor: 'black',
        bgColor1: 'black',
        bgColor2: 'black',
        appTutorialColor: '#4D4554',
        linerClr1: '#FF616E',
        linerClr2: '#FF616E',
        // yellow and orange
        linerClr3: '#FF616E',
        linerClr4: '#FF616E',
        // light yellow and orange
        linerClr5: '#FFDF8D',
        linerClr6: '#F4B30E',
        // purple and black
        linerClr7: '#B461F4',
        linerClr8: '#671BA3',
        // green and white
        linerClr9: '#74FF67',
        linerClr10: '#1D8B14',
        // gradient text
        linerClr11: '#FFEBB8',
        linerClr12: '#FFB800',
        // light purple and black
        linerClr13: '#C67DFF',
        linerClr14: '#8A26D8',

        borderClr: '#FFFFFF',
        black: 'black',
        white: 'black',

        //black
        bl1: 'white',
        bl2: '#000000CC',
        bl3: '#1B1B1B',
        bl4: 'white',

        //blue
        blue: '#74BBF3',
        b1: 'red',

        //green
        green: '#00853D',
        gr: 'rgba(253, 213, 111, 0.5)',
        gr1: '#4FBF67',

        //gray
        g1: '#888888',
        g2: 'black',
        g3: 'rgba(65, 65, 65, 1)',
        g4: 'rgba(255, 255, 255, 0.09)',
        g5: '#2B2B2B',
        g6: '#FFB4BA',
        g7: 'black',
        g8: '#FFDCDF',
        g9: '#565656',
        g10: '#FFFFFF',
        g11: '#9B9B9B',
        g12: '#C1C1C1',
        g13: '#454545',
        g14: '#FFFFFF1A',
        g15: '#7D7D7D',
        g16: '#7C7C7C',
        g17: '#CCCCCC',
        g18: '#A1A1A1',
        g19: '#C5C5C5',
        g20: '#A4A4A4',
        //yellow
        y1: '#FFCD2F',
        y2: 'rgba(254, 220, 132, 1)',
        y3: 'rgba(247, 180, 7, 1)',
        y4: '#FFCD2F',
        y5: '#FBCB50',
        y6: '#FFE9EB',
        calander: '#201E23',
        //red
        r1: '#FF4B55',
        r2: 'rgba(255, 0, 0, 0.37)',
        filter: '#FF4A59',
        //orange
        o1: '#FEBB59',
        o2: '#FFE73C',
        transparent: '#FFDCDF',
        notiBtn: 'black',
        msgTextColor: 'white',
    },
};
