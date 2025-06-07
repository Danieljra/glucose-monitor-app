import { LoginCredentials, LoginResponse, ApiError } from '../types';
import { IGetGlucoseByUserResponse, GlucoseRequest } from '../types/glucose';

//  CONFIGURACIÓN BASE
const API_BASE_URL = 'https://qa-api.habitsapi.com';


class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  // MÉTODO GENÉRICO PARA FETCH
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      console.log('🌐 API Request:', url, config);

      const response = await fetch(url, config);
      const data = await response.json();

      console.log('📡 API Response:', response.status, data);

      if (!response.ok) {
        // 🚨 MANEJAR ERRORES HTTP
        throw new ApiError(
          data.message || `HTTP Error ${response.status}`,
          response.status
        );
      }

      return data;
    } catch (error) {
      console.error('💥 API Error:', error);

      if (error instanceof ApiError) {
        throw error;
      }

      // ERRORES DE RED
      throw new ApiError(
        'Error de conexión. Verifica tu internet.',
        0
      );
    }
  }

  // MÉTODO ESPECÍFICO PARA LOGIN
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    return this.request<LoginResponse>('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // MÉTODO ESPECÍFICO PARA OBTENER DATOS DE GLUCOSA
  async getGlucoseData(userId: string, requestBody: GlucoseRequest): Promise<IGetGlucoseByUserResponse> {
    return this.request<IGetGlucoseByUserResponse>(`/api/glucose/getByUserAndDateRange?userId=${userId}`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });
  }
}

// INSTANCIA ÚNICA
export const apiService = new ApiService(API_BASE_URL);
