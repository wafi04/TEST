import { create } from "zustand";

type useFilter = {
  show: boolean; // status show untuk menampilkan atau tidak
  onOpen: () => void; // Mengubah parameter menjadi fungsi tanpa argumen
  onClose: () => void; // Mengubah parameter menjadi fungsi tanpa argumen
};

export const useSidebar = create<useFilter>((set) => ({
  show: false, // Inisialisasi status show
  onOpen: () => set({ show: true }), // Mengubah status show menjadi true
  onClose: () => set({ show: false }), // Mengubah status show menjadi false
}));
