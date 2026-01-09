import React from "react";
import {
  type FeaturesPageData,
  type Theme,
} from "../../../types/features-page";
import { BulkWhatsAppHeader } from "./bulk-whatsapp/BulkWhatsAppHeader";
import { BulkWhatsAppFeatures } from "./bulk-whatsapp/BulkWhatsAppFeatures";
import { BulkWhatsAppHowItWorks } from "./bulk-whatsapp/BulkWhatsAppHowItWorks";
import { BulkWhatsAppBenefits } from "./bulk-whatsapp/BulkWhatsAppBenefits";
import { BulkWhatsAppFAQ } from "./bulk-whatsapp/BulkWhatsAppFAQ";
import { DynamicContentRenderer } from "../dynamic-content/DynamicContentRenderer";
import { BulkWhatsAppCTA } from "./bulk-whatsapp/BulkWhatsAppCTA";
interface LayoutProps {
  data: FeaturesPageData;
  theme: Theme;
}

export const BulkWhatsAppLayout: React.FC<LayoutProps> = ({ data, theme }) => (
  <>
    <BulkWhatsAppHeader data={data} />
    {data.features && data.features.length > 0 && (
      <BulkWhatsAppFeatures
        features={data.features}
        heading={data.features_intro_heading}
        description={data.features_intro_description}
      />
    )}
    {data.how_it_works_steps && data.how_it_works_steps.length > 0 && (
      <BulkWhatsAppHowItWorks
        steps={data.how_it_works_steps}
        heading={data.how_it_works_heading}
        description={data.how_it_works_description}
      />
    )}
    {data.benefits && data.benefits.length > 0 && (
      <BulkWhatsAppBenefits
        benefits={data.benefits}
        heading={data.benefits_heading}
        description={data.benefits_description}
      />
    )}
    {data.faqs && data.faqs.length > 0 && (
      <BulkWhatsAppFAQ
        faqs={data.faqs}
        heading={data.faq_section_heading}
        description={data.faq_section_description}
      />
    )}
    {/* DYNAMIC CONTENT */}
    {data.dynamic_content &&
      data.dynamic_content.length > 0 &&
      data.dynamic_content.map((block, index) => (
        <DynamicContentRenderer
          key={block.id || index}
          block={block}
          theme={theme}
        />
      ))}
    {data.primary_cta_sections &&
      data.primary_cta_sections.length > 0 &&
      data.primary_cta_sections.map((cta: any, i: number) => (
        <BulkWhatsAppCTA
          key={i}
          heading={cta.heading}
          description={cta.description}
          buttonText={cta.button?.text || cta.button_text}
          buttonUrl={cta.button?.url || cta.button_url}
          backgroundImage={cta.background_image}
        />
      ))}
  </>
);
