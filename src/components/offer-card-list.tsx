import { FC, useCallback, useEffect, useState } from 'react';
import { Offer } from '../types/offer';
import { OfferCard } from './offer-card';
import { Point } from '../types/point';
import classNames from 'classnames';
import { getOfferCardClassName } from '../utils/offer-card-classname';
import { useAppDispatch, useAppSelector } from '../store/helpers';
import { selectAuthStatus, selectCurrentCity, selectCurrentSortMethod } from '../store/selectors';
import { updateCity, updateOfferFavoriteStatusAsync, updateSingleOfferFavorite } from '../store/action';
import { SortMethod } from '../types/sort-method';
import { SortFormView } from './sort-form';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../types/app-route';
import { AuthStatus } from '../types/auth-status';

type OfferCardListProps = {
    offers: Offer[];
    setActivePoint: (point?: Point) => void;
    points: Point[];
    prefix?: string;
}

export const OfferCardList: FC<OfferCardListProps> = ({ offers, setActivePoint, points, prefix = 'cities' }) => {
  const dispatch = useAppDispatch();

  const activeCity = useAppSelector(selectCurrentCity);

  const selectedSortMethod = useAppSelector(selectCurrentSortMethod);

  const authStatus = useAppSelector(selectAuthStatus);

  const navigate = useNavigate();

  const [sortedOffers, setSortedOffers] = useState(offers);

  useEffect(() => {
    if (selectedSortMethod) {
      setSortedOffers(offers.slice().sort((a, b) => {
        if (selectedSortMethod === SortMethod.POPULAR) {
          return 0;
        }
        if (selectedSortMethod === SortMethod.PRICE_LOW_TO_HIGH) {
          return a.price - b.price;
        }
        if (selectedSortMethod === SortMethod.PRICE_HIGH_TO_LOW) {
          return b.price - a.price;
        }
        if (selectedSortMethod === SortMethod.TOP_RATED) {
          return b.rating - a.rating;
        }
        return 0;
      }));
    }
  }, [offers, selectedSortMethod]);

  const handleCardFocus = (id: string) => {
    const point = points.find((p) => p.id === id);
    const city = offers.find((offer) => offer.id === id)?.city;
    if (city) {
      dispatch(updateCity(city));
    }
    if (point) {
      setActivePoint(point);
    }
  };

  const handleCardUnfocus = () => {
    setActivePoint(undefined);
  };

  const handleFavoriteClick = useCallback((id: string, status: boolean) => {
    if (authStatus !== AuthStatus.LOGGED_IN) {
      navigate(AppRoute.Login);
      return;
    }
    dispatch(updateOfferFavoriteStatusAsync({id, status})).then((result) => {
      dispatch(updateSingleOfferFavorite({id, status: result.payload as boolean}));
    });
  }, [dispatch, authStatus, navigate]);

  return (
    <section className={classNames(getOfferCardClassName(prefix, 'places'), 'places')}>
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {offers?.length ?? 0} places to stay in {activeCity.name}
      </b>
      <SortFormView />
      <div
        className={classNames(getOfferCardClassName(prefix, 'places-list'), 'places__list tabs__content')}
      >
        {sortedOffers.map((card) => (
          <OfferCard
            prefix="cities"
            key={`card-${card.id}`}
            onMouseEnter={() => handleCardFocus(card.id)}
            onMouseLeave={() => handleCardUnfocus()}
            offer={card}
            onFavoriteClick={handleFavoriteClick}
          />
        ))}
      </div>
    </section>
  );
};
