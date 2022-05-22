import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Badge } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { apiBaseAddress } from '../../enviroments';

const Progress = (props) => {

  const [ranking, setRanking] = useState('')
  const [xp, setXp] = useState('')

  useEffect(()=> LoadExpBarData(setXp,setRanking),[])

  return (

    <View style={style.EstiloDeFundo}>
      <ScrollView showsVerticalScrollIndicator={false} style={style.scrollView}>

        <View style={style.SecondView}>
          <Card style={style.CardEdition}>
          <Paragraph style={style.EditorTextRanking}> {ranking} </Paragraph>
            <Image style={{ width: 80, height: 80, marginLeft: 25 }}
              source={{
                uri:
                  'https://icons-for-free.com/download-icon-page+quality+rank+icon-1320190816917337266_512.png'
              }} />

          </Card>

          <Card style={style.CardEdition2}>
          <Paragraph style={style.EditorTextXP}> {xp} </Paragraph>

            <Image style={{ width: 80, height: 80, marginLeft: 25 }}
              source={{
                uri:
                  'https://cdn-icons-png.flaticon.com/128/5542/5542205.png'
              }} />

          </Card>
        </View>

        
 <Text style = {style.EstiloFonte}> Níveis </Text>
 <Card style ={style.EditCard1}>
    <Card.Cover style ={style.EditCard} source={{ uri: 'https://p4.wallpaperbetter.com/wallpaper/447/658/479/roronoa-zoro-4k-new-hd-pc-wallpaper-thumb.jpg' }} />
      <Card.Content  style ={style.Card}>
      <Title style = {{textAlign: "center",fontFamily: 'Open Sans',fontWeight:'900'}}>Nível 1</Title>
      <Paragraph style = {{textAlign: "justify"}}>Descrição nível 1</Paragraph>
          <Badge style = {{marginRight: 80, marginTop: 5, backgroundColor: "#000000"}}>5000XP</Badge>
    </Card.Content>
  </Card>

   <Card style ={style.EditCard1}>
    <Card.Cover style ={style.EditCard} source={{ uri: 'https://besthqwallpapers.com/Uploads/24-4-2018/49759/thumb2-4k-vegeta-fan-art-profile-dragon-ball-z.jpg' }} />
  
      <Card.Content  style ={style.Card}>
      <Title style = {{textAlign: "center",fontFamily: 'Open Sans',fontWeight:'900'}}>Nível 2</Title>
      <Paragraph style = {{textAlign: "justify"}}>Descrição nível 2</Paragraph>
       <Badge style = {{marginRight: 80, marginTop: 5, backgroundColor: "#000000" }}>20000XP</Badge>
    </Card.Content>
  </Card>
  <Card style ={style.EditCard1}>
    <Card.Cover style ={style.EditCard} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgWBfX7C2Z1CRbdgVUPmYiP105LbBi2IBeqw&usqp=CAU' }} />
      <Card.Content  style ={style.Card}>
      <Title style = {{textAlign: "center",fontFamily: 'Open Sans',fontWeight:'900'}}>Nível 3</Title>
      <Paragraph style = {{textAlign: "justify"}}>Descrição Nível 3</Paragraph>
        <Badge style = {{marginRight: 80, marginTop: 5, backgroundColor: "#000000" }}>30000XP</Badge>
    </Card.Content>
  </Card>
  <Card style ={style.EditCard1}>
    <Card.Cover style ={style.EditCard} source={{ uri: 'https://besthqwallpapers.com/Uploads/2-7-2018/57797/thumb2-ultra-instinct-goku-4k-son-goku-fire-dragon-ball.jpg' }} />
      <Card.Content  style ={style.Card}>
      <Title style = {{textAlign: "center",fontFamily: 'Open Sans',fontWeight:'900'}}>Nível 4</Title>
      <Paragraph style = {{textAlign: "justify"}}>Descrição Nível 4</Paragraph>
          <Badge style = {{marginRight: 80, marginTop: 5, backgroundColor: "#000000"}}>5000XP</Badge>
    </Card.Content>
  </Card>
  <Card style ={style.EditCardLast}>
    <Card.Cover style ={style.EditCard} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxmp59t-tgQDuK_XUpXmUIJYOWXJ-9M7soSg&usqp=CAU' }} />
      <Card.Content  style ={style.Card}>
      <Title style = {{textAlign: "center",fontFamily: 'Open Sans',fontWeight:'900'}}>Nível 5</Title>
      <Paragraph style = {{textAlign: "justify"}}>Descrição nível 5</Paragraph>
          <Badge style = {{marginRight: 80, marginTop: 5, backgroundColor: "#000000"}}>5000XP</Badge>
    </Card.Content>
  </Card>
  

      </ScrollView>
    </View >





  );

}


function LoadExpBarData(setxp,setranking) {
  fetch(`${apiBaseAddress}Progress/progress`,{
      headers:{
          'authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
  })
      .then(o => o.json())
      .then(o => {
        setxp(o.currentExp)
        setranking(o.currentRanking)
      })
      .catch(o=> console.log(e))
}

const style = StyleSheet.create({
  scrollView: {
    marginHorizontal: 30,
    maxHeight: 700,
    overflow: 'scroll'

  },
  EditCardLast: {
    marginBottom: 40
  },
  EstiloDeFundo: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  EstiloFonte: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
    fontFamily: 'cursive',
    fontWeight: '900',
    color: '#000000'
  },
  EstiloFonteNivel: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
    fontFamily: 'cursive',
    fontWeight: '900',
    color: '#000000',
    marginTop: -10
  },
  FotoPerfilProgress: {
    width: 100,
    height: 100,
    borderRadius: 200 / 2,
    marginTop: 20,
    alignItems: "center",
    marginLeft: 90


  },
  SubtitlePerfil: {
    fontSize: 13,
    marginTop: -10,
    textAlign: 'center',
    fontFamily: 'cursive',
    color: '#000000'
  },
  CardEdition: {
    marginTop: 20,
    width: 130,
    height: 130,
    shadowRadius: 10,
    borderRadius: 15,
    backgroundColor: '#1d256e'
  },
  CardEdition2: {
    marginTop: 20,
    width: 130,
    height: 130,
    marginLeft: 20,
    shadowRadius: 10,
    borderRadius: 15,
  },
  SecondView: {
    flexDirection: "row"

  },
  MiniTitle: {
    fontSize: 11,
    marginTop: 10,
    color: '#2f2f2f',
    fontFamily: 'Open Sans',
    fontWeight: '900',
    textAlign: "center"
  },
  EditCard1: {
    marginTop: 20,
  },
  EditCard: {
    marginTop: 0,
    shadowRadius: 10,
    backgroundColor: '#33c8f2',
    resizeMode: "contain",

  },

  Card: {
    width: 255,
    height: 200,
    shadowRadius: 10,
    color: '#2f2f2f',
  },
  EditorTextRanking: {
    fontSize: 13,
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'cursive',
    color: '#FFFFFF'
  },
  EditorTextXP: {
    fontSize: 13,
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'cursive',
    color: '#000000'
  }
})
export default Progress;

