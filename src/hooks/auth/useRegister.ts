import { create } from 'zustand';
import { RegisterDto } from '../../types/auth';

// type untuk useregister
export type UseRegister = {
  formData: RegisterDto;
  setFormData: (formData: RegisterDto) => void;
  resetForm: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Tambahkan method handleChange
};

// hooks untuk registerstore
export const useRegisterStore = create<UseRegister>((set) => ({
  formData: {
    confirmPassword: '',
    email: '',
    name: '',
    password: '',
  },
  setFormData: (formData) => set({ formData }),
  resetForm: () => set({
    formData: {
      confirmPassword: '',
      email: '',
      name: '',
      password: '',
    },
  }),
  // Tambahkan method handleChange
  handleChange: (e) => set((state) => ({
    formData: {
      ...state.formData,
      [e.target.name]: e.target.value
    }
  })),
}));