import {configureFonts, DefaultTheme} from 'react-native-paper';
import {font} from './FontsConfig';

export const UltraRareT13 = {
    ...DefaultTheme,
    font: configureFonts(font),

    // Specify custom property
    myOwnProperty: true,
    // Specify custom property in nested object
    color: {
        //Primary Colr
        bgColor: 'white',
        bgColor1: 'black',
        bgColor2: 'black',
        appTutorialColor: '#4D4554',

        linerClr1: '#38646B',
        linerClr2: '#38646B',
        // yellow and orange

        linerClr3: '#16B169',
        linerClr4: '#16B197',
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

        borderClr: '#38646B',
        black: 'black',
        white: 'black',

        //black

        bl1: 'white',
        bl2: '#000000CC',
        bl3: '#1B1B1B',
        bl4: 'white',

        //blue
        blue: 'black',
        b1: 'red',

        //green
        green: '#00853D',
        gr: 'rgba(253, 213, 111, 0.5)',
        gr1: '#4FBF67',

        //gray
        g1: 'black',

        g2: '#4F555D',
        g3: 'black',
        g4: 'rgba(255, 255, 255, 0.09)',
        g5: '#2B2B2B',

        g6: '#16B199',
        g7: '#23262F',

        g8: '#FFF',
        g9: '#000',

        g10: '#FFF',
        g11: '#D0D0D0',

        g12: '#000',
        g13: '#454545',
        g14: '#FFFFFF1A',
        g15: '#7D7D7D',
        g16: '#7C7C7C',
        g17: '#CCCCCC',

        g18: '#000',
        g19: '#C5C5C5',
        g20: '#A4A4A4',
        //yellow

        y1: '#818F90',
        y2: 'rgba(254, 220, 132, 1)',
        y3: 'rgba(247, 180, 7, 1)',
        y4: '#FFCD2F',
        y5: '#FBCB50',
        y6: '#FFE9EB',
        calander: '#201E23',
        //red
        r1: '#FF4B55',
        r2: 'rgba(255, 0, 0, 0.37)',

        filter: '#16B199',
        //orange
        o1: '#FEBB59',
        o2: '#FFE73C',
        transparent: 'transparent',
        notiBtn: 'transparent',

        msgTextColor: '#FFF',
    },
};
