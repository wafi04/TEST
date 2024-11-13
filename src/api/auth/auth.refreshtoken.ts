import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constant";
import { ErrorResponse } from "./auth.login";

const refreshUser = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/refresh`, 
      {}, // Empty body
      {
        withCredentials: true, // Penting untuk mengirim cookies
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return response.data;
  } catch (error) {
    // Log error untuk debugging
    console.error('Refresh Token Error:', error);
    throw error;
  }
};

export function RefreshMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['refresh'],
    mutationFn: refreshUser,
    onError: (error: ErrorResponse) => {
      console.error('Refresh Token Failed:', error);
      
      // Hapus semua data query dan navigasi ke login
      queryClient.clear(); // Membersihkan semua cache query
      navigate('/auth/login'); // Pastikan path login benar
    },
    onSuccess: (data) => {
      console.log('Token Refreshed Successfully', data);
      
      // Invalidate dan refetch query user
      queryClient.invalidateQueries({ queryKey: ['user'] });
      
      // Opsional: Refresh halaman atau update state
      // window.location.reload();
    }
  });
}