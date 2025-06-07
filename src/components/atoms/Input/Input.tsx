import React, { memo, forwardRef, useState, useCallback } from 'react';
import {
  TextInput,
  View,
  Text,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../../styles/colors';
import { styles } from './styles';


interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  showPasswordToggle?: boolean;
}
// 📝 COMPONENTE INPUT
const Input = memo(forwardRef<TextInput, InputProps>(({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  showPasswordToggle = false,
  secureTextEntry,
  style,
  ...textInputProps
}, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);
  const [isFocused, setIsFocused] = React.useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(prev => !prev);
  }, []);

  // ESTILOS DINÁMICOS
  const inputContainerStyle = [
    styles.inputContainer,
    isFocused && styles.inputContainerFocused,
    error && styles.inputContainerError,
  ];

  const inputStyle = [
    styles.input,
    leftIcon && styles.inputWithLeftIcon,
    (rightIcon || showPasswordToggle) && styles.inputWithRightIcon,
    style,
  ];

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={inputContainerStyle}>
        {leftIcon && (
          <Icon
            name={leftIcon}
            size={20}
            color={isFocused ? colors.primary : colors.gray400}
            style={styles.leftIcon}
          />
        )}

        <TextInput
          ref={ref}
          style={inputStyle}
          placeholderTextColor={colors.gray400}
          secureTextEntry={showPasswordToggle ? !isPasswordVisible : secureTextEntry}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...textInputProps}
        />

        {showPasswordToggle ? (
          <Icon
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={20}
            color={colors.gray400}
            style={styles.rightIcon}
            onPress={togglePasswordVisibility}
          />
        ) : rightIcon ? (
          <Icon
            name={rightIcon}
            size={20}
            color={colors.gray400}
            style={styles.rightIcon}
            onPress={onRightIconPress}
          />
        ) : null}
      </View>

      {/* ERROR MESSAGE */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}));

Input.displayName = 'Input';

export default Input;
