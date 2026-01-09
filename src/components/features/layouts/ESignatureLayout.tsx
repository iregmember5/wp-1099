import React from "react";
import {
  type FeaturesPageData,
  type Theme,
} from "../../../types/features-page";
import { ESignatureHeader } from "./esignature/ESignatureHeader";
import { ESignatureFeatures } from "./esignature/ESignatureFeatures";
import { ESignatureHowItWorks } from "./esignature/ESignatureHowItWorks";
import { ESignatureBenefits } from "./esignature/ESignatureBenefits";
import { ESignatureFAQ } from "./esignature/ESignatureFAQ";
import { DynamicContentRenderer } from "../dynamic-content/DynamicContentRenderer";
import { ESignatureCTA } from "./esignature/ESignatureCTA";

interface LayoutProps {
  data: FeaturesPageData;
  theme: Theme;
}

export const ESignatureLayout: React.FC<LayoutProps> = ({ data, theme }) => (
  <>
    <ESignatureHeader data={data} />
    {data.features && data.features.length > 0 && (
      <ESignatureFeatures
        features={data.features}
        heading={data.features_intro_heading}
        description={data.features_intro_description}
      />
    )}
    {data.how_it_works_steps && data.how_it_works_steps.length > 0 && (
      <ESignatureHowItWorks
        steps={data.how_it_works_steps}
        heading={data.how_it_works_heading}
        description={data.how_it_works_description}
      />
    )}
    {data.benefits && data.benefits.length > 0 && (
      <ESignatureBenefits
        benefits={data.benefits}
        heading={data.benefits_heading}
        description={data.benefits_description}
      />
    )}
    {data.faqs && data.faqs.length > 0 && (
      <ESignatureFAQ
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
        <ESignatureCTA
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
