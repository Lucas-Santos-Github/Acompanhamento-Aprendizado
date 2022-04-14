import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import UserInfo from './src/components/user-info/user-info'
import UserCard from './src/components/user-card/user-card'
import ExpBar from './src/components/exp-bar/exp-bar'
import Achievements from './src/components/achievements/achievements';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>APP CESAR</Text>
      <StatusBar style="auto" /> */}
      <UserCard></UserCard>
      <ExpBar />
      <Achievements></Achievements>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
