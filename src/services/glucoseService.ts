import { apiService } from './api';
import { IGetGlucoseByUserResponse, GetGlucoseParams } from '../types/glucose';


class GlucoseService {
  async getGlucoseByUserAndDateRange({ userId, date }: GetGlucoseParams): Promise<IGetGlucoseByUserResponse> {
    try {
      const response = await apiService.getGlucoseData(userId, { date });

      if (!response.success) {
        throw new Error(response.message || 'Error al obtener datos de glucosa');
      }

      if (!response.data) {
        throw new Error('Datos de glucosa no disponibles');
      }

      console.log('✅ Datos de glucosa obtenidos exitosamente');
      return response;

    } catch (error: any) {
      console.error('❌ Error obteniendo datos de glucosa:', error.message);

      // MAPEO DE ERRORES ESPECÍFICOS
      if (error.status === 404) {
        throw new Error('No se encontraron datos para la fecha seleccionada');
      }

      if (error.status === 400) {
        throw new Error('Parámetros inválidos en la petición');
      }

      if (error.status >= 500) {
        throw new Error('Error del servidor. Intenta más tarde.');
      }

      throw error;
    }
  }
}

export const glucoseService = new GlucoseService();
