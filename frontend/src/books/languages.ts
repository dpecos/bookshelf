export const languages = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
];

export function getLanguage(key: string): string | undefined {
  return languages.find((lang) => lang.value === key)?.label;
}
