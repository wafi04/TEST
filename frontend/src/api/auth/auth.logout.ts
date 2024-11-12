import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BASE_URL } from "../../constant";
import { ErrorResponse } from "./auth.login";

const logoutUser = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/logout`, 
      {}, // Empty body
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Logout Error:', error);
    throw error;
  }
};

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: logoutUser,
    onMutate: async () => {
      // Optimistic update
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['user'] });

      // Snapshot the previous value
      const previousUser = queryClient.getQueryData(['user']);

      // Optimistically remove user data
      queryClient.setQueryData(['user'], null);

      // Return a context object with the snapshotted value
      return { previousUser };
    },
    onError: (error: ErrorResponse, variables, context) => {
      // Rollback the optimistic update if logout fails
      if (context?.previousUser) {
        queryClient.setQueryData(['user'], context.previousUser);
      }

      // Handle error
      const errorMessage = 
        error.response?.data?.message || 
        error.message || 
        'Logout failed';
      
      toast.error(`Logout failed: ${errorMessage}`, {
        position: 'top-right',
        duration: 3000,
      });
    },
    onSuccess: () => {
      // Clear all queries related to user
      queryClient.removeQueries({ queryKey: ['user'] });

      // Show success toast
      toast.success('Logged out successfully', {
        position: 'top-right',
        duration: 2000,
      });

      // Redirect to login with minimal interruption
      navigate('/auth/login', { 
        replace: true, // Replace current history entry
        state: { from: 'logout' } // Optional: pass state if needed
      });
    },
    onSettled: () => {
      // Ensure complete cleanup
      queryClient.clear(); // Optional: completely clear query cache
    }
  });
}
