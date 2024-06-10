import { useEffect, useState } from 'react';
import { OfferDetail } from '../types/offer-detail';
import { Review } from '../types/review';
import { Offer } from '../types/offer';
import { useQuery } from '@tanstack/react-query';
import { ApiService } from '../services/api-service';

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

  const { isLoading: isOfferLoading, data: offerDetail } = useQuery({
    queryKey: ['offer', id],
    queryFn: async () => (await ApiService.get<OfferDetail>(`/offers/${id}`)).data
  });

  const { isLoading: isReviewsLoading, data: reviewsRaw } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => (await ApiService.get<Review[]>(`/comments/${id}`)).data
  });

  const { isLoading: isNearbyOffersLoading, data: nearbyOffersRaw } = useQuery({
    queryKey: ['nearby', id],
    queryFn: async () => (await ApiService.get<Offer[]>(`/offers/${id}/nearby`)).data
  });

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
