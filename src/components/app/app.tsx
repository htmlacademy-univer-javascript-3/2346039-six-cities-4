import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../constants/constants';
import { Offer } from '../../types/offer';

import MainScreen from '../pages/main-screen/main-screen';
import FavoritesScreen from '../pages/favorites/favorites-screen';
import LoginScreen from '../pages/login-screen/login-screen';
import OfferScreen from '../pages/offer/offer-screen';
import NotFoundScreen from '../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';

type AppScreenProps = {
  cardsNumber: number;
  offers: Offer[];
};

function App({cardsNumber, offers,}: AppScreenProps){
  const favorites = offers.filter((o) => o.isFavorite);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen cardsNumber={cardsNumber} offers={offers}/>}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.Auth}
            >
              <FavoritesScreen favorites={favorites}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferScreen/>}
        />
        <Route
          path="*"
          element={<NotFoundScreen/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
