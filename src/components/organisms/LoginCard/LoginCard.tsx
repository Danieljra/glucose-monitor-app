import  { memo } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LoginForm from '../../molecules/LoginForm/LoginForm';
import { styles } from './styles';
import { colors } from '../../../styles/colors';

const LoginCard = memo(() => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Icon name="user" size={32} color={colors.primary} />
        </View>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>
          Inicia sesión para continuar
        </Text>
      </View>

      <LoginForm />
    </View>
  );
});

LoginCard.displayName = 'LoginCard';

export default LoginCard;
