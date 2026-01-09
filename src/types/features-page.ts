export interface ImageData {
  id: number;
  title: string;
  url: string;
  width?: number;
  height?: number;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
  image?: ImageData | null;
  order: number;
}

export interface Benefit {
  id: number;
  title: string;
  description: string;
  stats: string;
  icon: string;
  order: number;
  image?: ImageData;
}

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  company: string;
  photo: ImageData | null;
  order: number;
}

export interface ColorTheme {
  id: number;
  name: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  neutral_color: string;
  background_color: string;
  text_color: string;
}

export interface CardContent {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  card_style: "basic" | "feature" | "testimonial" | "pricing" | "team";
  card_image?: ImageData;
  background_image?: ImageData;
  button_text: string;
  button_url: string;
  price: string;
  price_period: string;
  features: string[];
  rating: number;
  order: number;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
  order: number;
}

export interface HowItWorksStep {
  step_number: string;
  title: string;
  description: string;
  icon?: string;
  image?: ImageData;
  getFullImageUrl: (url: string | { url: string } | undefined) => string;
}

export interface DynamicContentBlock {
  type: string;
  value: any;
  id: string;
}

export interface FeaturesPageData {
  id: number;
  title: string;
  slug: string;
  url: string;
  seo_title: string;
  search_description: string;
  live: boolean;
  locked: boolean;
  first_published_at: string | null;
  last_published_at: string | null;

  // Header Section
  header_line_before?: string;
  header_title: string;
  header_subtitle: string;
  header_description: string;
  header_image?: ImageData;
  header_video?: any;
  header_cta_text: string;
  header_cta_url: string;
  header_line_after_button?: string;

  // Problem/Solution Section
  problem_solution_heading?: string;
  problem_solution_introduction?: string;
  problem_solution_ending_note?: string;
  problem_solution_image?: ImageData;
  problem_solution_stream?: any[];
  problem_solution_background_image?: ImageData;

  // How It Works Section
  how_it_works_heading?: string;
  how_it_works_description?: string;
  how_it_works_ending_note?: string;
  how_it_works_steps?: HowItWorksStep[];
  how_it_works_section_icon?: string;
  how_it_works_section_image?: ImageData;
  how_it_works_section_background_image?: ImageData;

  // Benefits Section
  benefits_heading?: string;
  benefits_description?: string;
  benefits_ending_note?: string;
  benefits_style?: "cards" | "list" | "mixed";
  benefits?: any;
  benefits_section_icon?: string;
  benefits_section_image?: ImageData;
  benefits_section_background_image?: ImageData;

  // Card Sections
  card_sections_heading?: string;
  card_sections_description?: string;
  card_sections_introduction?: string;
  card_sections_ending_note?: string;
  card_sections?: CardContent[];
  card_sections_icon?: string;
  card_sections_image?: ImageData;
  card_sections_background_image?: ImageData;

  // FAQ Section
  faq_section_heading?: string;
  faq_section_description?: string;
  faq_section_ending_note?: string;
  faqs?: FAQItem[];
  faq_section_icon?: string;
  faq_section_image?: ImageData;
  faq_section_background_image?: ImageData;

  // Pricing Section
  pricing_heading?: string;
  pricing_description?: string;
  pricing_ending_note?: string;
  pricing_widget_code?: string;
  show_pricing_cta?: boolean;
  pricing_cta_text?: string;
  pricing_cta_url?: string;
  pricing_section_icon?: string;
  pricing_section_image?: ImageData;
  pricing_section_background_image?: ImageData;

  // Testimonials Section
  testimonials_heading?: string;
  testimonials_description?: string;
  testimonials_ending_note?: string;
  testimonials?: Testimonial[];
  testimonials_section_icon?: string;
  testimonials_section_image?: ImageData;
  testimonials_section_background_image?: ImageData;

  // Primary CTA Section
  primary_cta_sections?: any[];

  // Secondary CTA Section
  secondary_cta_heading?: string;
  secondary_cta_subheading?: string;
  secondary_cta_description?: string;
  secondary_cta_subdescription?: string;
  secondary_cta_buttons?: any[];

  // Features Overview
  features_intro_heading?: string;
  features_intro_description?: string;
  features_intro_introduction?: string;
  features_intro_ending_note?: string;
  features?: any;
  features_intro_icon?: string;
  features_intro_image?: ImageData;
  features_intro_background_image?: ImageData;

  // Feature Categories
  categories_heading?: string;
  categories_description?: string;
  categories_ending_note?: string;

  // Technical Specifications
  specifications_heading?: string;
  specifications_description?: string;
  specifications_ending_note?: string;
  specifications_section_icon?: string;
  specifications_section_image?: ImageData;
  specifications_section_background_image?: ImageData;

  // Video Section
  video_section_head?: string;
  video_section_introduction?: string;
  featured_video?: any;

  // Privacy Policy
  privacy_policy_heading?: string;
  privacy_policy_content?: any[];
  privacy_last_updated?: string;

  // Dynamic Content
  dynamic_content?: DynamicContentBlock[];

  // Theme & Config
  color_theme?: ColorTheme;
  header_config?: any;
  footer_config?: any;

  // Section Order
  section_order?: string[];

  // Meta
  meta_title?: string;
  meta_description?: string;
  og_image?: ImageData;

  // Frontend Configuration
  allowed_frontends?: Array<{
    id: number;
    name: string;
    url: string;
    is_active: boolean;
  }>;
}

export interface FeaturesPageProps {
  pageId?: number;
  slug?: string;
}

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  neutralColor: string;
  bgColor: string;
}
