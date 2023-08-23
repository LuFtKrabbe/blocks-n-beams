import {
  projectKey,
  FlowTypes,
  getDefaultApiClient,
  getAnonApiClient,
  getUserApiClient,
  changeApiClient,
  currentApiClient,
} from './Client';
import { makePersistentTokenCache } from './TokenCache';

test('The correct key is used for the project in production', () => {
  expect(projectKey).toBe('trp');
});

test('Flow types switcher works correctly', () => {
  const trialUserCreds = { username: 'John', password: 'JustJohn#1' };

  changeApiClient(FlowTypes.DEFAULT);
  expect(JSON.stringify(currentApiClient)).toBe(JSON.stringify(getDefaultApiClient()));

  changeApiClient(FlowTypes.ANONYMOUS);
  expect(JSON.stringify(currentApiClient)).toBe(JSON.stringify(getAnonApiClient()));

  changeApiClient(FlowTypes.PASSWORD);
  expect(JSON.stringify(currentApiClient)).toBe(JSON.stringify(getUserApiClient(trialUserCreds)));
});

test('Get ans set methods for tokenCache', () => {
  const current = {};
  const tokenKey = 'token';
  const newToken = { token: '123-456-789', expirationTime: 300 };
  makePersistentTokenCache(tokenKey).set(newToken);

  expect(localStorage.getItem(tokenKey)).toBe(JSON.stringify({ token: '123-456-789', expirationTime: 300 }));
  expect(JSON.stringify(makePersistentTokenCache(tokenKey).get())).toBe(JSON.stringify(current));
});
