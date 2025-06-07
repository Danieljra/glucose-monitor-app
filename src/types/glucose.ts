// Interfaz para los datos de glucosa individuales
type GlucoseData =  {
  source: string;
  date: string;
  dateUnix: number;
  value: number;
  historic: boolean;
  isSpike: boolean;
  averaged: boolean;
  isPickLow: boolean;
}

// Interfaz para los datos de score
type ScoreData = {
  source: string;
  date: string;
  unixDate: number;
  value: number;
}

// Interfaz para el objeto data principal
type GlucoseResponseData = {
  spikes: GlucoseData[];
  isPickLow: GlucoseData[];
  data: GlucoseData[];
  glucoseSources: string[];
  glucoseSourceChoosed: string;
  score: ScoreData[];
  events: any[]; // Array vacío, puedes especificar el tipo si conoces su estructura
  timezone: string;
  maxGlucose: number;
}

// Interfaz para el objeto global de internacionalización
type GlobalI18n = {
  es: string;
}

// Interfaz principal para toda la respuesta del endpoint
export interface IGetGlucoseByUserResponse {
  code: number;
  message: string;
  success: boolean;
  data: GlucoseResponseData;
  i18n: string;
  global: GlobalI18n;
}

// 📋 TIPOS PARA PETICIONES
export interface GlucoseRequest {
  date: string;
}

export interface GetGlucoseParams {
  userId: string;
  date: string;
}
