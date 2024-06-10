import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import { MOCK_OFFERS } from './mock/offers';
import { MOCK_OFFERS_DETAIL } from './mock/offers-detail';
import { MOCK_REVIEWS } from './mock/reviews';
import { MOCK_FAVORITES, MOCK_USER } from './mock/users';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={ MOCK_OFFERS } offersDetail = { MOCK_OFFERS_DETAIL } reviewsMap = { MOCK_REVIEWS } user = { MOCK_USER } favorites={ MOCK_FAVORITES }/>
  </React.StrictMode>
);
