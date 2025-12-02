import api from "@/lib/axios";
import { useProductStore } from "@/stores/buyer/products.store";
import { useReviewStore } from "@/stores/buyer/review.store";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
interface ReviewDataPayload{
    productId:string,
    rating:number,
    review:string
}
interface reviewResponse{
  reviews:ProductReview,
  averageRating:string,
  totalReviews:number,
  ratingBreakDown:{
    1:number
    2:number
    3:number
    4:number
    5:number
  }
}
export const useGetReviews = (productId:string) => {
  const setReviewData = useReviewStore(s=>s.setReviewData)
  return useQuery<reviewResponse>({
    queryKey: ["review-store"],
    queryFn: async () => {
      const res = await api.get(`/review/${productId}`)
      setReviewData(res.data)
      return res.data;
    },
  });
};
export const useAddReview = () => {
    return useMutation({
        mutationFn: async (data: ReviewDataPayload) => {
            const res = await api.post("/review", data);
            return res.data;
        },
    });
};
