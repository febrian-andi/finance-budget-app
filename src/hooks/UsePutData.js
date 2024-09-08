import axios from 'axios';
import { useState } from 'react';

const usePutData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const putData = async (url, requestData) => {
    try {
      setLoading(true);
      const response = await axios.put(url, requestData);
      return response.data;
    } catch(err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { putData, loading, error };
};

export default usePutData;
