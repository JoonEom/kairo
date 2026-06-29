export const colors = {
  background: '#F7F3EA',    // warm bone — app background
  surface: '#FBF8F1',       // slightly lighter — cards, tab bar
  surfaceWhite: '#FFFFFF',  // postcard front frame

  text: {
    primary: '#26241F',     // warm espresso near-black — headings, buttons
    secondary: '#7A7363',   // muted brown — captions, body
    tertiary: '#9C9484',    // light taupe — meta, labels, hints
    placeholder: '#B5AD9C', // lightest — placeholders, counts
  },

  border: '#E4DCC9',        // warm hairline — dividers, card borders

  // No accent color. Photos provide all color. Revisit after Stage 4.
} as const;
