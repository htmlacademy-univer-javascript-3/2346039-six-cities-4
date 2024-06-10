/* eslint-disable no-console */
import { ChangeEvent, FC, FormEvent, useCallback, useEffect, useState } from 'react';
import { Comment } from '../../../types/comment';

type WriteReviewFormProps = {
  onSend: (comment: Comment) => void;
}

export const WriteReviewForm: FC<WriteReviewFormProps> = ({onSend}) => {
  const [review, setReview] = useState<Comment>({
    rating: 0,
    comment: ''
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = e.target.name;
    const value = e.target.value;

    if (key === 'rating') {
      setReview({
        ...review,
        [key]: Number(value)
      });
    } else {
      setReview({
        ...review,
        [key]: String(value)
      });
    }
  };

  useEffect(() => {
    setButtonDisabled(review.comment.length < 50 || review.rating === 0);
  }, [review.rating, review.comment]);

  const handleFormSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    onSend(review);
    setReview((prev) => ({...prev, comment: ''}));
  }, [review, onSend]);

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
                      Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="5"
          id="5-stars"
          type="radio"
          onChange={onChange}
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="4"
          id="4-stars"
          type="radio"
          onChange={onChange}
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="3"
          id="3-stars"
          type="radio"
          onChange={onChange}
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="2"
          id="2-stars"
          type="radio"
          onChange={onChange}
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="1"
          id="1-star"
          type="radio"
          onChange={onChange}
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={onChange}
        value={review.comment}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                        To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
                        your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={buttonDisabled}
          onClick={handleFormSubmit}
        >
                        Submit
        </button>
      </div>
    </form>
  );
};
