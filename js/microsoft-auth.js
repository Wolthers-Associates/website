import { PublicClientApplication } from 'https://alcdn.msauth.net/browser/2.37.1/js/msal-browser.esm.min.js';

const msalConfig = {
  auth: {
    clientId: 'YOUR_CLIENT_ID',
    redirectUri: window.location.origin,
  }
};

const msalInstance = new PublicClientApplication(msalConfig);

export function login() {
  return msalInstance.loginPopup().then(response => {
    console.log('Microsoft login successful', response);
    return response;
  }).catch(err => {
    console.error('Microsoft login error', err);
    throw err;
  });
}

export function logout() {
  msalInstance.logoutPopup();
}

// Automatically prompt sign in when the module is loaded
login();
