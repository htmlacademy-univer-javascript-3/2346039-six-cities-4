import { FC } from 'react';
import { Offer } from '../../../types/offer';
import { Link } from 'react-router-dom';
import { FavoritesCard } from './favorites-card';

type FavoritesCardListProps = {
    offers: Offer[];
}

export const FavoritesCardList: FC<FavoritesCardListProps> = ({ offers}) => (
  <div className="favorites__places">
    {
      offers.map((offer) => (
        <Link key={`card-${offer.id}`} to={`/offer/${offer.id}`}>
          <FavoritesCard offer={offer} />
        </Link>
      ))
    }
  </div>
);
