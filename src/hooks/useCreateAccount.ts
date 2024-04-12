import { useState } from 'react';
import axios from 'axios';
import uuid from 'react-native-uuid';

const useCreateAccount = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const ADMIN_URL = 'https://id.authid.ai/IDCompleteBackendEngine/Default/AdministrationServiceRest';

  const CreateAccount = async (accessToken: string, email?: string, phone?: string) => {
    setLoading(true);
    setError('');

    const accountData = {
      "AccountNumber": 'test-' + uuid.v4(),
      "Version": 0,
      "DisplayName": 'firts Name',
      "CustomDisplayName": "Account Display Name",
      "Description": "Account Display Name",
      "Rules": 1,
      "Enabled": true,
      "Custom": true,
      "DisableReason": "",
      "Email": email ? email : '',
      "PhoneNumber": phone ? phone : '',
      "EmailVerified": false,
      "PhoneNumberVerified": false
    }

    try {
      const { data } = await axios.post(`${ADMIN_URL}/v1/accounts`, accountData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      setLoading(false);
      return data;
    } catch (error) {
      setError('Error creating account');
      setLoading(false);
      throw error;
    }
  };

  return { loading, error, CreateAccount };
};

export default useCreateAccount;
