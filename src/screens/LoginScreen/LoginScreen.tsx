import React, { memo, useEffect } from 'react';
import { Alert } from 'react-native';
import AuthTemplate from '../../components/templates/AuthTemplate/AuthTemplate';
import LoginCard from '../../components/organisms/LoginCard/LoginCard';
import { useAuth } from '../../hooks/useAuth';

const LoginScreen: React.FC = memo(() => {
  const { error, clearError } = useAuth();

  useEffect(() => {
    if (error) {
      Alert.alert(
        'Error',
        error,
        [
          {
            text: 'OK',
            onPress: clearError,
          },
        ]
      );
    }
  }, [error, clearError]);

  return (
    <AuthTemplate>
      <LoginCard />
    </AuthTemplate>
  );
});

LoginScreen.displayName = 'LoginScreen';

export default LoginScreen;
