import { useState } from 'react';
import axios from 'axios';

const useVerifyWithBasicApproval = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const TRANSACTION_URL = 'https://id.authid.ai/IDCompleteBackendEngine/Default/AuthorizationServiceRest';

  const VerifyBasic = async (accessToken: string, accountNumber: string) => {
    setLoading(true);
    setError('');

    const verifyData = {
      "AccountNumber": accountNumber,
      "Timeout": 3600,
      "ConfirmationPolicy": {
        "TransportType": 0,
        "CredentialType": 0
      },
      "Name": "Verify_Identity"
    }

    try {
      const { data } = await axios.post(`${TRANSACTION_URL}/v2/transactions`, verifyData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      setLoading(false);
      return data;
    } catch (error) {
      setError('Error verify with biometrics');
      setLoading(false);
      throw error;
    }
  };

  return { loading, error, VerifyBasic };
};

export default useVerifyWithBasicApproval;
