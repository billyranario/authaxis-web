import { AbstractControl } from '@angular/forms';

export const CodeEditorConfig = {
  theme: 'vs-dark',
  options: {
    contextmenu: true,
    minimap: {
      enabled: false,
    },
  },
  dependencies: ['@types/node', '@ngstack/translate', '@ngstack/code-editor'],
};

export function JSONValidator(
  control: AbstractControl,
): { [key: string]: any } | null {
  try {
    JSON.parse(control.value);
    return null;
  } catch (e) {
    return { invalidJson: true };
  }
}
