import React, { useEffect, useState } from 'react'
import { Text, Image, View, ImageBackground } from 'react-native';
import { styles } from './styles';
import { apiBaseAddress, FakeUser } from '../../enviroments'


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
            o.birthDay = GetAge(o);
            setUser(o);
        })
        .catch(o => {


            let t = FakeUser
            t.birthDay = GetAge(t)

            setUser(t)

        })
}

function GetAge(o) {
    return (new Date().getFullYear()
        - new Date(o.birthDay).getFullYear()).toString()

}


export default UserInfos;

