import { FC } from 'react';
import { MainPage } from './pages/main/main-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/auth/login-page';
import { OfferPage } from './pages/offers/offer-page';
import { PrivateRoute } from './components/private-route';
import { FavoritesPage } from './pages/favorites/favorites-page';
import { AppRoute } from './types/app-route';
import { NotFoundPage } from './pages/service/not-found-page';
import { Offer } from './types/offer';
import { OfferDetail } from './types/offer-detail';
import { Review } from './types/review';
import { User } from './types/user';
import { MainLayout } from './layouts/main-layout';

type AppProps = {
    offers: Offer[];
    offersDetail: OfferDetail[];
    reviewsMap: Map<string, Review[]>;
    user: User;
    favorites: string[];
}

export const App: FC<AppProps> = ({ offers, offersDetail, reviewsMap, user, favorites }) => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoute.Index} element={
        <MainLayout color="gray" user={user} favoriteCount={favorites.length}>
          <MainPage offers={offers} />
        </MainLayout>
      } />
      <Route path={AppRoute.Login} element={<LoginPage />} />
      <Route path={AppRoute.Offer} element={
        <MainLayout user={user} favoriteCount={favorites.length}>
          <OfferPage offerDetails={offersDetail} reviewsMap={reviewsMap} />
        </MainLayout>
      } />
      <Route path={AppRoute.Favorites} element={
        <PrivateRoute user={user}>
          <MainLayout user={user} favoriteCount={favorites.length} >
            <FavoritesPage offers={offers} user={user} favorites={favorites} />
          </MainLayout>
        </PrivateRoute>
      }
      />
      <Route path="*" element={<NotFoundPage />}/>
    </Routes>
  </BrowserRouter>
);

