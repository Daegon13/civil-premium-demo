export const tokens = {
  colors: {
    background: "#0F1318",
    surface: "#151B22",
    surfaceAlt: "#1B232D",
    line: "#2A3340",
    text: "#EAF0F7",
    muted: "#A0AAB8",
    accent: "#7FA4C8",
    accentStrong: "#99BEDF",
  },
  spacing: {
    sectionY: "clamp(4rem, 7vw, 7rem)",
    containerX: "clamp(1.25rem, 3vw, 2.5rem)",
    stackSm: "0.75rem",
    stackMd: "1.25rem",
    stackLg: "2rem",
  },
  radius: {
    sm: "0.5rem",
    md: "0.875rem",
    lg: "1.25rem",
  },
  shadows: {
    soft: "0 14px 40px -24px rgba(0, 0, 0, 0.55)",
  },
} as const;

export type DesignTokens = typeof tokens;
