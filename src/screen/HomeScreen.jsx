import { View, StyleSheet, Pressable, Text, Alert } from 'react-native';

function HomeScreen({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20 }}>
      <Pressable 
        style={styles.button}
        onPress={() => navigation.navigate('Verify')}>
        <Text style={styles.text}>Verify</Text>
      </Pressable>
      <Pressable 
        style={styles.button} 
        onPress={() => navigation.navigate('Register')}>
        <Text style={styles.text}>Register</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default HomeScreen;