import { useState } from 'react';
import axios from 'axios';

const useDocumentDetails = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const TRANSACTION_URL = 'https://id.authid.ai/IDCompleteBackendEngine/Default/AuthorizationServiceRest';

  const DocumentDetails = async (accessToken: string, proofOperationId: string) => {
    setLoading(true);
    setError('');

    try {

      const { data } = await axios.get(`${TRANSACTION_URL}/v2/operations/${proofOperationId}/result`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      setLoading(false);
      return data;
    } catch (error) {
      setError('Error document details');
      setLoading(false);
      throw error;
    }
  };

  return { loading, error, DocumentDetails };
};

export default useDocumentDetails;
