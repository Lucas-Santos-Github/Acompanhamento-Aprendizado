import React, { useEffect, useState } from 'react'
import { Text, View, Image } from 'react-native'
import { styles } from './styles';
import { apiBaseAddress, FakeAchviments } from '../../enviroments'

const Achivments = () => {

    const [achivments, setAchviments] = useState([]);

    useEffect(() => LoadAchviments(setAchviments), [])

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


function LoadAchviments(setAchviments: Function): void {
    fetch(`${apiBaseAddress}achivments`)
        .then(o => o.json())
        .then(o => setAchviments(o))
        .catch(o => setAchviments(FakeAchviments))
}


export default Achivments;