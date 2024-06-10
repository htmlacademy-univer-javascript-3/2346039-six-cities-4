import { Offer } from '../types/offer';
import { OfferDetail } from '../types/offer-detail';
import { Review } from '../types/review';

import { useApiRequest } from './use-api-request';

type useGetOfferDetailParams = {
  id: string;
}

type useGetOfferDetailResult = {
  isLoading: boolean;
  offerDetail?: OfferDetail;
  reviews?: Review[];
  nearbyOffers?: Offer[];
}

export const useGetOfferDetail = ({id}: useGetOfferDetailParams): useGetOfferDetailResult => {
  const {data: offerDetail, loading: isOfferLoading} = useApiRequest<OfferDetail>(`/offers/${id}`);
  const {data: reviews, loading: isReviewsLoading} = useApiRequest<Review[]>(`/comments/${id}`);
  const {data: nearbyOffers, loading: isNearbyOffersLoading} = useApiRequest<Offer[]>(`/offers/${id}/nearby`);

  return {
    isLoading: isOfferLoading || isReviewsLoading || isNearbyOffersLoading,
    offerDetail,
    reviews,
    nearbyOffers,
  };
};
