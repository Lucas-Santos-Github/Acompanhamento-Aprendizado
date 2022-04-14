import { StyleSheet, Text, View } from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';

export default function ExpBar() {
  const exp = 10;
  const width = 400
  return (
    <>
      <View style={{flexDirection: 'row', justifyContent:'space-between', width: width}}>
        <Text>Level 1</Text>
        <Text>1000/2000</Text>
      </View>
      <ProgressBar style={{width: width}} progress={1000/2000} color={Colors.indigoA100} />
    </>
  );
}

const styles = StyleSheet.create({
});