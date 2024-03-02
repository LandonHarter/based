export function createCache<T>() {
    const cache = new Map<string, T>();
    return {
        add: (key: string, value: T) => {
            cache.set(key, value);
        },
        get: (key: string) => {
            return cache.get(key);
        },
        remove: (key: string) => {
            cache.delete(key);
        },
        clear: () => {
            cache.clear();
        },
    };
}

export type CacheOptions = {
    enabled: boolean;
    forceRefresh: boolean;
};

export const defaultCacheOptions: CacheOptions = {
    enabled: true,
    forceRefresh: false,
};