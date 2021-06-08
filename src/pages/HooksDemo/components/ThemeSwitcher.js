import { Button } from 'react-bootstrap';
import {
  useTheme,
  DARK_THEME,
  LIGHT_THEME,
} from '../../../contexts/ThemeContext';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <p>
        Current theme: <b>{theme}</b>
      </p>
      <Button variant="outline-danger" onClick={() => setTheme(DARK_THEME)}>
        Dark theme
      </Button>
      <Button variant="outline-primary" onClick={() => setTheme(LIGHT_THEME)}>
        Light theme
      </Button>
    </div>
  );
}
