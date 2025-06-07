import React, { memo } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { styles } from './styles';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'large';
}

const LoadingSpinner = memo(({
  message = 'Cargando...',
  size = 'large',
}: LoadingSpinnerProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color="#0082CE" />
      {message && (
        <Text style={styles.message}>{message}</Text>
      )}
    </View>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';
export default LoadingSpinner;
