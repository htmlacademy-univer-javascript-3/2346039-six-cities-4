/* eslint-disable react/no-array-index-key */
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { WriteReviewForm } from './components/write-review-form';
import { Point } from '../../types/point';
import { OfferGallery } from '../../components/offer-gallery';
import { ReviewsList } from './components/review-list';
import { OfferCard } from '../../components/offer-card';
import { Map } from '../../components/map';
import { useGetOfferDetail } from '../../hooks/use-get-offer-detail';
import { Spinner } from '../../components/spinner';
import { useAppDispatch, useAppSelector } from '../../store/helpers';
import { selectAuthStatus } from '../../store/selectors';
import { updateOfferFavoriteStatus } from '../../store/action';
import { AuthStatus } from '../../types/auth-status';
import useMutation from '../../hooks/use-mutation';
import { Review } from '../../types/review';

export const OfferPage: FC = () => {
  const { id } = useParams();

  const {offerDetail: offer, reviews, nearbyOffers, isLoading, addReview, changeOfferIsFavorite} = useGetOfferDetail({ id: id ?? '' });

  const authStatus = useAppSelector(selectAuthStatus);

  const dispatch = useAppDispatch();

  const points = useMemo<Point[]>(
    () =>
      nearbyOffers?.map((item) => ({
        id: item.id,
        latitude: item.location.latitude,
        longitude: item.location.longitude,
        zoom: item.location.zoom,
      })) ?? [],
    [nearbyOffers]
  );
  const [activePoint, setActivePoint] = useState<Point>();

  const [isOfferInFavorites, setIsOfferInFavorites] = useState<boolean>(offer?.isFavorite ?? false);

  useEffect(() => {
    setIsOfferInFavorites(offer?.isFavorite ?? false);
  }, [offer?.isFavorite]);

  const handleFavoriteClick = useCallback(() => {
    dispatch(updateOfferFavoriteStatus({id: id ?? '', status: !isOfferInFavorites})).then((result) => {
      setIsOfferInFavorites(result.payload as boolean);
    });
  }, [id, isOfferInFavorites, dispatch]);

  const handleNearbyOfferFavoriteClick = useCallback((nearbyOfferId: string, status: boolean) => {
    dispatch(updateOfferFavoriteStatus({id: nearbyOfferId, status})).then((result) => {
      changeOfferIsFavorite?.(nearbyOfferId, result.payload as boolean);
    });
  }, [dispatch, changeOfferIsFavorite]);

  const [mutate] = useMutation<Review>(`/comments/${id}`, 'POST', {
    onSuccess: (data) => {
      addReview(data);
    },
  });


  if (isLoading) {
    return (
      <Spinner />
    );
  }

  if (!offer && !isLoading) {
    return <Navigate to="/not_found" />;
  }

  if (!offer) {
    return null;
  }

  const handleCardMouseEnter = (placeId: string) => {
    const point = points.find((p) => p.id === placeId);
    if (point) {
      setActivePoint(point);
    }
  };

  const handleCardMouseLeave = () => {
    setActivePoint(undefined);
  };

  return (
    <div className="page">
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <OfferGallery images={offer.images} alt={offer.title} />
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <button className={`offer__bookmark-button ${isOfferInFavorites ? 'offer__bookmark-button--active' : ''} button`} type="button" onClick={() => {
                  handleFavoriteClick();
                }}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{isOfferInFavorites ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${offer.rating * 20}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type.toUpperCase()}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((it) => (
                    <li key={`offer__inside-item-${it}`} className="offer__inside-item">{it}</li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={offer.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{offer.host.name}</span>
                  <span className="offer__user-status">{offer.host.isPro ? 'Pro' : 'Non-Pro'}</span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewsList reviews={reviews} />
                {
                  authStatus === AuthStatus.LOGGED_IN && (
                    <WriteReviewForm onSend={(comment) => {
                      mutate(JSON.stringify(comment));
                    }}
                    />
                  )
                }
              </section>
            </div>
          </div>
        </section>
        {
          nearbyOffers && nearbyOffers.length > 0 && (
            <div className="container">
              <section className="near-places places">
                <Map city={offer.city} points={points} selectedPoint={activePoint} className='offer__map' />
                <h2 className="near-places__title">
              Other places in the neighbourhood
                </h2>
                <div className="near-places__list places__list">
                  {nearbyOffers.map((item) => (
                    <OfferCard
                      key={item.id}
                      prefix={'near-places'}
                      onMouseEnter={() => handleCardMouseEnter(item.id)}
                      onMouseLeave={handleCardMouseLeave}
                      offer={item}
                      onFavoriteClick={handleNearbyOfferFavoriteClick}
                    />
                  ))}
                </div>
              </section>
            </div>
          )
        }
      </main>
    </div>
  );
};
