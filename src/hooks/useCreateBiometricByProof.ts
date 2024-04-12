import { useState } from 'react';
import axios from 'axios';

const useCreateBiometricByProof = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const ADMIN_URL = 'https://id.authid.ai/IDCompleteBackendEngine/Default/AdministrationServiceRest';
  
  const CreateBiometric = async (accessToken: string,accountNumber:string,currentTempId:any) => {
    setLoading(true);
    setError('');

    const tempData = {
      "TempId": currentTempId
    }

    try {
      const response = await axios.post(`${ADMIN_URL}/accounts/${accountNumber}/proofedBioCredential`, tempData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      setLoading(false);

      if (response.status === 200) {
        return { success: true, data: response.data };
      } else {
        return { success: false, data: null };
      }
    } catch (error) {
      setError('Error creating biometric');
      setLoading(false);
      throw error;
    }
  };

  return { loading, error, CreateBiometric };
};

export default useCreateBiometricByProof;
