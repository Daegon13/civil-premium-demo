export const tokens = {
  colors: {
    background: "#E6EBEF",
    surface: "#F4F7FA",
    surfaceAlt: "#DDE4EB",
    line: "#A8B5C2",
    lineStrong: "#6E8194",
    text: "#1E2A36",
    muted: "#4F6072",
    accent: "#2F648F",
    accentStrong: "#1F4667",
    accentContrast: "#F3F8FC",
  },
  spacing: {
    sectionY: "clamp(4.5rem, 7.4vw, 7.5rem)",
    sectionYCompact: "clamp(3.5rem, 6vw, 5.25rem)",
    containerX: "clamp(1.25rem, 3vw, 2.5rem)",
    stackXs: "0.5rem",
    stackSm: "0.875rem",
    stackMd: "1.375rem",
    stackLg: "2.125rem",
    stackXl: "3.25rem",
  },
  radius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
  },
  shadows: {
    card: "0 20px 36px -28px rgba(24, 40, 58, 0.36)",
    panel: "0 28px 42px -32px rgba(27, 44, 63, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.78)",
    cta: "0 22px 44px -26px rgba(18, 46, 74, 0.36)",
  },
} as const;

export const tokenUsageRules = {
  hero: {
    intent: "Apertura técnica: máximo contraste en titulares y señales de precisión.",
    background: "base background + gradiente estructural en site-shell",
    eyebrow: "accentStrong",
    ctaPrimary: "accent con texto accentContrast",
    ctaSecondary: "surfaceAlt + lineStrong",
  },
  cards: {
    intent: "Módulos comparables con lectura rápida de alcance y entregable.",
    container: "surface/surfaceAlt con borde line",
    hover: "lineStrong + elevación card",
    metadata: "accentStrong para índices, fases y outcomes",
  },
  sections: {
    intent: "Ritmo vertical consistente, alternando bloques base y enfatizados.",
    standardSpacing: "sectionY",
    compactSpacing: "sectionYCompact",
    divider: "line",
  },
  cta: {
    intent: "Cierre con carácter ejecutivo y foco de conversión.",
    panel: "surface con borde lineStrong y sombra cta",
    primary: "accent/accentStrong",
    ghost: "fondo transparente + lineStrong",
  },
} as const;

export type DesignTokens = typeof tokens;
