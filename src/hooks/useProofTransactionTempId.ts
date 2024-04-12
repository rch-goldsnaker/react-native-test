import { useState } from 'react';
import axios from 'axios';

const useProofTransactionTempId = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const ADMIN_URL = 'https://id.authid.ai/IDCompleteBackendEngine/Default/AdministrationServiceRest';

  const ProofTransactionTempId = async (accessToken: string, proofOperationId: string) => {
    setLoading(true);
    setError('');

    try {

      const { data } = await axios.get(`${ADMIN_URL}/foreignOperations/documents/${proofOperationId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      setLoading(false);
      return data;
    } catch (error) {
      setError('Error proof transaction tempId');
      setLoading(false);
      throw error;
    }
  };

  return { loading, error, ProofTransactionTempId };
};

export default useProofTransactionTempId;
