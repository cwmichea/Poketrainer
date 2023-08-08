import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { PokeContextProvider } from './components/PokeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider
    domain="dev-idkiwmz2fj2qemqs.us.auth0.com"
    clientId="qWImDjVQ5f05i0GDh2c4OpJhWcWoBfxX"
    redirectUri={window.location.origin}
    onRedirectCallback={(appState) => {
      // Handle the redirect after authentication (if needed)
    }}>
      <PokeContextProvider>
        <App />
      </PokeContextProvider>
    </Auth0Provider>
);


