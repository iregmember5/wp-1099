// API Cache with localStorage persistence
const cache = new Map<string, { data: any; timestamp: number }>();

export const getCached = <T>(key: string): T | null => {
  // Check memory cache first
  const cached = cache.get(key);
  if (cached) return cached.data as T;
  
  // Check localStorage
  try {
    const stored = localStorage.getItem(`cache_${key}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      cache.set(key, parsed);
      return parsed.data as T;
    }
  } catch (e) {}
  
  return null;
};

export const setCache = (key: string, data: any) => {
  const cacheData = { data, timestamp: Date.now() };
  cache.set(key, cacheData);
  try {
    localStorage.setItem(`cache_${key}`, JSON.stringify(cacheData));
  } catch (e) {}
};
