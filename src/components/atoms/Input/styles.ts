import { StyleSheet } from 'react-native';
import { spacing } from '../../../styles/spacing';
import { typography } from '../../../styles/typography';
import { colors } from '../../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.base,
  },

  label: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.secondary,
    marginBottom: spacing.xs,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.gray300,
    borderRadius: 8,
    backgroundColor: colors.white,
  },

  inputContainerFocused: {
    borderColor: colors.primary,
  },

  inputContainerError: {
    borderColor: colors.error,
  },

  input: {
    flex: 1,
    fontSize: typography.sizes.base,
    color: colors.secondary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.base,
  },

  inputWithLeftIcon: {
    paddingLeft: spacing.xs,
  },

  inputWithRightIcon: {
    paddingRight: spacing.xs,
  },

  leftIcon: {
    marginLeft: spacing.sm,
  },

  rightIcon: {
    marginRight: spacing.sm,
    padding: spacing.xs,
  },

  errorText: {
    fontSize: typography.sizes.sm,
    color: colors.error,
    marginTop: spacing.xs,
  },
});
