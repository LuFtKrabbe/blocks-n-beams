import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  AuthMiddlewareOptions,
  Client,
  ClientBuilder,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
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

const getUserApiClient = ({ username, password }: UserAuthOptions): Client => {
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
      .withProjectKey(projectKey)
      .withPasswordFlow(passwordAuthMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
  }
};

let currentApiClient = getDefaultApiClient();

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
        currentApiClient = getUserApiClient(userCreds);
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

export { getDefaultApiClient, getAnonApiClient, getUserApiClient, currentApiClient };
export default getApiRoot;
