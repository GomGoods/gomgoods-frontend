"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

type AuthTab = "login" | "register";

const AUTH_STORAGE_KEY = "gomgoods_auth_user";

export interface AuthUser {
  username: string;
  displayName: string;
  avatar: string;
}

interface AuthModalContextType {
  // Modal controls
  isOpen: boolean;
  activeTab: AuthTab;
  openModal: (tab?: AuthTab) => void;
  closeModal: () => void;
  setActiveTab: (tab: AuthTab) => void;
  // Auth state
  isLoggedIn: boolean;
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<AuthTab>("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  // Hydrate auth state from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as AuthUser;
        setUser(parsed);
        setIsLoggedIn(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const openModal = useCallback((tab: AuthTab = "login") => {
    setActiveTab(tab);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const login = useCallback((userData: AuthUser) => {
    setUser(userData);
    setIsLoggedIn(true);
    setIsOpen(false);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
    } catch {
      // ignore
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsLoggedIn(false);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return (
    <AuthModalContext.Provider
      value={{
        isOpen,
        activeTab,
        openModal,
        closeModal,
        setActiveTab,
        isLoggedIn,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return context;
}
