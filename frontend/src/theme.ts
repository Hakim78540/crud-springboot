export type Theme = "light" | "dark";

const THEMES: Record<Theme, string> = {
  light: "https://cdn.jsdelivr.net/npm/bootswatch@5.3.3/dist/flatly/bootstrap.min.css",
  dark:  "https://cdn.jsdelivr.net/npm/bootswatch@5.3.3/dist/darkly/bootstrap.min.css",
};

export function setTheme(theme: Theme) {
  localStorage.setItem("theme", theme);
  const link = document.getElementById("theme-css") as HTMLLinkElement | null;
  if (link) link.href = THEMES[theme];
  // Optionnel mais utile pour quelques composants Bootstrap 5.3
  document.documentElement.setAttribute("data-bs-theme", theme);
}

export function initTheme() {
  const saved = (localStorage.getItem("theme") as Theme | null);
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
  setTheme(saved ?? (prefersDark ? "dark" : "light"));
}

export function getTheme(): Theme {
  return (localStorage.getItem("theme") as Theme) ?? "light";
}
