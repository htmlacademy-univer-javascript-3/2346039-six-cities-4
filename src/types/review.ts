import { PublicUser } from './public-user';

export type Review = {
    id: string;
    date: string;
    user: PublicUser;
    comment: string;
    rating: number;
};
