import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder, Client, AuthMiddlewareOptions, HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';

export const projectKey = process.env.REACT_APP_CTP_PROJECT_KEY || '';

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: process.env.REACT_APP_CTP_AUTH_URL || '',
  projectKey,
  credentials: {
    clientId: process.env.REACT_APP_CTP_CLIENT_ID || '',
    clientSecret: process.env.REACT_APP_CTP_CLIENT_SECRET || '',
  },
  scopes: [process.env.REACT_APP_CTP_SCOPES || ''],
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.REACT_APP_CTP_API_URL || '',
  fetch,
};

const client: Client =
  process.env.NODE_ENV === 'production'
    ? new ClientBuilder()
        .withClientCredentialsFlow(authMiddlewareOptions)
        .withHttpMiddleware(httpMiddlewareOptions)
        .build()
    : new ClientBuilder()
        .withClientCredentialsFlow(authMiddlewareOptions)
        .withHttpMiddleware(httpMiddlewareOptions)
        .withLoggerMiddleware()
        .build();

const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
export default apiRoot;

// export const getApiRoot: () => ApiRoot = () => {
//   return createApiBuilderFromCtpClient(client);
// };
