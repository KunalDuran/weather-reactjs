import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css'

import { AuthProvider } from '@/config/Auth'

export default function App({ Component, pageProps }) {
  return (
  <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
  )
}
