import React from 'react';
import { RouterProvider } from '@tanstack/react-router';
import { createRoot } from 'react-dom/client';
import App from './renderer/App.js';
import router from './renderer/router/index.js';
import './index.css';

const root = createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);