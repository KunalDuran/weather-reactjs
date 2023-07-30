import Head from 'next/head';
import util from '@/services/util.js';
import api from '@/services/api.js';
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
import DeleteBulk from '@/components/DeleteBulk';
import Navbar from '@/components/Navbar';



export default function Home() {
  const [recentSearches, setrecentSearches] = useState([]);
  const [weatherHistory, setWeatherHistory] = useState([]);


  const handleChange = useCallback(async (value) => {
    if (!value) return;
    if (!recentSearches.includes(value)) {
      setrecentSearches([value, ...recentSearches]);
    }
    const weatherData = await api.fetchWeatherData(value);
    if (weatherData) {
      setWeatherHistory(prevHistory => [weatherData, ...prevHistory]);
    }
  }, [recentSearches, weatherHistory]);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.fetchWeatherHistory();
        if (data.status !== "success") {
          toast(data.message, { type: "error" });
          return;
        }

        const weatherHistoryData = data.data.map((item) => {
          return util.extractWeatherData(item);
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
      <Navbar />
      <div className="container">
        <ToastContainer />
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Autocomplete
              id="autocomplete"
              freeSolo
              autoComplete
              options={recentSearches}
              renderInput={(params) => (
                <TextField {...params} label="Search" />
              )}
              onChange={(e, value) => handleChange(value)}
            />
          </Grid>
          <Grid item xs={12} sx={{marginBottom : 4}}>
            <Card>
              <CardHeader title='Search History' titleTypographyProps={{ variant: 'h6' }} sx={{ backgroundColor: '#c3cccd' }} 
              action={
                <DeleteBulk  setWeatherHistory={setWeatherHistory} />
              } />
              <History  rows={weatherHistory} setWeatherHistory={setWeatherHistory} />
            </Card>
          </Grid>
        </Grid>
      </div >
    </>
  )
}
