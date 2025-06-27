// src/store/errorModalStore.ts
import { create } from 'zustand';

type ModalType = 'ok' | 'error' | 'caution';

type ErrorModalState = {
    isVisible: boolean;
    message: string;
    type: ModalType;
    redirectToLogin: boolean;
    showError: (message: string, type?: ModalType, redirectToLogin?: boolean) => void;
    hideError: () => void;
};

export const useErrorModalStore = create<ErrorModalState>((set) => ({
    isVisible: false,
    message: '',
    type: 'error',
    redirectToLogin: false,
    showError: (message, type = 'error', redirectToLogin = false) =>
        set({ isVisible: true, message, type, redirectToLogin }),
    hideError: () =>
        set({ isVisible: false, message: '', type: 'error', redirectToLogin: false }),
}));
