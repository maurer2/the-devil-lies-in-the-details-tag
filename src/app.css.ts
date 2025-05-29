import { style } from "@vanilla-extract/css";

export const wrapper = style({
  marginInline: "auto",
  width: "min(100vw, 1024px)",
  minHeight: "100svh",
  padding: "1rem",
  backgroundColor: "var(--color-secondary)",
  color: "var(--color-primary)",
});
