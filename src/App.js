// react
import { useState } from 'react';
// css
import './App.css';
// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/footer/Footer';
import AppContext from './components/AppContext';
// ----------------------------------------------------------------------

export default function App() {
  const [user, setUser] = useState({ fname: null, lName: null, email: null });
  const userSettings = {
    user,
    setUser
  };
  return (
    <ThemeConfig>
      <ScrollToTop />
      <AppContext.Provider value={userSettings}>
        <Router />
      </AppContext.Provider>
    </ThemeConfig>
  );
}
