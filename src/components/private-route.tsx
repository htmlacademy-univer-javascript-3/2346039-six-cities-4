import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '../types/app-route';
import { useAppSelector } from '../store/helpers';
import { selectAuthStatus } from '../store/selectors';
import { AuthStatus } from '../types/auth-status';

type PrivateRouteProps = {
    children: JSX.Element | JSX.Element[];
};

export const PrivateRoute: FC<PrivateRouteProps> = ({children}) => {
  const authStatus = useAppSelector(selectAuthStatus);

  if (authStatus !== AuthStatus.LOGGED_IN) {
    return <Navigate to={AppRoute.Login}/>;
  }
  return children;
};
