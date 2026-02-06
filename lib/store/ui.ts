import { create } from 'zustand';

interface UIState {
  isSelectionOpen: boolean;
  openSelection: () => void;
  closeSelection: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSelectionOpen: false,
  openSelection: () => set({ isSelectionOpen: true }),
  closeSelection: () => set({ isSelectionOpen: false }),
  isUserMenuOpen: false,
  toggleUserMenu: () => set((state) => ({ isUserMenuOpen: !state.isUserMenuOpen })),
  closeUserMenu: () => set({ isUserMenuOpen: false }),

}));
