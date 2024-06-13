import { useSelector } from "react-redux";
import PropTypes from "prop-types";

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className="dark:bg-dark-background dark:text-dark-text bg-light-background text-light-text min-h-screen">
        {children}
      </div>
    </div>
  );
}
