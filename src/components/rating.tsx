import { FC } from 'react';

interface RatingProps {
  value: number;
}

export const Rating: FC<RatingProps> = ({ value }) => (
  <span
    style={{
      width: `${value * 20}%`,
    }}
  />
);