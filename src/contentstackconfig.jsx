// contentstackConfig.js
import { Stack } from 'contentstack';

const stack = Stack({
  api_key: import.meta.env.VITE_API_KEY,
  delivery_token: import.meta.env.VITE_DELIV_TOKEN,
  environment: import.meta.env.VITE_ENV,
  region: import.meta.env.VITE_REGION
});

export default stack;
