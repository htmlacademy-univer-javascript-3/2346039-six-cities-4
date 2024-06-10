import { FC } from 'react';
import { Offer } from '../types/offer';
import { OfferCard } from './offer-card';
import { Point } from '../types/point';
import { City } from '../types/city';
import classNames from 'classnames';
import { getOfferCardClassName } from '../utils/offer-card-classname';

type OfferCardListProps = {
    offers: Offer[];
    setActiveCity?: (city: City) => void;
    setActivePoint: (point?: Point) => void;
    points: Point[];
    prefix?: string;
}

export const OfferCardList: FC<OfferCardListProps> = ({ offers, setActiveCity, setActivePoint, points, prefix = 'cities' }) => {
  const handleCardFocus = (id: string) => {
    const point = points.find((p) => p.id === id);
    const city = offers.find((offer) => offer.id === id)?.city;
    if (city) {
      setActiveCity?.(city);
    }
    if (point) {
      setActivePoint(point);
    }
  };

  const handleCardUnfocus = () => {
    setActivePoint(undefined);
  };

  return (
    <section className={classNames(getOfferCardClassName(prefix, 'places'), 'places')}>
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {offers?.length ?? 0} places to stay in Amsterdam
      </b>
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex={0}>
            Popular
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className="places__options places__options--custom places__options--opened">
          <li className="places__option places__option--active" tabIndex={0}>
              Popular
          </li>
          <li className="places__option" tabIndex={0}>
              Price: low to high
          </li>
          <li className="places__option" tabIndex={0}>
              Price: high to low
          </li>
          <li className="places__option" tabIndex={0}>
              Top rated first
          </li>
        </ul>
      </form>
      <div
        className={classNames(getOfferCardClassName(prefix, 'places-list'), 'places__list tabs__content')}
      >
        {offers.map((card) => (
          <OfferCard
            prefix="cities"
            key={`card-${card.id}`}
            onMouseEnter={() => handleCardFocus(card.id)}
            onMouseLeave={() => handleCardUnfocus()}
            offer={card}
          />
        ))}
      </div>
    </section>
  );
};
