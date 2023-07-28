import React from 'react'
import api from '@/services/api.js';
import { toast } from 'react-toastify';

export default function DeleteBulk() {
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
    }, [rows])
  return (
    <div>
        <h1>DeleteBulk</h1>
    </div>
  )
}
