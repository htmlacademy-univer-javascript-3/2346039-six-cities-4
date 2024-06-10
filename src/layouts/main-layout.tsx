import { FC, PropsWithChildren } from 'react';
import { HeaderView } from '../components/header';
import { User } from '../types/user';

interface MainLayoutProps {
  color?: string;
  user: User | undefined;
  favoriteCount: number | undefined;
}

export const MainLayout: FC<PropsWithChildren<MainLayoutProps>> = ({
  children,
  color,
  user,
  favoriteCount
}) => (
  <div className={`page ${color ? `page--${color}` : ''}`}>
    <HeaderView user={user} favoriteCount={favoriteCount} />
    {children}
  </div>
);