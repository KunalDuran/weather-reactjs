import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.min.css';
import { useEffect } from 'react';

import { AuthProvider } from '@/config/Auth'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
  <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
  )
}
