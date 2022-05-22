import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import * as Progress from 'react-native-progress';
import { styles } from './styles';
import { apiBaseAddress, FakeProgressBar } from '../../enviroments';
import Icon from 'react-native-vector-icons/FontAwesome';


const ExpBar = () => {

    const [expBar, setExbar] = useState(null)

    useEffect(() => LoadExpBarData(setExbar), [])

    return (<>

        <Text style={styles.title}>Experiência</Text>
        {
            expBar &&

            <View style={styles.container}>
                <Text style={styles.description}>
                    <Icon name="bolt" size={16} color="black" />
                   {"\t"} EXP {expBar.currentExp}/{expBar.totalExp} – Próximo ranking: {expBar.nextRanking}
                </Text>
                <Progress.Bar
                    progress={expBar.progressPercent}
                    height={25}
                    animationType={"timing"}
                    color={'green'}
                    unfilledColor={'lightgrey'}
                    animated={true}
                    width={250}
                    animationConfig={{ bounciness: 13 }}
                />
            </View>
        }


    </>)
};


function LoadExpBarData(setter) {
    fetch(`${apiBaseAddress}Progress/progress`,{
        headers:{
            'authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
    })
        .then(o => o.json())
        .then(o => setter(o))
        .catch(o=> setter(FakeProgressBar))
}


export default ExpBar

