import { TokenCache, TokenStore, TokenCacheOptions } from '@commercetools/sdk-client-v2';

export function makePersistentTokenCache(tokenKey: string): TokenCache {
  let current: TokenStore | Record<string, never> = {};

  return {
    get: (tokenCacheOptions?: TokenCacheOptions) => {
      if (current) {
        return current as TokenStore;
      }
      const storedValue = localStorage.getItem(tokenKey);
      if (storedValue) {
        const parsed = JSON.parse(storedValue) as TokenStore;
        if ('expirationTime' in parsed && parsed.expirationTime >= Date.now()) {
          current = parsed;
        } else {
          localStorage.removeItem(tokenKey);
          current = {};
        }
        return current as TokenStore;
      }
      return {} as TokenStore;
    },
    set: (newValue: TokenStore, tokenCacheOptions?: TokenCacheOptions) => {
      current = newValue;
      localStorage.setItem(tokenKey, JSON.stringify(current));
    },
  };
}
