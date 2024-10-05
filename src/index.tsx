
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import { Store } from './createStore';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18n';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <Provider store={Store}>
    <GoogleOAuthProvider clientId='109113138013-tv5kg8bh40tub6lgqi1tpm5jofvn2dis.apps.googleusercontent.com' >

      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </GoogleOAuthProvider>


  </Provider>


);



