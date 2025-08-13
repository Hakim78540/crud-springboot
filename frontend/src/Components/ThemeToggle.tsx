import React, { useEffect, useState } from "react";
import { getTheme, setTheme, Theme } from "../theme";

const ThemeToggle: React.FC = () => {
  const [theme, setState] = useState<Theme>(() => getTheme());
  useEffect(() => setTheme(theme), [theme]);

  const toggle = () => setState(t => (t === "light" ? "dark" : "light"));

  return (
    <button onClick={toggle} className="btn btn-outline-secondary" title="Basculer le thème">
      {theme === "dark"
        ? <><i className="bi bi-sun me-1" /> Clair</>
        : <><i className="bi bi-moon-stars me-1" /> Sombre</>}
    </button>
  );
};

export default ThemeToggle;
