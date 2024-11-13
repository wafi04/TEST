import { LoginDto } from "../../types/auth";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { BASE_URL } from "../../constant";
import { useNavigate } from "react-router-dom";

// Tipe untuk error response dari axios
export interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

const loginUser = async (userData: LoginDto) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, userData, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export function LoginMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginDto) => loginUser(data),
    onError: (error: ErrorResponse) => {
      // Cek error dari response axios atau error biasa
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";

      queryClient.cancelQueries({ queryKey: ["user"] });
      toast.error(`Error: ${errorMessage}`);
    },
    onSuccess: () => {
      toast.success("Login successful");
      navigate("/");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
