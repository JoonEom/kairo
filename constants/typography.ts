export const fontFamily = {
  serif: 'Fraunces_400Regular',
  serifItalic: 'Fraunces_400Regular_Italic',
  sans: undefined as string | undefined,
} as const;

export const fontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  xxl: 32,
  wordmark: 36,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 14,
  base: 16,
  lg: 20,
  xl: 24,
} as const;

export const radius = {
  card: 14,
  photo: 8,
  button: 12,
  input: 10,
} as const;
