// Typefaces not yet selected — placeholders until Stage 1 font load is wired.
// Serif (Fraunces): wordmark, prompts, captions, section headlines.
// Sans (SF Pro / Inter): UI labels, buttons, meta, counts, nav.

export const fontFamily = {
  serif: undefined as string | undefined,      // e.g. 'Fraunces_400Regular'
  serifItalic: undefined as string | undefined, // e.g. 'Fraunces_400Regular_Italic'
  sans: undefined as string | undefined,        // system default until loaded
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
