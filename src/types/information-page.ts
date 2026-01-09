export interface ImageData {
  id: number;
  title: string;
  url: string;
  width?: number;
  height?: number;
}

export interface QuickFeature {
  title: string;
  description: string;
  icon: ImageData | null;
}

export interface KeyFeature {
  title: string;
  description: string;
  icon: ImageData | null;
}

export interface ColorTheme {
  id: number;
  name: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
}

export interface HeaderConfig {
  id: number;
  name: string;
  logo: ImageData | null;
  navigation_items: any[];
  is_active: boolean;
}

export interface FooterConfig {
  id: number;
  name: string;
  content: any[];
  is_active: boolean;
}

export interface DynamicContentBlock {
  type: string;
  value: any;
  id: string;
}

export interface InformationPageData {
  id: number;
  title: string;
  slug: string;
  module_name: string;
  module_slug: string;
  
  // Hero Section
  hero: {
    title: string;
    subtitle: string;
    image: ImageData | null;
  };
  
  // Features
  quick_features: QuickFeature[];
  key_features: KeyFeature[];
  
  // CTA
  cta: {
    text: string;
    link: string;
  };
  
  // Dynamic Content
  dynamic_content: DynamicContentBlock[];
  
  // Configuration
  header_config: HeaderConfig | null;
  footer_config: FooterConfig | null;
  color_theme: ColorTheme | null;
  
  // Status
  is_active: boolean;
  
  // Meta
  meta: {
    favicon: ImageData | null;
    site_title: string;
    meta_title: string;
    meta_description: string;
    og_image: ImageData | null;
  };
}

export interface InformationPageProps {
  pageId?: number;
  slug?: string;
  moduleSlug?: string;
}