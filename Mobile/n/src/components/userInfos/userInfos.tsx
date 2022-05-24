import React, { useEffect, useState } from 'react'
import { Text, Image, View, ImageBackground, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import {  FakeUser } from '../../enviroments'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const UserInfos = (props) => {


    const [user, setUser] = useState(null);


    useEffect(() => LoadUserData(setUser, props.user), [props.user])

    return (

        <>
            {
                user &&
                <ImageBackground source={{ uri: user.background }} resizeMode="cover" style={styles.imagebkg}>
                    <View style={styles.userContainer}>
                        {user && <Image style={styles.userPhoto} source={{ uri: user.photo }}
                        ></Image>}

                        <View style={styles.detailsBox}>
                            <Text style={styles.title}> Nome:  <Text style={styles.label}>{user.nome}</Text> </Text>
                            <Text style={styles.title}> Nascimento: <Text style={styles.label}>{user.nascimento}</Text> </Text>
                            <Text style={styles.title}> Pefil:   <Text style={styles.label}>{user.role}</Text> </Text>
                        </View>

                        <TouchableOpacity>
                            <MaterialCommunityIcons
                                onPress={()=> props.logout(false)}
                                name='logout'
                                size={45}
                                style={{ backgroundColor: 'black', fontWeight: 'bold', padding: 12 }}
                                color={'purple'}
                            />
                        </TouchableOpacity>

                    </View>
                </ImageBackground>
            }

        </>
    );

};


function LoadUserData(setUser: Function, user: any): void {
    user.background = FakeUser.background;
    user.photo = FakeUser.photo;
    setUser(user);   
}



export default UserInfos;

