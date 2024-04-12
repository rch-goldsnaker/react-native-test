
import { BlurView } from 'expo-blur'
import { Button, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { FIREBASE_AUTH } from '../../firebase-config'
import { ActivityIndicator } from 'react-native';

import { User } from 'firebase/auth'

const backPicture = 'https://picsum.photos/2400/1080'
const profilePicture = 'https://picsum.photos/100/100'

function LoginScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');

  const auth = FIREBASE_AUTH;

  const handleCreateAccount = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert('Sign Up Success')
    } catch (error) {
      console.log(error)
      alert('Sign Up failed' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert('Sign in Success')
    } catch (error) {
      console.log(error)
      alert('Sign in failed' + error.message)
    } finally {
      setLoading(false)
    }
  }


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
            <KeyboardAvoidingView behavior='padding'>
              <View>
                <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>E-mail</Text>
                <TextInput onChangeText={(text) => setEmail(text)} style={styles.input} placeholder='user@mail.com' />
              </View>
              <View>
                <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Password</Text>
                <TextInput onChangeText={(text) => setPassword(text)} style={styles.input} placeholder='password' secureTextEntry={true} />
              </View>
              {loading ? (
                <ActivityIndicator size="large" color="#000ff" />
              ) : (
                <>
                  <TouchableOpacity onPress={handleSignIn} style={styles.button}>
                    <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Login</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleCreateAccount} style={styles.button}>
                    <Text style={{ fontSize: 17, fontWeight: '400', color: '#130c0c' }}>Create Account</Text>
                  </TouchableOpacity>
                </>
              )}
            </KeyboardAvoidingView>
          </View>
        </BlurView>
      </ScrollView>
    </View>
  )
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
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 1,
    marginVertical: 30
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff90',
    marginBottom: 20,
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#00CFEB90',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderColor: '#fff',
    borderWidth: 1,
  }
})

export default LoginScreen;