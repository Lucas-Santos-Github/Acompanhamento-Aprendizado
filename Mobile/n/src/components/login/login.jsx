import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { apiBaseAddress } from '../../enviroments'
import { AppContext } from '../contexts/appContext';

export default function Login(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {setUser} = useContext(AppContext);

  function Authenticate() {

    fetch(`${apiBaseAddress}Users/authenticate`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        email,
        senha: password
      })
    })
      .then(o => o.json())
      .then(o => AuthValidation(o))
      .catch(e => console.log(e))

  }

  function AuthValidation(user) {
    
    if (String(user.jwt).trim().toLowerCase() === 'not found') {
      alert('Usuário ou senha inválidos ! 😒')
      return;
    }

    setUser(user.user)
    props.authenticate(true);
    localStorage.setItem('userToken', user.jwt)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Gameficação</Text>
      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={text => setEmail(text)} />
      </View>
      <View style={styles.inputView} >
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={text => setPassword(text)} />
      </View>
     
      <TouchableOpacity style={styles.loginBtn}>
        <Text onPress={Authenticate} style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>



    </View>
  );



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "white"
  },
  forgot: {
    color: "white",
    fontSize: 11
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: "white"
  }
});
