import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    mainContainer: { flex: 1 }, headerStyle: {
        height: hp(8), justifyContent: 'center', marginHorizontal: wp(5),
    }, storyHeaderBtnStyle: {
        width: wp(10), justifyContent: 'center', marginLeft: wp(3),
    }, storyContainer: {
        flex: 1, justifyContent: 'center', zIndex: 0,
    }, storyHeaderStyle: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255,0.2)',
        width: wp(90),
        justifyContent: 'space-between',
        alignSelf: 'center',
        height: hp(5),
        borderRadius: wp(2),
        zIndex: 1,
    }, btnScrollView: {
        flexDirection: 'row', position: 'absolute', width: wp(100), height: hp(70), top: hp(15),
    }, btnScrollStyle: {
        backgroundColor: 'transparent', width: wp(50), height: hp(90),
    }, isOpenStyle: {
        width: wp(30),
        position: 'absolute',
        right: wp(10),
        top: hp(5),
        padding: 10,
        borderRadius: wp(2),
        borderWidth: 1,
        zIndex: 1,
    }, buttonGroup: {
        marginHorizontal: wp(5),
        marginVertical: hp(1),
        height: hp(7),
        borderRadius: wp(10),
        borderColor: 'transparent',
        flexDirection: 'row',
    }, selectedButtonStyle: {
        backgroundColor: 'rgba(246, 200, 2, 0.9)', borderRadius: wp(8),
    }, storyViewStyle: {
        flexDirection: 'row', justifyContent: 'center', marginTop: hp(1), marginBottom: hp(2),
    }, noFoundView: { justifyContent: 'center', width: wp(100), height: hp(68) }, openShare: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
    }, menuOptionsStyle: {
        width: wp(28), borderRadius: 15, padding: 5, borderWidth: 1, borderColor: '#DCDCDC',
    }, storyLikeStyle: {
        flexDirection: 'row', marginHorizontal: wp(15), width: wp(15), height: hp(5), justifyContent: 'center',
    }, storyLineText: {
        fontSize: wp(4.5), marginLeft: wp(2),
    }, videoStyle: {
        width: wp(100), height: hp(50),
    }, storyImageStyle: {
        width: wp(100), height: hp(100), alignSelf: 'center', resizeMode: 'cover',
    }, btnStyle: {
        width: wp(30), height: hp(7), borderRadius: wp(10), borderColor: 'transparent', marginVertical: hp(1),
    }, inner: {
        width: '100%', height: 30, borderRadius: 15,
    }, label: {
        fontSize: 23, color: 'black', position: 'absolute', zIndex: 1, alignSelf: 'center',
    }, progressViewBar: {
        backgroundColor: 'rgba(255, 255, 255, 0.21)',
        width: wp(36),
        height: hp(0.7),
        marginHorizontal: wp(4),
        borderRadius: wp(10),
    }, progressViewBar2: {
        height: hp(0.7), borderRadius: wp(10),
    }, square: {
        height: 50, width: 50, backgroundColor: 'red',
    },
});
