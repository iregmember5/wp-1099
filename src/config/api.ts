export const API_CONFIG = {
  // Update this to match your Wagtail backend URL
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://esign-admin.signmary.com',
  ENDPOINTS: {
    SITE_SETTINGS: '/api/v2/site-settings/',
    PAGES: '/api/v2/pages/',
  }
};

export const getApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};