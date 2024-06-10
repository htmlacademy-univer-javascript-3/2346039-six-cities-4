import { FC, PropsWithChildren } from 'react';
import { HeaderView } from '../components/header';

interface MainLayoutProps {
  color?: string;
}

export const MainLayout: FC<PropsWithChildren<MainLayoutProps>> = ({
  children,
  color
}) => (
  <div className={`page ${color ? `page--${color}` : ''}`}>
    <HeaderView />
    {children}
  </div>
);
