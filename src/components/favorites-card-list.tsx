import { FC, useCallback } from 'react';
import { Offer } from '../types/offer';
import { OfferCard } from './offer-card';
import { updateOfferFavoriteStatus, updateSingleOfferFavorite } from '../store/action';
import { useAppDispatch } from '../store/helpers';

type FavoritesCardListProps = {
    offers: Offer[];
}

export const FavoritesCardList: FC<FavoritesCardListProps> = ({ offers }) => {
  const places = offers
    .map((offer) => offer.city.name)
    .filter((value, index, self) => self.indexOf(value) === index);

  const dispatch = useAppDispatch();

  const handleFavoriteClick = useCallback((id: string, status: boolean) => {
    dispatch(updateOfferFavoriteStatus({id, status})).then((result) => {
      dispatch(updateSingleOfferFavorite({id, status: result.payload as boolean}));
    });
  }, [dispatch]);

  return (
    <div className="favorites__list">
      {places.map((place) => {
        const filteredOffers = offers.filter(
          (offer) => offer.city.name === place
        );
        return (
          <li className="favorites__locations-items" key={place}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{place}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              {filteredOffers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} prefix={'favorites'} onFavoriteClick={handleFavoriteClick} />
              ))}
            </div>
          </li>
        );
      })}
    </div>
  );
};
