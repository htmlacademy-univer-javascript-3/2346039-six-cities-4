import { useEffect, useState } from 'react';
import { OfferDetail } from '../types/offer-detail';
import { Review } from '../types/review';
import { Offer } from '../types/offer';
import { useApiRequest } from './use-api-request';

type useGetOfferDetailParams = {
  id: string;
}

type useGetOfferDetailResult = {
  isLoading: boolean;
  offerDetail?: OfferDetail;
  reviews?: Review[];
  nearbyOffers?: Offer[];
  addReview: (data: Review) => void;
  changeOfferIsFavorite?: (nearbyOfferId: string, status: boolean) => void;
}

export const useGetOfferDetail = ({id}: useGetOfferDetailParams): useGetOfferDetailResult => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [nearbyOffers, setNearbyOffers] = useState<Offer[]>([]);

  const {data: offerDetail, loading: isOfferLoading} = useApiRequest<OfferDetail>(`/offers/${id}`);
  const {data: reviewsRaw, loading: isReviewsLoading} = useApiRequest<Review[]>(`/comments/${id}`);
  const {data: nearbyOffersRaw, loading: isNearbyOffersLoading} = useApiRequest<Offer[]>(`/offers/${id}/nearby`);

  useEffect(() => {
    if (reviewsRaw) {
      setReviews(reviewsRaw);
    }
  }, [reviewsRaw]);

  useEffect(() => {
    if (nearbyOffersRaw) {
      setNearbyOffers(nearbyOffersRaw);
    }
  }, [nearbyOffersRaw]);

  const addReview = (data: Review) => {
    setReviews((prev) => [...prev, data]);
  };

  const changeOfferIsFavorite = (nearbyOfferId: string, status: boolean) => {
    const offer = nearbyOffers.find((item) => item.id === nearbyOfferId);
    if (offer) {
      offer.isFavorite = status;
    }
    setNearbyOffers([...nearbyOffers]);
  };
  return {
    isLoading: isOfferLoading || isReviewsLoading || isNearbyOffersLoading,
    offerDetail,
    reviews,
    nearbyOffers,
    addReview,
    changeOfferIsFavorite,
  };
};
