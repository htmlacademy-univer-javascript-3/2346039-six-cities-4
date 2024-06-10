import { FC } from 'react';
import { Offer } from '../../types/offer';
import { HeaderView } from '../../components/header';
import { User } from '../../types/user';
import { FavoritesCardList } from './components/favorites-card-list';

type FavoritesPageProps = {
    offers: Offer[];
    user: User;
    favorites: string[];
}

export const FavoritesPage: FC<FavoritesPageProps> = ({ offers, user, favorites }) => {
  const favoriteOffers = offers.filter((it) => favorites.indexOf(it.id) !== -1);

  return (
    <div className="page">
      <HeaderView user={user} favoriteCount={favoriteOffers.length} />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <FavoritesCardList offers={favoriteOffers} />
              </li>

              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Cologne</span>
                    </a>
                  </div>
                </div>
                <FavoritesCardList offers={favoriteOffers} />
              </li>
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
};
