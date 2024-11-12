import { RegisterDto } from "../../types/auth";
import axios from 'axios';
import { useMutation,useQueryClient } from '@tanstack/react-query';
import { toast } from "sonner"
import { BASE_URL } from "../../constant";
import { useNavigate } from "react-router-dom";

const registerUser  = async (userData: RegisterDto) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, userData,{
      withCredentials : true,
      headers : {
          "Content-Type"  : "Application/json"
      }
  });
  return response.data;
};

export  function RegisterMutation (){
    const queryClient = useQueryClient()
    const navigate  = useNavigate()
    return useMutation({
        mutationKey : ['register'],
        mutationFn : (data : RegisterDto)  => registerUser(data),
        onError : (error : Error) => {
            queryClient.cancelQueries({queryKey : ['user']})
            toast.success('Registered Success')
        },
        onSuccess: () => {
        toast.success('register success');
        navigate('/auth/login')
        queryClient.invalidateQueries({ queryKey: ['user'] });
    }
    })
}
