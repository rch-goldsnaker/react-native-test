import { useState } from 'react';
import axios from 'axios';

const useProofTransactionStatus = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const TRANSACTION_URL = 'https://id.authid.ai/IDCompleteBackendEngine/Default/AuthorizationServiceRest';

  const ProofTransactionStatus = async (accessToken: string, proofOperationId: string) => {
    setLoading(true);
    setError('');

    try {

      const { data } = await axios.get(`${TRANSACTION_URL}/v2/operations/${proofOperationId}/status`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      setLoading(false);
      return data;
    } catch (error) {
      setError('Error proof transaction status');
      setLoading(false);
      throw error;
    }
  };

  return { loading, error, ProofTransactionStatus };
};

export default useProofTransactionStatus;
