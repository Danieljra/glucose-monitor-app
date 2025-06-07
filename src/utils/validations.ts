import * as yup from 'yup';

// SCHEMA PARA LOGIN
export const loginSchema = yup.object().shape({
  mail: yup
    .string()
    .required('El correo es requerido')
    .email('Ingresa un correo válido')
    .trim(),
  pass: yup
    .string()
    .required('La contraseña es requerida')
    .min(6, 'La contraseña debe tener mínimo 6 caracteres'),
});

// 🎯 TIPO PARA FORM DATA
export type LoginFormData = yup.InferType<typeof loginSchema>;
