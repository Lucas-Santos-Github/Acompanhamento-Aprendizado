import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import UserInfo from '../user-info/user-info';

export default function UserCard() {
  return (
      <Card style={{width: 400}}>
        <Card.Content style={styles.content}>
          <Avatar.Image  size={80} source={require('../../../assets/img/gengar.jpg')} /> 
          <UserInfo />     
        </Card.Content>
      </Card>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  }  
});