import { offers } from './mocks/offers';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const Setting = {
  cardsNumber: 300
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App cardsNumber={Setting.cardsNumber} offers = {offers}/>
  </React.StrictMode>
);


export default Setting;
