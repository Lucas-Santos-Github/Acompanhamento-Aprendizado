import React, { useContext, useEffect, useState } from 'react'
import { Text, View, Image } from 'react-native'
import { styles } from './styles';
import { apiBaseAddress, FakeAchviments } from '../../enviroments'
import { AppContext } from '../contexts/appContext';
import AsyncStorage from '@react-native-async-storage/async-storage';




const Achivments = () => {

    const [achivments, setAchviments] = useState([]);
    

    useEffect( () => { LoadAchviments(setAchviments)}, [])

    return (


        <>
            <Text style={styles.title}>Conquistas</Text>
            {
                achivments.map((o, i) => <View key={i} style={styles.mainView}>

                    <View style={styles.achvimentView}>
                        <Image source={{ uri: o.icon }}
                            style={styles.iconImage}
                        ></Image>
                        <View style={styles.achvimentBodyView}>
                            <Text style={styles.achvTitle}>{o.title}</Text>
                            <Text style={styles.achDesc}>{o.description}</Text>
                        </View>
                    </View>


                </View>)
            }

        </>
    )
}


 async function LoadAchviments(setAchviments: Function)  {

    fetch(`${apiBaseAddress}achivments/userachitivments`, {
            method:'GET',
            headers:{
                'authorization': `Bearer ${await AsyncStorage.getItem('token')}`
            }
    })
        .then(o => o.json())
        .then(o =>setAchviments(o))
        .catch(o => setAchviments(FakeAchviments))
}


export default Achivments;