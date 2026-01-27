import React, { createContext, useContext, useEffect, useState } from "react";
import type {
  SiteSettings,
  SiteSettingsResponse,
} from "../types/site-settings";
import { getApiUrl, API_CONFIG } from "../config/api";

interface SiteSettingsContextType {
  settings: SiteSettings;
  loading: boolean;
  error: string | null;
}

const SiteSettingsContext = createContext<SiteSettingsContextType>({
  settings: {},
  loading: true,
  error: null,
});

export const useSiteSettings = () => useContext(SiteSettingsContext);

interface SiteSettingsProviderProps {
  children: React.ReactNode;
}

export const SiteSettingsProvider: React.FC<SiteSettingsProviderProps> = ({
  children,
}) => {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const response = await fetch(
          getApiUrl(API_CONFIG.ENDPOINTS.SITE_SETTINGS)
        );
        if (!response.ok) {
          throw new Error("Failed to fetch site settings");
        }
        const data: SiteSettingsResponse = await response.json();

        // Transform API response to our internal format
        const transformedSettings: SiteSettings = {
          siteTitle: data.site_title || "notary-app",
          favicon: data.favicon?.url ? getApiUrl(data.favicon.url) : "/vite.svg",
          widgets: data.widgets || [],
        };

        setSettings(transformedSettings);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        // Fallback to default values
        setSettings({
          siteTitle: "notary-app",
          favicon: "/vite.svg",
          widgets: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSiteSettings();
  }, []);

  return (
    <SiteSettingsContext.Provider value={{ settings, loading, error }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};
