import { useQuery } from "@tanstack/react-query";
import axios from "axios"; // Gunakan axios untuk konsistensi
import { BASE_URL } from "../../constant";
import { API_RESPONSE } from "../../types/types.utils";
import { UserData } from "../../types/user";

export const useProfile = () => {
  return useQuery<API_RESPONSE<UserData>, Error>({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/auth/profile`, {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        return response.data;
      } catch (error: any) {
        if (error.response?.status === 401) {
          try {
            // Try to refresh the token
            const refreshResponse = await axios.post(
              `${BASE_URL}/auth/refresh`,
              {},
              {
                withCredentials: true,
              }
            );

            if (refreshResponse.status === 200) {
              // If refresh successful, retry the original profile request
              const newResponse = await axios.get(`${BASE_URL}/auth/profile`, {
                withCredentials: true,
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              });
              return newResponse.data;
            }
          } catch (refreshError) {
            // If refresh fails, throw a specific error
            throw new Error("Authentication required");
          }
        }
        // For any other error, throw it
        throw error;
      }
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: 0, // Don't retry failed requests automatically
  });
};
