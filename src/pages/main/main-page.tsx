import { FC, useMemo, useState } from 'react';
import { Offer } from '../../types/offer';
import { OfferCardList } from '../../components/offer-card-list';
import { Point } from '../../types/point';
import { City } from '../../types/city';
import { DEFAULT_CITY } from '../../const';
import { Map } from '../../components/map';

type MainPageProps = {
  offers: Offer[];
}

export const MainPage: FC<MainPageProps> = ({ offers }) => {
  const [activePoint, setActivePoint] = useState<Point>();
  const [activeCity, setActiveCity] = useState<City>(DEFAULT_CITY);

  const points = useMemo<Point[]>(
    () =>
      offers?.map((offer) => ({
        id: offer.id,
        latitude: offer.location.latitude,
        longitude: offer.location.longitude,
        zoom: offer.location.zoom,
      })) ?? [],
    [offers]
  );

  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Paris</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Cologne</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Brussels</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item tabs__item--active">
                  <span>Amsterdam</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Hamburg</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Dusseldorf</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <OfferCardList offers={offers ?? []} setActiveCity={setActiveCity} setActivePoint={setActivePoint}
              points={points}
            />
            <div className="cities__right-section">
              <Map city={activeCity} points={points} selectedPoint={activePoint} className='cities__map' />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}