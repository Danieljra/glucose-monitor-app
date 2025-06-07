import { StyleSheet } from 'react-native';
import { spacing } from '../../../styles/spacing';
import { colors } from '../../../styles/colors';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  small: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    minHeight: 32,
  },
  medium: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    minHeight: 44,
  },
  large: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.base,
    minHeight: 52,
  },

  // VARIANTES
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },

  fullWidth: {
    width: '100%',
  },

  disabled: {
    opacity: 0.6,
  },

  text: {
    fontWeight: typography.weights.semibold,
    textAlign: 'center',
  },

  text_primary: {
    color: colors.white,
  },
  text_secondary: {
    color: colors.white,
  },
  text_outline: {
    color: colors.primary,
  },

  text_small: {
    fontSize: typography.sizes.sm,
  },
  text_medium: {
    fontSize: typography.sizes.base,
  },
  text_large: {
    fontSize: typography.sizes.lg,
  },

  // 📝 TEXTO DESHABILITADO
  textDisabled: {
    opacity: 0.8,
  },
});
