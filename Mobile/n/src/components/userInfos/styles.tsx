import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({


    userPhoto: {
        width: 75,
        height: 75,
        borderRadius: 150,
        shadowColor: 'black',
        shadowRadius: 6,
        shadowOpacity: 5,
        shadowOffset: {
            width: 15,
            height: 15
        },

    },
    userContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 10,

        padding: 12,
        flexShrink: 1,

    },
    detailsBox: {
        marginLeft: 12,
        backgroundColor: 'black',
        padding: 12,
        width: "75%",
        textAlign: 'center'
    },
    title: {
        color: 'white',
        fontWeight: 'bold'
    },
    label: {
        color: 'white',
        fontWeight: 'normal',
        marginLeft: 3
    }, 
    
    imagebkg: {
        width: "100%",
        height: 150,
        justifyContent: "center"
    },

});