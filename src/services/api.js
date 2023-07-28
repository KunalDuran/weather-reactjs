import util from "./util";
import { toast } from "react-toastify";


const fetchWeatherHistory = async () => {
  const url = `${util.API_URL}/api/history`;

  try {
    const data = await util.handleFetch(url);
    // Check if data is undefined
    if (!data) {
      console.warn("No weather data retrieved");
      return;
    }

    return data;
  } catch (error) {
    console.error('Error occurred:', error.message);
    toast(error.message, { type: "error" });
  }
};


const fetchWeatherData = async (cityName) => {
  const url = `${util.API_URL}/api/weather?city=${cityName}`;

  try {
    const data = await util.handleFetch(url, {});
    if (!data) return null;
    if (data.status !== "success") {
      toast(data.message, { type: "error" });
      return null;
    }
    return util.extractWeatherData(data.data);
  } catch (error) {
    console.error('Error occurred:', error.message);
    return null;
  }
};



const deleteWeatherHistoryByID = async (weatherID) => {
  const url = `${util.API_URL}/api/history/delete?weatherID=${weatherID}`;

  try {
    const data = await util.handleFetch(url, {});
    return data;

  } catch (error) {
    console.error('Error occurred:', error.message);
  }
};


const bulkDeleteWeatherHistory = async (weatherIDs) => {
  const url = `${util.API_URL}/api/history/bulkdelete`;

  try {
    const data = await util.handleFetch(url, {
      method: "POST",
      body: JSON.stringify({ weatherIDs }),
    });
    return data;

  } catch (error) {
    console.error('Error occurred:', error.message);
  }
};

export default {fetchWeatherData, fetchWeatherHistory, deleteWeatherHistoryByID, bulkDeleteWeatherHistory} ;

