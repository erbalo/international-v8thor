/* eslint-disable @typescript-eslint/no-explicit-any */
import MemoryCache from 'memory-cache';

export default class CacheStrategy {
    static put(key: string, value: any) {
        MemoryCache.put(key, value);
    }

    static get(key: string): any {
        return MemoryCache.get(key);
    }

    static keys(): any[] {
        return MemoryCache.keys();
    }
}
