import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/helpers';
import { selectFavoritesLength, selectUser } from '../store/selectors';
import { logoutAsync } from '../store/action';
import { AppRoute } from '../types/app-route';

export const HeaderView: FC = () => {
  const user = useAppSelector(selectUser);
  const favoritesCount = useAppSelector(selectFavoritesLength);

  const IS_AUTHENTICATED = !!user;

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutAsync());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRoute.Index}>
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {IS_AUTHENTICATED ? (
                <>
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.Favorites}
                    >
                      <div
                        className="header__avatar-wrapper user__avatar-wrapper"
                        style={{
                          backgroundImage: `url(${user.avatarUrl})`,
                          borderRadius: '50%',
                        }}
                      />
                      <span className="header__user-name user__name">
                        {user.name}
                      </span>
                      <span className="header__favorite-count">{favoritesCount}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to={AppRoute.Index} onClick={handleLogout}>
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </>
              ) : (
                <Link
                  className="header__nav-link header__nav-link--profile"
                  to={AppRoute.Login}
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  <span className="header__login">Sign in</span>
                </Link>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
