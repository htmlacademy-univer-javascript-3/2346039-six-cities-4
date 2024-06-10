import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../types/app-route';

export const NotFoundPage: FC = () => (
  <div style={{margin: 24}}>
    <Link to={AppRoute.Index}>
      <img src="img/404.jpg" width="691" height="921" />
    </Link>
    <p>
        Тут ничего нет), ну, кроме поезда, нажмешь на него, вернешься туда, откуда пришел C:
    </p>
  </div>
);
