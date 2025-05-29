import { globalStyle } from "@vanilla-extract/css";

globalStyle(":root", {
  vars: {
    "--color-primary": "black",
    "--color-secondary": "white",
  },
});

globalStyle("html", {
  background: "var(--color-primary)",
  color: "var(--color-secondary)",
});

globalStyle("body", {
  minHeight: ["100vh", "100dvh"],
});
