import { create } from 'zustand';

interface UIState {
  isSelectionOpen: boolean;
  openSelection: () => void;
  closeSelection: () => void;
  isUserMenuOpen: boolean;
  toggleUserMenu: () => void;
  closeUserMenu: () => void;
  closeAll: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSelectionOpen: false,
  isUserMenuOpen: false,

  openSelection: () => set({ 
    isSelectionOpen: true, 
    isUserMenuOpen: false 
  }),

  closeSelection: () => set({ isSelectionOpen: false }),

  toggleUserMenu: () => set((state) => ({ 
    isUserMenuOpen: !state.isUserMenuOpen,
    isSelectionOpen: false 
  })),

  closeUserMenu: () => set({ isUserMenuOpen: false }),

  closeAll: () => set({ 
    isSelectionOpen: false, 
    isUserMenuOpen: false 
  }),
}));
