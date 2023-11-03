import {configureFonts, DefaultTheme} from 'react-native-paper';
import {font} from './FontsConfig';

export const RareT2 = {
    ...DefaultTheme,
    font: configureFonts(font),

    // Specify custom property
    myOwnProperty: true,
    // Specify custom property in nested object
    color: {
        //Primary Colr
        bgColor: '#865BE0',
        bgColor1: '#DEB944',
        bgColor2: '#F9EC62',
        linerClr1: '#CA4BD5',
        linerClr2: '#CA4BD5',
        // yellow and orange
        linerClr3: '#865BE0',
        linerClr4: '#865BE0',
        // light yellow and orange
        linerClr5: '#865BE0',
        linerClr6: '#865BE0',
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

        borderClr: 'black',
        black: 'black',
        white: 'black',
        calander: '#201E23',

        //blue
        blue: 'white',
        b1: '#695CFF',

        //green
        green: '#00853D',
        gr: 'rgba(253, 213, 111, 0.5)',
        gr1: '#4FBF67',

        //black
        bl1: 'black',
        bl2: '#000000CC',
        bl4: 'black',

        //gray
        g1: 'black',
        g2: 'black',
        g3: 'black',
        g4: 'rgba(255, 255, 255, 0.09)',
        g5: '#2B2B2B',
        g6: '#9851DF',
        g7: 'black',
        g8: '#D581F0',
        g9: '#565656',
        g10: 'black',
        g11: '#9B9B9B',
        g12: '#C1C1C1',
        g13: '#454545',
        g14: '#FFFFFF1A',
        g15: 'white',
        g16: '#7C7C7C',
        g17: '#CCCCCC',
        g18: 'black',
        g19: 'black',
        g20: 'black',

        //yellow
        y1: '#A378F6',
        y2: 'rgba(254, 220, 132, 1)',
        y3: 'rgba(247, 180, 7, 1)',
        y4: '#FFCD2F',
        y5: '#FBCB50',
        y6: 'white',

        //red
        r1: '#FF4B55',
        r2: 'rgba(255, 0, 0, 0.37)',
        filter: '#865BE0',
        //orange

        o1: '#FEBB59',
        o2: '#FFE73C',
        transparent: '#DEB944',
        notiBtn: 'white',
        msgTextColor: '#E3E3E3',
    },
};
