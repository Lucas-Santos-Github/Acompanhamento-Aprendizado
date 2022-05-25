import React, { useContext, useEffect } from 'react'
import { Text, Image, View, ImageBackground, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { FakeUser } from '../../enviroments'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppContext } from '../contexts/appContext';

const UserInfos = (props) => {

    const { user, setUser } = useContext(AppContext);
    ProcessUserData(user, setUser)

    return (

        <>
            {
                user &&
                <ImageBackground source={{ uri: FakeUser.background }} resizeMode="cover" style={styles.imagebkg}>
                    <View style={styles.userContainer}>
                        {user &&
                            <Image style={styles.userPhoto} source={{ uri: user.photo }}
                            ></Image>}

                        <TouchableOpacity>
                            <MaterialCommunityIcons
                                onPress={() => props.logout(false)}
                                name='logout'
                                size={15}
                                style={{ backgroundColor: 'black', fontWeight: 'bold', padding: 2 }}
                                color={'purple'}
                            />
                        </TouchableOpacity>
                        <View style={styles.detailsBox}>
                            <Text style={styles.title}> Nome:  <Text style={styles.label}>{user.nome}</Text> </Text>
                            <Text style={styles.title}> Pefil:   <Text style={styles.label}>{user.role}</Text> </Text>
                            <Text style={styles.title}> Genêro:   <Text style={styles.label}>{user.genero}</Text> </Text>
                            <Text style={styles.title}> Data Nascimento: <Text style={styles.label}>{user.nascimento}</Text> </Text>
                            <Text style={styles.title}> Email: <Text style={styles.label}>{user.email}</Text> </Text>
                        </View>


                    </View>
                </ImageBackground>
            }

        </>
    );

};

function ProcessUserData(user, setUser) {

    let birthDay = new Date(user.nascimento);
    user.nascimento =
        `${birthDay.getDate()}/${birthDay.getMonth()}/${birthDay.getFullYear()}`;
    user.photo = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${(Math.floor(Math.random() * 10))}.png`;
    setUser(user);
}





export default UserInfos;

