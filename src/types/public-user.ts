import { User } from './user';

export type PublicUser = Omit<User, 'email' | 'token'>;
