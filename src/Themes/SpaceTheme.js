import {configureFonts, DefaultTheme} from 'react-native-paper';
import {font} from './FontsConfig';

export const SpaceTheme = {
    ...DefaultTheme,
    font: configureFonts(font),

    // Specify custom property
    myOwnProperty: true,
    // Specify custom property in nested object
    color: {
        //Primary Colr
        bgColor: '#060628',
        bgColor1: '#060628',
        bgColor2: '#060628',
        linerClr1: 'rgba(93, 51, 173, 1)',
        linerClr2: 'rgba(23, 26, 89, 1)',
        // yellow and orange
        linerClr3: 'rgba(93, 51, 173, 1)',
        linerClr4: 'rgba(23, 26, 89, 1)',
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

        borderClr: '#616161',
        black: 'black',
        white: '#FFFFFF',
        calander: '#201E23',

        //blue
        blue: '#74BBF3',
        b1: '#695CFF',

        //green
        green: '#00853D',
        gr: 'rgba(253, 213, 111, 0.5)',
        gr1: '#4FBF67',

        //black
        bl1: 'white',
        bl2: '#000000CC',
        bl4: 'white',

        //gray
        g1: '#888888',
        g2: '#BABABA',
        g3: 'rgba(65, 65, 65, 1)',
        g4: 'rgba(255, 255, 255, 0.09)',
        g5: '#2B2B2B',
        g6: '#292929',
        g7: '#B6B6B6',
        g8: '#201E23',
        g9: '#565656',
        g10: '#151515',
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
        y1: '#A378F6',
        y2: 'rgba(254, 220, 132, 1)',
        y3: 'rgba(247, 180, 7, 1)',
        y4: '#FFCD2F',
        y5: '#FBCB50',

        //red
        r1: '#FF4B55',
        r2: 'rgba(255, 0, 0, 0.37)',
        filter: '#060628',
        //orange

        o1: '#FEBB59',
        o2: '#FFE73C',
        transparent: '#201E23',
        notiBtn: 'black',
        msgTextColor: 'transparent',
    },
};
