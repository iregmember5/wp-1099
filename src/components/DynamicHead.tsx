import { useEffect } from 'react';
import { useSiteSettings } from '../contexts/SiteSettingsContext';

export const DynamicHead: React.FC = () => {
  const { settings, loading } = useSiteSettings();

  useEffect(() => {
    if (loading) return;

    // Update favicon
    if (settings.favicon) {
      const existingFavicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      if (existingFavicon) {
        existingFavicon.href = settings.favicon;
      } else {
        const newFavicon = document.createElement('link');
        newFavicon.rel = 'icon';
        newFavicon.type = 'image/png';
        newFavicon.href = settings.favicon;
        document.head.appendChild(newFavicon);
      }
    }

    // Update title
    if (settings.siteTitle) {
      document.title = settings.siteTitle;
    }
  }, [settings, loading]);

  return null; // This component doesn't render anything
};