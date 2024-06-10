import { FC, useMemo, useState } from 'react';
import { Offer } from '../../../types/offer';
import { Link } from 'react-router-dom';
import { OfferCard } from './offer-card';
import { Point } from '../../../types/point';
import { City } from '../../../types/city';
import { DEFAULT_CITY } from '../../../const';
import { Map } from '../../../components/map';

type OfferCardListProps = {
    offers: Offer[];
}

export const OfferCardList: FC<OfferCardListProps> = ({ offers}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [focusedCard, setFocusedCard] = useState<string | null>(null);
  const [activePoint, setActivePoint] = useState<Point>();
  const [activeCity, setActiveCity] = useState<City>(DEFAULT_CITY);

  const points = useMemo<Point[]>(
    () =>
      offers.map((offer) => ({
        id: offer.id,
        latitude: offer.location.latitude,
        longitude: offer.location.longitude,
        zoom: offer.location.zoom,
      })),
    [offers]
  );

  const handleCardFocus = (id: string) => {
    const point = points.find((p) => p.id === id);
    const city = offers.find((offer) => offer.id === id)?.city;
    if (city) {
      setActiveCity(city);
    }
    if (point) {
      setActivePoint(point);
    }
  };

  const handleCardUnfocus = () => {
    setActivePoint(undefined);
  };

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in Amsterdam</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0}>
            Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened">
            <li className="places__option places__option--active" tabIndex={0}>Popular</li>
            <li className="places__option" tabIndex={0}>Price: low to high</li>
            <li className="places__option" tabIndex={0}>Price: high to low</li>
            <li className="places__option" tabIndex={0}>Top rated first</li>
          </ul>
        </form>
        <div className="cities__places-list places__list tabs__content">
          {
            offers.map((offer) => (
              <Link key={`card-${offer.id}`} to={`/offer/${offer.id}`}>
                <OfferCard offer={offer} onMouseEnter={() => handleCardFocus(offer.id)} onMouseLeave={() => handleCardUnfocus} />
              </Link>
            ))
          }
        </div>
      </section>
      <div className="cities__right-section">
        <Map city={activeCity} points={points} selectedPoint={activePoint} />
      </div>
    </div>
  );
};
