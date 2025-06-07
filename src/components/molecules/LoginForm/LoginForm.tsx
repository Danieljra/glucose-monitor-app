import { memo } from 'react';
import { View, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import { useAuth } from '../../../hooks/useAuth';
import { loginSchema, LoginFormData } from '../../../utils/validations';
import { styles } from './styles';

const LoginForm = memo(() => {
  const { login, isLoading } = useAuth();

  // CONFIGURACION DE REACT-HOOK-FORM
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur', // Valida cuando el usuario sale del campo
    defaultValues: {
      mail: '',
      pass: '',
    },
  });

  // MANEJO EL SUBMIT
  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      // El usuario será redirigido automáticamente por la navegación
    } catch (err: any) {
      Alert.alert(
        'Error de autenticación',
        err.message || 'Credenciales incorrectas',
        [{ text: 'OK' }]
      );
    }
  };

  // FUNCIÓN PARA LLENAR CREDENCIALES DE PRUEBA
  const fillTestCredentials = () => {
    reset({
      mail: 'postulante@prueba.com',
      pass: 'Aa123456.',
    });
  };

  return (
    <View style={styles.container}>
      {/* 📧 CAMPO EMAIL */}
      <Controller
        control={control}
        name="mail"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Correo electrónico"
            placeholder="Ingresa tu correo"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.mail?.message}
            leftIcon="mail"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        )}
      />

      {/* 🔒 CAMPO PASSWORD */}
      <Controller
        control={control}
        name="pass"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.pass?.message}
            leftIcon="lock"
            secureTextEntry
            showPasswordToggle
          />
        )}
      />

      {/* 🔘 BOTÓN LOGIN */}
      <Button
        title="Iniciar Sesión"
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
        disabled={!isValid || isLoading}
        variant="primary"
        size="large"
        fullWidth
        style={styles.loginButton}
      />

      {/* 🧪 BOTÓN CREDENCIALES DE PRUEBA (Solo para desarrollo) */}
      <Button
        title="Usar credenciales de prueba"
        onPress={fillTestCredentials}
        variant="outline"
        size="medium"
        fullWidth
        style={styles.testButton}
      />
    </View>
  );
});

LoginForm.displayName = 'LoginForm';

export default LoginForm;
