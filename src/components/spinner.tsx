import { CircularProgress } from '@mui/material';
import './styles/spinner.css';

export const Spinner = () => (
  <div className="spinner__container">
    <CircularProgress size={64} />
  </div>
);
