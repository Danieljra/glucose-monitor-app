import { apiService } from './api';
import { LoginCredentials, LoginResponse } from '../types';

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await apiService.login(credentials);

      if (!response.token) {
        throw new Error('Token no recibido del servidor');
      }

      console.log('✅ Login exitoso para:', response.email);
      return response;

    } catch (error: any) {
      console.error('❌ Error en login:', error.message);

      // MAPEO DE ERRORES ESPECÍFICOS
      if (error.status === 401) {
        throw new Error('Credenciales inválidas');
      }

      if (error.status === 400) {
        throw new Error('Campos requeridos');
      }

      if (error.status >= 500) {
        throw new Error('Error del servidor. Intenta más tarde.');
      }

      throw error;
    }
  }
}

export const authService = new AuthService();
