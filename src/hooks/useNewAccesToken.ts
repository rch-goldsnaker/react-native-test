import { useState } from 'react';
import axios from 'axios';
import { encode } from 'base-64';

const useNewAccessToken = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const IDP_URL = 'https://id.authid.ai/IDCompleteBackendEngine/IdentityService/v1';
  const external_id = '5d7888e6-f20d-48af-bf08-84b0719dccd4';
  const api_key_value = 'aL7qxX1jKdmcNVG7BE84gKPmgi536g6S';
  const authHeaderValue = `Basic ${encode(`${external_id}:${api_key_value}`)}`;

  const NewAccessToken = async () => {
    setLoading(true);
    setError('');

    try {
      const { data } = await axios.post(`${IDP_URL}/auth/token`, {}, {
        headers: {
          'Authorization': authHeaderValue,
          'Accept': '*/*',
        },
      });
      setLoading(false);
      return data; // Return the access token directly
    } catch (error) {
      setError('Error obtaining access token');
      setLoading(false);
      throw error; // Re-throw the error for handling in the component
    }
  };

  return { loading, error, NewAccessToken };
};

export default useNewAccessToken;
