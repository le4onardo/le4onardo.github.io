import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root')!);

root.render(
  // NOTE: strict mode mounts components twice in dev, but not in prod
  <StrictMode>
    <App />
  </StrictMode>
);
