import { create } from 'zustand';

interface UIState {
  // Selection (Cart) State
  isSelectionOpen: boolean;
  openSelection: () => void;
  closeSelection: () => void;
  
  // User Menu (Identity) State
  isUserMenuOpen: boolean;
  toggleUserMenu: () => void;
  closeUserMenu: () => void;
  
  // Global Actions
  closeAll: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  // Selection Logic
  isSelectionOpen: false,
  openSelection: () => set({ 
    isSelectionOpen: true, 
    isUserMenuOpen: false // Auto-close user menu when cart opens
  }),
  closeSelection: () => set({ isSelectionOpen: false }),

  // User Menu Logic
  isUserMenuOpen: false,
  toggleUserMenu: () => set((state) => ({ 
    isUserMenuOpen: !state.isUserMenuOpen,
    isSelectionOpen: false // Auto-close cart when user menu opens
  })),
  closeUserMenu: () => set({ isUserMenuOpen: false }),

  // Helper to clear the screen
  closeAll: () => set({ 
    isSelectionOpen: false, 
    isUserMenuOpen: false 
  }),
}));
