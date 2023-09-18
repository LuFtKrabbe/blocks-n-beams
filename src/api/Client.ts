import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  AuthMiddlewareOptions,
  Client,
  ClientBuilder,
  ExistingTokenMiddlewareOptions,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
  TokenStore,
  UserAuthOptions,
} from '@commercetools/sdk-client-v2';

import { makePersistentTokenCache } from './TokenCache';

export enum FlowTypes {
  ANONYMOUS = 'ANONYMOUS',
  PASSWORD = 'PASSWORD',
  DEFAULT = 'DEFAULT',
}

export const projectKey = process.env.REACT_APP_CTP_PROJECT_KEY || '';

const tokenKey = window.btoa(`${projectKey}-defClient`);
const basicAuthMiddlewareOptions: AuthMiddlewareOptions = {
  host: process.env.REACT_APP_CTP_AUTH_URL || '',
  projectKey,
  credentials: {
    clientId: process.env.REACT_APP_CTP_CLIENT_ID || '',
    clientSecret: process.env.REACT_APP_CTP_CLIENT_SECRET || '',
  },
  tokenCache: makePersistentTokenCache(tokenKey),
  scopes: [process.env.REACT_APP_CTP_SCOPES || ''],
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.REACT_APP_CTP_API_URL || '',
  fetch,
};

const getDefaultApiClient = (): Client => {
  if (process.env.NODE_ENV === 'production') {
    return new ClientBuilder()
      .withProjectKey(projectKey)
      .withClientCredentialsFlow(basicAuthMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .build();
  } else {
    return new ClientBuilder()
      .withProjectKey(projectKey)
      .withClientCredentialsFlow(basicAuthMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
  }
};

const getAnonApiClient = (): Client => {
  const tokenKey = window.btoa(`${projectKey}-anonClient`);
  if (process.env.NODE_ENV === 'production') {
    return new ClientBuilder()
      .withProjectKey(projectKey)
      .withAnonymousSessionFlow({ ...basicAuthMiddlewareOptions, tokenCache: makePersistentTokenCache(tokenKey) })
      .withHttpMiddleware(httpMiddlewareOptions)
      .build();
  } else {
    return new ClientBuilder()
      .withProjectKey(projectKey)
      .withAnonymousSessionFlow({ ...basicAuthMiddlewareOptions, tokenCache: makePersistentTokenCache(tokenKey) })
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
  }
};

const getUserApiClientByPassword = ({ username, password }: UserAuthOptions): Client => {
  const tokenKey = window.btoa(`${projectKey}-userClient`);

  const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: process.env.REACT_APP_CTP_AUTH_URL || '',
    projectKey,
    credentials: {
      clientId: process.env.REACT_APP_CTP_CLIENT_ID || '',
      clientSecret: process.env.REACT_APP_CTP_CLIENT_SECRET || '',
      user: {
        username,
        password,
      },
    },
    tokenCache: makePersistentTokenCache(tokenKey),
    scopes: [process.env.REACT_APP_CTP_SCOPES || ''],
    fetch,
  };

  if (process.env.NODE_ENV === 'production') {
    return new ClientBuilder()
      .withProjectKey(projectKey)
      .withPasswordFlow(passwordAuthMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .build();
  } else {
    return new ClientBuilder()
      .withHttpMiddleware(httpMiddlewareOptions)
      .withProjectKey(projectKey)
      .withPasswordFlow(passwordAuthMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
  }
};

const getUserApiClientByExistingToken = (): Client => {
  const tokenKey = window.btoa(`${projectKey}-userClient`);

  const existingTokenMiddlewareOptions: ExistingTokenMiddlewareOptions = {
    force: true,
  };
  const storedValue = localStorage.getItem(tokenKey) || '';
  const parsed = JSON.parse(storedValue) as TokenStore;

  if (Date.now() > parsed.expirationTime) {
    console.log('OUTDATED');

    const refreshAuthMiddlewareOptions: RefreshAuthMiddlewareOptions = {
      host: process.env.REACT_APP_CTP_AUTH_URL || '',
      projectKey,
      credentials: {
        clientId: process.env.REACT_APP_CTP_CLIENT_ID || '',
        clientSecret: process.env.REACT_APP_CTP_CLIENT_SECRET || '',
      },
      refreshToken: parsed.refreshToken || '',
      tokenCache: makePersistentTokenCache(tokenKey),
      fetch,
    };

    return new ClientBuilder()
      .withHttpMiddleware(httpMiddlewareOptions)
      .withProjectKey(projectKey)
      .withRefreshTokenFlow(refreshAuthMiddlewareOptions)
      .build();
  }

  if (process.env.NODE_ENV === 'production') {
    return new ClientBuilder()
      .withHttpMiddleware(httpMiddlewareOptions)
      .withProjectKey(projectKey)
      .withExistingTokenFlow(`Bearer ${parsed.token}`, existingTokenMiddlewareOptions)
      .build();
  } else {
    return new ClientBuilder()
      .withHttpMiddleware(httpMiddlewareOptions)
      .withProjectKey(projectKey)
      .withExistingTokenFlow(`Bearer ${parsed.token}`, existingTokenMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
  }
};

const getInitialApiClient = () => {
  const customerIsLoggedIn = localStorage.getItem(window.btoa(`${projectKey}-userClient`)) ? true : false;
  if (customerIsLoggedIn) {
    return getUserApiClientByExistingToken();
  } else {
    return getDefaultApiClient();
  }
};

let currentApiClient = getInitialApiClient();

export const changeApiClient = (flowType?: string, userCreds?: UserAuthOptions): void => {
  switch (flowType) {
    case FlowTypes.DEFAULT:
      currentApiClient = getDefaultApiClient();
      break;
    case FlowTypes.ANONYMOUS:
      currentApiClient = getAnonApiClient();
      break;
    case FlowTypes.PASSWORD:
      if (userCreds) {
        currentApiClient = getUserApiClientByPassword(userCreds);
      }
      break;

    default:
      currentApiClient = getDefaultApiClient();
      break;
  }
};

const getApiRoot = () => {
  return createApiBuilderFromCtpClient(currentApiClient).withProjectKey({ projectKey });
};

export { getDefaultApiClient, getAnonApiClient, getUserApiClientByPassword, currentApiClient };
export default getApiRoot;
