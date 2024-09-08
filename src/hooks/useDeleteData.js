import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const useDeleteData = (url) => {
  const [error, setError] = useState(null);

  const deleteData = async (id, onSuccess) => {
    setError(null);

    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });

      if (result.isConfirmed) {
        await axios.delete(`${url}/${id}`);
        if (onSuccess) onSuccess();
        Swal.fire('Deleted!', 'The item has been deleted.', 'success');
      }
    } catch (err) {
      setError(err);
      Swal.fire('Error!', 'There was an error deleting the item.', 'error');
    }
  };

  return { deleteData, error };
};

export default useDeleteData;