import { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, Text, Alert, TextInput, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from "expo-camera";
import { WebView } from 'react-native-webview';

import useNewAccessToken from '../hooks/useNewAccesToken';
import useCreateAccount from '../hooks/useCreateAccount'
import useProofUser from '../hooks/useProofUser'
import useProofTransactionTempId from '../hooks/useProofTransactionTempId'
import useCreateBiometricByProof from '../hooks/useCreateBiometricByProof'

function RegisterScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [authScreen, setaAuthScreen] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [url, setUrl] = useState('');
  const [accountNumber, setAccountNumber] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [operationId, setOperationId] = useState('')

  const { NewAccessToken } = useNewAccessToken();
  const { CreateAccount } = useCreateAccount();
  const { ProofUser } = useProofUser();
  const { ProofTransactionTempId } = useProofTransactionTempId();
  const { CreateBiometric } = useCreateBiometricByProof();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleRegister = async () => {
    if (hasPermission) {
      try {
        const accessToken = await NewAccessToken();
        const account = await CreateAccount(accessToken.AccessToken, email, phone)
        const proof = await ProofUser(accessToken.AccessToken, account.AccountNumber)
        const operationId = proof.OperationId
        const operationOneTimeSecret = proof.OneTimeSecret
        const operationUrl = `https://id.authid.ai/?i=${operationId}&s=${operationOneTimeSecret}`
        setUrl(operationUrl)
        setaAuthScreen(true)
        setAccountNumber(account.AccountNumber);
        setAccessToken(accessToken.AccessToken);
        setOperationId(operationId);
      } catch (error) {
        console.log('error create token', error.response.data)
      }
    }
  }

  const handleCreateUserCredentials = async () => {
    try {
      const proofTransactionTempId = await ProofTransactionTempId(accessToken, operationId)
      const updatedTempId = proofTransactionTempId.TempId;
      const createBiometric = await CreateBiometric(accessToken, accountNumber, updatedTempId);
      if (createBiometric.success) {
        alert('Register Succcess')
        navigation.navigate('Home')
      }
    } catch (error) {
      console.log(error)
    }
  }


  const handleWebViewMessage = (event) => {
    const eventData = JSON.parse(event.nativeEvent.data);
    console.log("Evento from WebView:", eventData);
    if (eventData.success) {
      handleCreateUserCredentials()
    }
  };


  return (
    <View style={{ flex: 1 }}>
      {authScreen ? (
        <View style={{ flex: 1 }}>
          <WebView
            style={styles.container}
            source={{ uri: url }}
            onMessage={handleWebViewMessage}
          />
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20 }} >
          <View>
            <Text style={{ fontSize: 17, fontWeight: '400' }}>E-mail</Text>
            <TextInput onChangeText={(text) => setEmail(text)} style={styles.input} placeholder='email' />
          </View>
          <View>
            <Text style={{ fontSize: 17, fontWeight: '400' }}>Phone</Text>
            <TextInput onChangeText={(text) => setPhone(text)} style={styles.input} placeholder='123456' />
          </View>
          <Pressable
            style={styles.button}
              onPress={handleRegister}>
            <Text style={styles.text}>Create</Text>
          </Pressable>
        </View >
      )
      }
    </View>

  );
}
const styles = StyleSheet.create({
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

export default RegisterScreen;