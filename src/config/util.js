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

  

  const API_URL = 'https://api.duranz.in';

  export default {handleFetch, API_URL};