import { FC, FormEvent, useCallback, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/helpers';
import { loginAsync, updateCity } from '../../store/action';
import { Link, Navigate } from 'react-router-dom';
import { selectAuthStatus } from '../../store/selectors';
import { AuthStatus } from '../../types/auth-status';
import { AppRoute } from '../../types/app-route';
import { City } from '../../types/city';

type LoginPageProps = {
  cities: City[];
}

export const LoginPage: FC<LoginPageProps> = ({ cities }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const randomCity = useMemo(() => cities[Math.floor(Math.random() * cities.length)], [cities]);

  const dispatch = useAppDispatch();

  const authStatus = useAppSelector(selectAuthStatus);

  const handleSumbit = useCallback((e: FormEvent) => {
    e.preventDefault();
    dispatch(loginAsync({ email, password }));
  }, [email, password, dispatch]);

  const handleCityClick = useCallback((city: City) => {
    dispatch(updateCity(city));
  }, [dispatch]);

  if (authStatus === AuthStatus.LOGGED_IN) {
    return (
      <Navigate to="/" />
    );
  }

  return (
    <div className="page page--gray page--login">
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
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSumbit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(evt) => setEmail(evt.target.value)}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(evt) => setPassword(evt.target.value)}
                />
              </div>
              <button className="login__submit form__submit button" type="submit">
              Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item" onClick={() => handleCityClick(randomCity)}>
              <Link className="locations__item-link" to={AppRoute.Index}>
                <span>{randomCity.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
