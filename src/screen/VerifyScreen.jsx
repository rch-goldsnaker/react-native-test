import { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, Text, Alert, TextInput } from 'react-native';
import { Camera, CameraType } from "expo-camera";
import { WebView } from 'react-native-webview';

import useNewAccessToken from '../hooks/useNewAccesToken';
import useVerifyWithBiometrics from '../hooks/useVerifyWithBiometrics';

function VerifyScreen({ navigation }) {

  const { NewAccessToken } = useNewAccessToken();
  const { VerifyBiometrics } = useVerifyWithBiometrics();
  const [account, setAccount] = useState('');
  const [url, setUrl] = useState('');
  const [authScreen, setaAuthScreen] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);

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
        const verify = await VerifyBiometrics(accessToken.AccessToken, account);
        const transactionId = verify.TransactionId
        const operationOneTimeSecret = verify.OneTimeSecret
        const operationUrl = `https://id.authid.ai/?t=${transactionId}&s=${operationOneTimeSecret}`
        setUrl(operationUrl)
        setaAuthScreen(true)
      } catch (error) {
        const message = error.response.data.Message
        alert(message)
      }
    }
  }

  const handleWebViewMessage = (event) => {
    const eventData = JSON.parse(event.nativeEvent.data);
    console.log("Evento from WebView:", eventData);
    if (eventData.success) {
      alert('Verify Succcess')
      navigation.navigate('Home')
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
            <Text style={{ fontSize: 17, fontWeight: '400' }}>Account Number</Text>
            <TextInput onChangeText={(text) => setAccount(text)} style={styles.input} placeholder='account number' />
          </View>
          <Pressable
            style={styles.button}
            onPress={handleRegister}>
            <Text style={styles.text}>Send</Text>
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

export default VerifyScreen;