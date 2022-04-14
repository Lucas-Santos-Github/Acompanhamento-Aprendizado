import { StyleSheet, Text, View } from 'react-native';

export default function UserInfo() {
  return (
    <View style={styles.container}>
      <Text>Nome do Usuário: Jobisclaison</Text>
      <Text>Título: O Luva de Pedreiro, o imparável</Text>
      <Text>Idade: 50</Text>
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