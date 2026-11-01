import axios from 'axios';

const isLoopbackHost = (hostname) => ['localhost', '127.0.0.1', '::1', '[::1]'].includes(hostname);
const configuredApiUrl = import.meta.env.VITE_API_URL
  || (import.meta.env.DEV ? `http://${window.location.hostname}:5000/api` : '/api');
const apiUrl = new URL(configuredApiUrl, window.location.origin);

if (
  import.meta.env.DEV &&
  isLoopbackHost(apiUrl.hostname) &&
  !isLoopbackHost(window.location.hostname)
) {
  apiUrl.hostname = window.location.hostname;
}

const api = axios.create({
  baseURL: apiUrl.toString(),
  timeout: 10000
});

export default api;
