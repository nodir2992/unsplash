//  REACT ICONS
import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const THEME_LIGHT = "emerald"; // light || emerald
const THEME_DARK = "dim"; // dark || dim

const setDataTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
};

const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem("theme") ?? THEME_LIGHT;
  setDataTheme(theme);
  return theme;
};

function ThemeSwitcher() {
  const [theme, setTheme] = useState(getThemeFromLocalStorage);

  const changeTheme = () => {
    const newTheme = theme == THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
    setDataTheme(newTheme);
    setTheme(newTheme);
  };

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        onChange={changeTheme}
        checked={theme === THEME_LIGHT}
      />
      <FaSun className="swap-off fill-current" size={22} />
      <FaMoon className="swap-on fill-current" size={22} />
    </label>
  );
}

export default ThemeSwitcher;
