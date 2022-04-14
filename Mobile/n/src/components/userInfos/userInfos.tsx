import React, { useEffect, useState } from 'react'
import { Text, Image, View, ImageBackground } from 'react-native';
import { styles } from './styles';
import {apiBaseAddress} from '../../enviroments'


const UserInfos = () => {


    const [user, setUser] = useState(null);


    useEffect(() => LoadUserData(setUser), [])

    return (

        <>
            {
                user &&
                <ImageBackground source={{ uri: user.background }} resizeMode="cover" style={styles.imagebkg}>
                    <View style={styles.userContainer}>
                        {user && <Image style={styles.userPhoto} source={{ uri: user.photo }}
                        ></Image>}

                        <View style={styles.detailsBox}>
                            <Text style={styles.title}> Nome:  <Text style={styles.label}>{user.name}</Text> </Text>
                            <Text style={styles.title}> Idade: <Text style={styles.label}>{user.birthDay}</Text> </Text>
                            <Text style={styles.title}> Ranking:   <Text style={styles.label}>{user.ranking}</Text> </Text>
                        </View>
                    </View>
                </ImageBackground>
            }

        </>
    );

};


function LoadUserData(setUser: Function): void {
    fetch(`${apiBaseAddress}user`)
        .then(o => o.json())
        .then(o => {

            o["birthDay"] = (new Date().getFullYear()
                - new Date(o.birthDay).getFullYear())

            setUser(o);
        })
        .catch(o=> alert(o))
}


export default UserInfos;

