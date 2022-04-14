import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    iconImage: {
        width: 75,
        height: 75,
        marginRight: 17
    },
    achvimentView: {
        display: 'flex',
        flexDirection: 'row',
        borderColor: 'grey',
        borderWidth: 5,
        marginTop: 12,
        marginLeft: 8,
        marginRight:8,
        borderRadius: 6,
        padding: 22,
        marginBottom:5,
        flexWrap:'wrap',
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 5,
        backgroundColor: 'black',
        color: 'white'
    },
    achvimentBodyView: {
        display: 'flex',
        flexDirection: 'column',
    },
    achvTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 6.5,
    },
    achDesc: {
        color: 'grey',
        fontWeight: 'bold',
    },
    mainView:{
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center'
    }
})