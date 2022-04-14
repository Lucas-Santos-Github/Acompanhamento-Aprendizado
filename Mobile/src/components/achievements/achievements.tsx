import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function Achievements() {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {key: 'Devin', icon: 'trophy'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]}
        renderItem={({item}) => <View style={{flexDirection: 'row'}}>
         
    <Text> {item.key}</Text>
          </View>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 5
  },
});