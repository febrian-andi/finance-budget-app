import { useState } from 'react';
import axios from 'axios';

const usePostData = () => {
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const postData = async (url, requestData, onSuccess) => {
    setError(null);
    setIsSuccess(false);

    try {
      const response = await axios.post(url, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      setIsSuccess(true);
      if (onSuccess) {
          onSuccess(response.data);
      }
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
    }
  };

  return { postData, error, isSuccess };
};

export default usePostData;