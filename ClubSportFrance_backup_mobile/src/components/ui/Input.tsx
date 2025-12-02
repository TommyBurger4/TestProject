import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextInputProps,
  Platform,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { typography } from '../../theme/typography';
import { spacing, touchTargetSize, borderRadius } from '../../theme/spacing';

interface InputProps extends TextInputProps {
  // Label affiche au-dessus de l'input
  label?: string;
  // Message d'erreur (affiche en rouge sous l'input)
  error?: string;
  // Placeholder du champ
  placeholder?: string;
  // Valeur du champ
  value: string;
  // Fonction appelee lors du changement
  onChangeText: (text: string) => void;
  // Type de clavier
  keyboardType?: TextInputProps['keyboardType'];
  // Input pour mot de passe (cache le texte)
  secureTextEntry?: boolean;
  // Desactiver l'input
  disabled?: boolean;
  // Multiline pour textarea
  multiline?: boolean;
  // Nombre de lignes si multiline
  numberOfLines?: number;
  // Style personnalise du conteneur
  style?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  style,
  ...rest
}) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  // Determination de la couleur de bordure selon l'etat
  const getBorderColor = () => {
    if (error) return colors.error;
    if (isFocused) return colors.primary;
    return colors.border;
  };

  return (
    <View style={[styles.container, style]}>
      {/* Label */}
      {label && (
        <Text
          style={[styles.label, { color: error ? colors.error : '#000000' }]}
          accessible={true}
          accessibilityRole="text"
        >
          {label}
        </Text>
      )}

      {/* Input field */}
      <TextInput
        style={[
          styles.input,
          {
            borderColor: getBorderColor(),
            backgroundColor: disabled ? colors.disabled : '#FFFFFF',
            minHeight: Platform.select({
              ios: touchTargetSize.ios,
              android: touchTargetSize.android,
              default: touchTargetSize.ios,
            }),
          },
          multiline && { height: numberOfLines * 40, textAlignVertical: 'top' },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999999"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        editable={!disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : 1}
        accessible={true}
        accessibilityLabel={label || placeholder}
        accessibilityHint={error}
        accessibilityState={{ disabled }}
        {...rest}
      />

      {/* Error message */}
      {error && (
        <Text
          style={[styles.errorText, { color: colors.error }]}
          accessible={true}
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: spacing.xs,
    lineHeight: 21,
  },
  input: {
    borderWidth: 2,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    textAlignVertical: 'center',
    // minHeight defini dynamiquement pour respecter touch targets
  },
  errorText: {
    fontSize: typography.fontSize.xs,
    marginTop: spacing.xs,
    lineHeight: typography.lineHeight.normal,
  },
});
