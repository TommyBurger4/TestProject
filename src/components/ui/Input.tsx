/**
 * Composant Input reutilisable
 *
 * Input avec label, erreur, et differents types
 */

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  className = '',
  ...props
}) => {
  // Classes de base
  const baseClasses =
    'px-4 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary';

  // Classes d'erreur
  const errorClasses = error
    ? 'border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:border-primary';

  // Classe full width
  const widthClass = fullWidth ? 'w-full' : '';

  // Combiner toutes les classes
  const allClasses = `${baseClasses} ${errorClasses} ${widthClass} ${className}`;

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1 whitespace-normal">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <input className={allClasses} {...props} />

      {error && (
        <p className="mt-1 text-sm text-red-500 whitespace-normal">{error}</p>
      )}

      {!error && helperText && (
        <p className="mt-1 text-sm text-gray-500 whitespace-normal">{helperText}</p>
      )}
    </div>
  );
};
