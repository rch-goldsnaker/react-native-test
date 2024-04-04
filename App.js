import { BlurView } from 'expo-blur'
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebase-config'

const backPicture = 'https://picsum.photos/2400/1080'
const profilePicture = 'https://picsum.photos/100/100'

function HomeScreen(){
  return(
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <Text>Home Screen</Text>
    </View>
  )
}

function LoginScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: backPicture }}
        style={[styles.image, StyleSheet.absoluteFill]}
      />
      <ScrollView contentContainerStyle={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <BlurView intensity={50} tint="dark">
          <View style={styles.login}>
            <Image
              source={{ uri: profilePicture }}
              style={styles.profilePicture}
            />
            <View>
              <Text style={{fontSize:17,fontWeight:'400',color:'white'}}>E-mail</Text>
              <TextInput style={styles.input} placeholder='user@mail.com' />
            </View>
            <View>
              <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Password</Text>
              <TextInput style={styles.input} placeholder='password' secureTextEntry={true}/>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={{fontSize:17,fontWeight:'400',color:'white'}}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  login: {
    width: 350,
    height: 500,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center'
  },
  profilePicture:{
    width: 100,
    height:100,
    borderRadius:50,
    borderColor:'#fff',
    borderWidth:1,
    marginVertical:30
  },
  input:{
    width:250,
    height:40,
    borderColor:'#fff',
    borderWidth:2,
    borderRadius:10,
    padding:10,
    marginVertical:10,
    backgroundColor:'#ffffff90',
    marginBottom:20,
  },
  button:{
    width:250,
    height:40,
    borderRadius:10,
    backgroundColor:'#00CFEB90',
    alignItems:'center',
    justifyContent:'center',
    marginVertical:10,
    borderColor:'#fff',
    borderWidth:1,
  }
})