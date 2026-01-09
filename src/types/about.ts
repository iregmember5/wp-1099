import type {
  ImageData,
  ColorTheme,
  HeaderConfig,
  FooterConfig,
} from "./landing";

export interface TeamMember {
  id: number;
  name: string;
  photo: ImageData | null;
  position: string;
  bio: string;
  email: string;
  phone: string;
  linkedin_url: string;
  twitter_url: string;
  order: number;
}

export interface Value {
  icon?: string;
  title?: string;
  description?: string;
}

export interface Milestone {
  year?: string;
  event?: string;
  description?: string;
}

export interface Widget {
  id: number;
  name: string;
  embed_code: string;
  is_active: boolean;
}

export interface AboutPageData {
  id: number;
  title: string;
  slug: string;
  intro: string;
  body: string;
  mission_statement: string;
  values: Array<{ type: string; value: Value }>;
  team_members: TeamMember[];
  history_milestones: Array<{ type: string; value: Milestone }>;
  featured_image: ImageData | null;
  gallery: Array<{ type: string; value: ImageData }>;
  contact_blurb: string;
  contact_email: string;
  contact_phone: string;
  header_config: HeaderConfig | null;
  footer_config: FooterConfig | null;
  color_theme: ColorTheme | null;
  contact_widget: Widget | null;
  helpdesk_widget: Widget | null;
  w9form_widget: Widget | null;
  meta: {
    favicon: ImageData | null;
    site_title: string;
    meta_title: string;
    meta_description: string;
    og_image: ImageData | null;
  };
}

export interface AboutPageApiResponse {
  meta: {
    total_count: number;
  };
  items: AboutPageData[];
}
