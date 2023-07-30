import React from 'react'
import api from '@/services/api.js';
import { toast } from 'react-toastify';
import { useCallback } from 'react';

export default function DeleteBulk({setWeatherHistory}) {
    const handleDelete = useCallback((event, activeOption) => {
        event.preventDefault()
        api.bulkDeleteWeatherHistory(activeOption).then((data) => {
            if (data.status !== "success") {
                toast(data.message, { type: "error" });
                return;
            }
            toast("Row deleted successfully", { type: "error" });
            setWeatherHistory([])
        }).catch((error) => {
            toast("Error deleting history", { type: "error" });
            console.error('Error occurred:', error.message);
        });
    }, [])

  return (
    <div>
        <button className='btn btn-secondary' onClick={handleDelete}>Clear Search History</button>
    </div>
  )
}
