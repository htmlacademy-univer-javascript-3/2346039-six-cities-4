import { FC } from 'react';
import { Offer } from '../../types/offer';
import { User } from '../../types/user';
import { FavoritesCardList } from '../../components/favorites-card-list';
import { AppRoute } from '../../types/app-route';
import { Link } from 'react-router-dom';

type FavoritesPageProps = {
    offers: Offer[];
    user: User;
    favorites: string[];
}

export const FavoritesPage: FC<FavoritesPageProps> = ({ offers, user, favorites }) => {
  const favoriteOffers = offers.filter((it) => favorites.indexOf(it.id) !== -1);

  return (
    <div className="page">
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesCardList offers={favoriteOffers} />
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Index}>
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </Link>
      </footer>
    </div>
  );
};
