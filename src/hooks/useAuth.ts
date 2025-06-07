import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { loginUser, logout, clearError } from '../store/slices/authSlice';
import { LoginCredentials } from '../types';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
  } = useSelector((state: RootState) => state.auth);

  const login = async (credentials: LoginCredentials) => {
    try {
      const result = await dispatch(loginUser(credentials)).unwrap();
      return result;
    } catch (err) {
      throw err;
    }
  };

  const handleLogout = () => dispatch(logout());

  const handleClearError = () => dispatch(clearError());

  return {
    // Estado
    user,
    token,
    isLoading,
    error,
    isAuthenticated,

    // Acciones
    login,
    logout: handleLogout,
    clearError: handleClearError,
  };
};
