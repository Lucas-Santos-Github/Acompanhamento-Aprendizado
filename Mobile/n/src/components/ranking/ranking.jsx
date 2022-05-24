import React from 'react';
import { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import Lista from '../lista/Lista';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { apiBaseAddress } from '../../enviroments';

const Ranking = () => {
    const [searchText, setSearchText] = useState('');
    const [list, setList] = useState([]);


    useEffect(() => GetRanking(setList), [])


    //Filtrar letras na barra de pesquisa
    useEffect(() => {

        if (searchText == '') {
            GetRanking(setList)
        }
        else {
            setList(list.filter(item => (item.nome.toLowerCase().indexOf(searchText.toLowerCase()) > -1)));
        }
    }, [searchText]);
    //FIM - Filtrar letras na barra de pesquisa

    //Ordenar por ordem alfabética
    const handleOrderClickNome = () => {
        let newlistUsu = [...list];
        newlistUsu.sort((a, b) => {
            if (a.nome > b.nome) {
                return 1;
            }
            else {
                if (b.nome > a.nome) {
                    return -1;
                }
                else {
                    return 0;
                }
            }
        })
        setList(newlistUsu);
    };
    //FIM - Ordenar por ordem alfabética

    //Ordenar por XP
    const handleOrderClickXP = () => {
        let newlistUsu = [...list];

        newlistUsu.sort((a, b) => {
            if (a.nota < b.nota) {
                return 1;
            }
            else {
                if (b.nota < a.nota) {
                    return -1;
                }
                else {
                    return 0;
                }
            }

        })

        setList(newlistUsu);
    };
    //FIM - Ordenar por XP  

    return (

        <SafeAreaView style={styles.container}>

            <View style={styles.caixaPesquisa}>

                <TextInput
                    style={styles.textoPesquisa}
                    placeholder="Nome do Usuário"
                    placeholderTextColor="#000000"
                    value={searchText}
                    onChangeText={(t) => setSearchText(t)}
                />

                <TouchableOpacity onPress={handleOrderClickXP} style={styles.orderButton}>
                    <MaterialCommunityIcons
                        name="podium-gold"
                        size={25}
                        color="black"
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleOrderClickNome} style={styles.orderButton}>
                    <MaterialCommunityIcons
                        name="order-alphabetical-ascending"
                        size={25}
                        color="black"
                    />
                </TouchableOpacity>

            </View>

            <FlatList
                data={list}
                style={styles.list}
                renderItem={({ item }) => <Lista data={item} />}
                keyExtractor={(item, i) => i}
            />

        </SafeAreaView>
    );
};

function GetRanking(setter) {
    fetch(`${apiBaseAddress}Ranking/Ranking`, {
        headers: {
            'authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
    })
        .then(o => o.json())
        .then(o => {
            console.log(o)
            o.forEach((o,i) => {
                o.pos = i;
                o.foto = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${150 -i}.png`
            })
            setter(o);
        })
        .catch(e => console.log(e))

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    textoPesquisa: {
        flex: 1,
        height: 40,
        backgroundColor: '#c8c8c8',
        margin: 20,
        borderRadius: 5,
        fontSize: 15,
        paddingLeft: 20,
        paddingRight: 10,
        color: 'black',
    },

    caixaPesquisa: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    orderButton: {
        width: 30,
        marginRight: 15,
    },

    list: {
        flex: 1,
    },
})

export default Ranking;
