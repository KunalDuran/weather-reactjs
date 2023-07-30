import { toast } from 'react-toastify';

const API_URL = 'https://api.duranz.in';


async function handleFetch(url, options = {}) {
  let token;

  try {
    token = localStorage.getItem('token');
  } catch (error) {
    console.error('Failed to access localStorage: ', error);
    throw error;
  }

  // Set the Authorization header with the token if available
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `${token}` }),
    ...options.headers
  };

  // Merge the provided options with the headers
  const requestOptions = {
    ...options,
    headers,
  };

  try {

    const response = await fetch(url, requestOptions);
    if (response.status === 401) {
      toast("Please login first", { type: "error" });
      return;
    }

    if (!response.ok) {
      let errorMessage;

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.indexOf("application/json") !== -1) {
        errorMessage = (await response.json()).message;
      } else {
        errorMessage = await response.text();
      }

      throw new Error(`Request failed with status ${response.status}: ${errorMessage}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch request failed: ', error);
    throw error;
  }
}

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


export default { handleFetch, API_URL, extractWeatherData };