import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { api, isAuthenticated, setAuthTokens, getRefreshToken, setAccessToken, clearTokens } from '../api/client';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  useEffect(() => {
    // Bootstrap access token from refresh token on app load
    const boot = async () => {
      const rt = getRefreshToken();
      if (!rt) {
        setIsLoggedIn(false);
        return;
      }
      try {
        const { data } = await api.post('/auth/refresh', { refreshToken: rt });
        setAuthTokens(data.accessToken, data.refreshToken);
        setIsLoggedIn(true);
      } catch {
        clearTokens();
        setAccessToken(null);
        setIsLoggedIn(false);
      }
    };
    boot();
  }, []);

  const login = (accessToken: string, refreshToken: string) => {
    setAuthTokens(accessToken, refreshToken);
    setIsLoggedIn(true);
  };

  const logout = () => {
    clearTokens();
    setIsLoggedIn(false);
    // Tránh phụ thuộc Router context ở Provider cấp cao
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};