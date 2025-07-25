import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../node_modules/modern-normalize/modern-normalize.css';

import App from './App.tsx';
import './global.css.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
