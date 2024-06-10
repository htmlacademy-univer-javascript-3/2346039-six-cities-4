import { FC } from 'react';
import { User } from '../types/user';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '../types/app-route';

type PrivateRouteProps = {
    user: User | null;
    children: JSX.Element | JSX.Element[];
};

export const PrivateRoute: FC<PrivateRouteProps> = ({user, children}) => {
  if (user === null) {
    return <Navigate to={AppRoute.Login}/>;
  }
  return children;
};
