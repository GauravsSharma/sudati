import api from "@/lib/axios";
import { useUserStore } from "@/stores/user.store";
import { useQuery, useMutation } from "@tanstack/react-query";

interface SendOtpPayload {
  phone: string;
}
interface VerifyOtpPayload {
  phone: string;
  otp: string;
  userType:"seller"|"customer";
}

// GET /api/users/me
export const useCurrentUser = () => {
  const setUser = useUserStore((s) => s.setUser);

  return useQuery<User>({
    queryKey: ["current-user"],
    queryFn: async () => {
      const res = await api.get("/user")
      setUser(res.data.user);
      console.log("Data------------>",res.data);
      
      return res.data.user;
    },
  });
};

// Send OTP
export const useSendOtp = () => {
  return useMutation({
    mutationFn: async (data: SendOtpPayload) => {
      const res = await api.post("/user/login", data);
      return res.data;
    },
  });
};

// Verify OTP → return token + user
export const useVerifyOtp = () => {
  const setUser = useUserStore((s) => s.setUser);

  return useMutation({
    mutationFn: async (data: VerifyOtpPayload) => {
      const res = await api.post("/user/verify-otp", data);
      return res.data;
    },
    onSuccess: (data) => {
      console.log("logging from useVerifyOtp:" ,data);
      
      setUser(data.user);
    },
  });
};
