import Head from 'next/head';
import util from '@/config/util.js';
import { useEffect, useState, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Grid,
  TextField,
  Autocomplete,
  Card,
  CardHeader
} from "@mui/material";
import History from '@/components/History';
import Navbar from '@/components/Navbar';

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

function extractWeatherData(jsonData) {
  const {
    weather_id,
    name,
    sys: { country },
    main: { temp: temperature, humidity },
    wind: { speed: windSpeed },
  } = jsonData;

  return { name, country, temperature: parseFloat(temperature) - 273.15, wind: windSpeed, humidity, id: weather_id };
}

export default function Home() {
  const [recentSearches, setrecentSearches] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [weatherHistory, setWeatherHistory] = useState([]);

  const handleChange = useCallback((value) => {
    if (!value) return;
    setrecentSearches([value, ...recentSearches]);
    fetchWeatherData(value);
  }, [recentSearches]);

  const fetchWeatherData = useCallback(async (cityName) => {
    const url = `${util.API_URL}/api/weather?city=${cityName}`;

    try {
      const data = await util.handleFetch(url, {});
      if (!data) return;
      if (data.status !== "success") {
        toast(data.message, { type: "error" });
        return;
      }
      setWeatherData(data.data);
     setWeatherHistory(prevHistory => [extractWeatherData(data.data), ...prevHistory]);
    } catch (error) {
      console.error('Error occurred:', error.message);
    }
  }, [weatherHistory]);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchWeatherHistory();

        if (data.status !== "success") {
          toast(data.message, { type: "error" });
          return;
        }

        const weatherHistoryData = data.data.map((item) => {
          return extractWeatherData(item);
        });

        setWeatherHistory(weatherHistoryData);
      } catch (error) {
        console.error("Error fetching weather history: ", error);
      }
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Weather app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Navbar />
      </div>
      <div className="container">
        <ToastContainer />
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Autocomplete
              id="autocomplete"
              freeSolo
              autoComplete
              autoHighlight
              options={recentSearches}
              renderInput={(params) => (
                <TextField {...params} label="Search" />
              )}
              onChange={(e, value) => handleChange(value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title='Search History' titleTypographyProps={{ variant: 'h6' }} sx={{ backgroundColor: '#c3cccd' }} />
              <History weatherData={weatherData} rows={weatherHistory} setWeatherHistory={setWeatherHistory} />
            </Card>
          </Grid>
        </Grid>
      </div >
    </>
  )
}
