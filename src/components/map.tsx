import { useRef, useEffect, FC } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../hooks/use-map';

import 'leaflet/dist/leaflet.css';
import { City } from '../types/city';
import { Point } from '../types/point';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../const';
import classNames from 'classnames';

interface MapProps {
  city: City;
  points: Point[];
  selectedPoint: Point | undefined;
  className?: string;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export const Map: FC<MapProps> = (props) => {
  const { city, points, selectedPoint } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude,
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point.id === selectedPoint.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  useEffect(() => {
    if (map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  }, [map, city]);

  return <div className={classNames('map', props.className)} ref={mapRef}></div>;
};
