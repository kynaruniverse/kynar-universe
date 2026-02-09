import { create } from 'zustand';

interface UIState {
  isSelectionOpen: boolean;
  isUserMenuOpen: boolean;
  
  // Selection Overlay Controls
  openSelection: () => void;
  closeSelection: () => void;
  
  // User Menu Controls
  toggleUserMenu: () => void;
  closeUserMenu: () => void;
  
  // Universal Close
  closeAll: () => void;
}

export const useUIStore = create < UIState > ((set) => ({
  // Initial state
  isSelectionOpen: false,
  isUserMenuOpen: false,
  
  // Open the selection overlay, close user menu if open
  openSelection: () =>
    set({ isSelectionOpen: true, isUserMenuOpen: false }),
  
  // Close the selection overlay
  closeSelection: () =>
    set({ isSelectionOpen: false }),
  
  // Toggle the user menu, ensure selection overlay is closed
  toggleUserMenu: () =>
    set((state) => ({
      isUserMenuOpen: !state.isUserMenuOpen,
      isSelectionOpen: false,
    })),
  
  // Close the user menu
  closeUserMenu: () =>
    set({ isUserMenuOpen: false }),
  
  // Close everything
  closeAll: () =>
    set({ isSelectionOpen: false, isUserMenuOpen: false }),
}));