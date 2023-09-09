import { AbstractControl } from '@angular/forms';

/**
 * Custom function to generate password
 * @param number length 
 * @returns string
 */
export function generatePassword(length: number = 12): string {
  const getRandomChar = (str: string) =>
    str[Math.floor(Math.random() * str.length)];

  const categories = [
    'abcdefghijklmnopqrstuvwxyz',
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    '0123456789',
    '!@#$%&*()<>?',
  ];

  let password = categories.map(getRandomChar).join('');

  const allCharacters = categories.join('');

  while (password.length < length) {
    password += getRandomChar(allCharacters);
  }

  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
}

/**
 * Password confirmation validator
 * @param AbstractControl control 
 * @returns 
 */
export function passwordConfirmationValidator(
  control: AbstractControl,
): { [key: string]: boolean } | null {
  const passwordControl = control.get('password');
  const confirmPasswordControl = control.get('password_confirmation');

  if (
    passwordControl &&
    confirmPasswordControl &&
    passwordControl.value !== confirmPasswordControl.value
  ) {
    return { passwordMismatch: true };
  }
  return null;
}
