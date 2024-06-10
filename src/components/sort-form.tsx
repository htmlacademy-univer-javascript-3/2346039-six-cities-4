import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/helpers';
import { selectCurrentSortMethod } from '../store/selectors';
import { SortMethod } from '../types/sort-method';
import { updateSortMethod } from '../store/action';
import { SortMethodTexts } from '../res/strings';
import classNames from 'classnames';

export const SortFormView = () => {
  const sortMethod = useAppSelector(selectCurrentSortMethod);
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const handleSortFormClick = () => {
    setIsOpen(!isOpen);
  };

  const selectSortMethod = (method: SortMethod) => {
    setIsOpen(false);
    dispatch(updateSortMethod(method));
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleSortFormClick}>
        {SortMethodTexts[sortMethod]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={classNames('places__options places__options--custom', isOpen && 'places__options--opened')}>
        {
          Object.values(SortMethod).map((method) => (
            <li
              key={method}
              className={`places__option ${sortMethod === method ? 'places__option--active' : ''}`}
              tabIndex={0}
              onClick={() => {
                selectSortMethod(method);
              }}
            >
              {SortMethodTexts[method]}
            </li>
          ))
        }
      </ul>
    </form>
  );
};
