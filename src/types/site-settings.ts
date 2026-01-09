export interface Widget {
  type: string;
  data: {
    id: number;
    name: string;
    embed_code: string;
    is_active: boolean;
  };
}

export interface SiteSettings {
  favicon?: string;
  siteTitle?: string;
  widgets?: Widget[];
}

export interface SiteSettingsResponse {
  favicon?: {
    url: string;
    alt?: string;
  };
  site_title?: string;
  widgets?: Widget[];
}