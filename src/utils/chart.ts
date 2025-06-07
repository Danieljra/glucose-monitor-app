// 🎨 FUNCIÓN PARA OBTENER COLOR SEGÚN VALOR DE GLUCOSA
export const getGlucoseColor = (value: number): string => {
  if (value < 85) {return '#FF4444';} // Rojo - Bajo
  if (value <= 110) {return '#0082CE';} // Celeste - Normal
  return '#FFB800'; // Amarillo - Alto
};
