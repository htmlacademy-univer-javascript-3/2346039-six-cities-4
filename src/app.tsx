import { FC } from 'react';
import { MainPage } from './pages/main/main-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/auth/login-page';
import { OfferPage } from './pages/offers/offer-page';
import { PrivateRoute } from './components/private-route';
import { FavoritesPage } from './pages/favorites/favorites-page';
import { AppRoute } from './types/app-route';
import { NotFoundPage } from './pages/service/not-found-page';
import { MainLayout } from './layouts/main-layout';
import { useAppDispatch } from './store/helpers';
import { fetchAuth, fetchFavorites, fetchOffersAsync } from './store/action';


export const App: FC = () => {
  const dispatch = useAppDispatch();

  [
    fetchOffersAsync(),
    fetchAuth(),
    fetchFavorites()
  ].forEach(dispatch);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Index} element={
          <MainLayout color="gray" user={undefined} favoriteCount={0}>
            <MainPage />
          </MainLayout>
        }
        />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Offer} element={
          <MainLayout user={undefined} favoriteCount={0}>
            <OfferPage />
          </MainLayout>
        }
        />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute user={null}>
            <MainLayout user={undefined} favoriteCount={0} >
              <FavoritesPage />
            </MainLayout>
          </PrivateRoute>
        }
        />
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </BrowserRouter>
  );
};
