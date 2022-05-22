import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({

    title:{
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 5,
        backgroundColor: 'black',
        color: 'white'
    },
    description:{
        marginTop:5,
        padding: 6,
        fontWeight:'bold'
    },
    container:{
        paddingLeft: 12,
        marginBottom: 12,
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
        
    },
    ProgressBar: {
        width: 210,
        height: 20,
        borderRadius: 8,
        marginLeft: 30
      },
    
})

