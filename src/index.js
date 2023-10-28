import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {RecipeProvider} from  './Context.js'
import App from './App';

const root = createRoot(document.getElementById('app'));

root.render(
  <StrictMode>
    <RecipeProvider>
    <App />
    </RecipeProvider>
  </StrictMode>
);
