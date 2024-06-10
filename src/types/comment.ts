import { Review } from './review';

export type Comment = Omit<Review, 'id' | 'date' | 'user'>
