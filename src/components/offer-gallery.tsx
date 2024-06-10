import { FC } from 'react';
import { OfferDetail } from '../types/offer-detail';

interface OfferGalleryProps {
  images: OfferDetail['images'];
  alt: string;
}

export const OfferGallery: FC<OfferGalleryProps> = ({ images, alt }) => (
  <div className="offer__gallery">
    {images.map((image) => (
      <div key={image} className="offer__image-wrapper">
        <img className="offer__image" src={image} alt={alt} />
      </div>
    ))}
  </div>
);
