import { FC } from 'react';
import { Offer } from '../types/offer';
import { getOfferCardClassName } from '../utils/offer-card-classname';
import { AppRoute } from '../types/app-route';
import { Link } from 'react-router-dom';
import { Rating } from './rating';

type OfferCardProps = {
    offer: Offer;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    prefix?: string;
    onFavoriteClick: (id: string, status: boolean) => void;
}

export const OfferCard: FC<OfferCardProps> = ({ offer, onMouseEnter, onMouseLeave, prefix, onFavoriteClick }) => (
  <article
    className={`${getOfferCardClassName(prefix, 'card')} place-card`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {offer.isPremium && (
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
    )}
    <div
      className={`${getOfferCardClassName(
        prefix,
        'image-wrapper'
      )} place-card__image-wrapper`}
    >
      <Link to={`${AppRoute.ToOffer}/${offer.id}`}>
        <img
          className="place-card__image"
          src={offer.previewImage}
          width="260"
          height="200"
          alt="Place image"
        />
      </Link>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{offer.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button
          className={`place-card__bookmark-button button ${
            offer.isFavorite ? 'place-card__bookmark-button--active' : ''
          }`}
          type="button"
          onClick={() => onFavoriteClick(offer.id, !offer.isFavorite)}
        >
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">
            {offer.isFavorite ? 'In' : 'To'} bookmarks
          </span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <Rating value={offer.rating} />
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={`${AppRoute.ToOffer}/${offer.id}`}>{offer.title}</Link>
      </h2>
      <p className="place-card__type">{offer.type}</p>
    </div>
  </article>
);
