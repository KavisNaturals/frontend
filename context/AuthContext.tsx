'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { authApi, AuthResponse } from '@/lib/api';
import { saveAuth, clearAuth, getSavedUser, getToken, getRefreshToken } from '@/lib/auth';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  authLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const savedUser = getSavedUser<User>();
    const savedToken = getToken();
    if (savedUser && savedToken) {
      setUser(savedUser);
      setToken(savedToken);
    }
    setAuthLoading(false);
  }, []);

  const handleAuthResponse = useCallback((res: AuthResponse) => {
    saveAuth(res.token, res.user, res.refreshToken);
    setUser(res.user);
    setToken(res.token);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await authApi.login(email, password);
      handleAuthResponse(res);
    },
    [handleAuthResponse]
  );

  const register = useCallback(
    async (name: string, email: string, password: string, phone?: string) => {
      const res = await authApi.register(name, email, password, phone);
      handleAuthResponse(res);
    },
    [handleAuthResponse]
  );

  const logout = useCallback(() => {
    clearAuth();
    setUser(null);
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn: !!user,
        isAdmin: user?.role === 'admin',
        authLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
