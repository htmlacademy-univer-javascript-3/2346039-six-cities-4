import { FC, useMemo, useState } from 'react';
import { OfferCardList } from '../../components/offer-card-list';
import { Point } from '../../types/point';
import { Map } from '../../components/map';
import { selectCurrentCity, selectCurrentOffers, selectLoading } from '../../store/selectors';
import { useAppSelector } from '../../store/helpers';
import { CityPicker } from '../../components/city-picker';
import { CITIES } from '../../const';
import { Spinner } from '../../components/spinner';

export const MainPage: FC = () => {
  const [activePoint, setActivePoint] = useState<Point>();

  const activeCity = useAppSelector(selectCurrentCity);
  const offers = useAppSelector(selectCurrentOffers).filter((offer) => offer.city.name === activeCity.name);

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

  const isLoading = useAppSelector(selectLoading);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CityPicker cities={CITIES} />
        <div className="cities">
          <div className="cities__places-container container">
            <OfferCardList offers={offers ?? []} setActivePoint={setActivePoint}
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
};
