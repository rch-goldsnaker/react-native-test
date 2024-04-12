import { useState } from 'react';
import axios from 'axios';

const useProofUser = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const TRANSACTION_URL = 'https://id.authid.ai/IDCompleteBackendEngine/Default/AuthorizationServiceRest';
  const proofData = {
    "AccountNumber": " ",
    "Payload": {
      "DocumentTypes": [
        "2"
      ]
    },
    "Codeword": "",
    "Name": "GetForeignIDDocument",
    "Timeout": 3600,
    "TransportType": 0,
    "Tag": ""
  }

  const ProofUser = async (accessToken: string,accountNumber:string) => {
    setLoading(true);
    setError('');

    try {

      proofData.AccountNumber = accountNumber

      const { data } = await axios.post(`${TRANSACTION_URL}/v2/operations`, proofData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      setLoading(false);
      return data;
    } catch (error) {
      setError('Error proof user service');
      setLoading(false);
      throw error;
    }
  };

  return { loading, error, ProofUser };
};

export default useProofUser;
