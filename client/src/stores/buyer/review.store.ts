import { create } from "zustand";

type RatingBreakdown = {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
};

type ReviewStoreState = {
  reviews: ProductReview[] | null;
  totalReviews: number | null;
  averageRating: number | null;
  ratingBreakdown: RatingBreakdown | null;

  // setters
  setReviews: (reviews: ProductReview[] | null) => void;
  setTotalReviews: (count: number | null) => void;
  setAverageRating: (rating: number | null) => void;
  setRatingBreakdown: (breakdown: RatingBreakdown | null) => void;

  // update all values at once
  setReviewData: (data: {
    reviews: ProductReview[] | null;
    totalReviews: number | null;
    averageRating: number | null;
    ratingBreakdown: RatingBreakdown | null;
  }) => void;
};

export const useReviewStore = create<ReviewStoreState>((set) => ({
  reviews: null,
  totalReviews: null,
  averageRating: null,
  ratingBreakdown: null,

  // --- Setters ---
  setReviews: (reviews) => set({ reviews }),
  setTotalReviews: (totalReviews) => set({ totalReviews }),
  setAverageRating: (averageRating) => set({ averageRating }),
  setRatingBreakdown: (ratingBreakdown) => set({ ratingBreakdown }),

  // update everything in one call
  setReviewData: (data) => set({
    reviews: data.reviews,
    totalReviews: data.totalReviews,
    averageRating: data.averageRating,
    ratingBreakdown: data.ratingBreakdown,
  }),
}));
