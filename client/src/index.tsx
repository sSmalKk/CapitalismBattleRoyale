import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/tailwind.css";
import "./styles/index.css";
import "./styles/font.css";
import App from './App';
import { SocketProvider } from "./context/SocketProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SocketProvider>

    <App />

  </SocketProvider>
);
