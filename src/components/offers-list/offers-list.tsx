import { Offer } from '../../types/offer';
import OfferCard from '../card/card';

type OffersListProps = {
  offers: Offer[];
};

function OffersList({offers}: OffersListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer}/>
      ))}
    </div>
  );
}

export default OffersList;
