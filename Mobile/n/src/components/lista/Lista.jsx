import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';

const Lista = ({data}) => {

  return (

    <TouchableOpacity style={styles.usu}>
      
      <View style={styles.listaUsu}>
        <Text style = {styles.posRank}> {"#"+data.pos} </Text>
        <Image style={styles.fotoUsu} source={{ uri: data.foto }}/>
        <Text style={styles.nomeUsu}>{data.nome} </Text>
        
      </View>
      <Text style={styles.xpUsu}>{data.nota + " XP"}</Text>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  usu:{
    marginLeft: 20,
    marginRight: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingTop: 10,
    paddingBottom: 15,
  },

  fotoUsu:{
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'stretch',
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "gray",
    marginLeft: 5,
  },

  listaUsu: {
     flexDirection: 'row',
    marginLeft: 10,
  },

  nomeUsu: {
    fontSize: 17,
    color: 'black',
    marginBottom: 1,
    marginLeft: 10,
    fontFamily: 'Open Sans',
  },

  xpUsu: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 100,
    marginTop: -20
  },

  posRank: {
    fontSize: 15,
    color: 'black',
}
})



export default Lista;