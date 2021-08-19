// scroll bar
import 'simplebar/src/simplebar.css';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

//
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import Footer from './components/footer/Footer';

// ----------------------------------------------------------------------
window.$groupConfig = [
  { name: 'Sports', type: 'column' },
  { name: 'Travel', type: 'area' },
  { name: 'Wellness', type: 'line' }
];
window.$serverURL = 'https://bala-spa-chat.azurewebsites.net/';
window.$socketURL = 'https://bala-spa-chat.azurewebsites.net/ws-chat/';

ReactDOM.render(
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>,
  document.getElementById('root')
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
