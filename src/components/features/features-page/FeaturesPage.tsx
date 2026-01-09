import React, { useEffect, useState } from "react";
import type {
  FeaturesPageData,
  FeaturesPageProps,
  Theme,
} from "../../../types/features-page";
import { fetchAllFeaturesPages } from "./FeaturesPage.api";
import { createTheme } from "../utils/themeUtils";
import { getFullImageUrl } from "../utils/imageUtils";
import { LoadingState } from "../ui/LoadingState";
import { ErrorState } from "../ui/ErrorState";
import { DynamicContentRenderer } from "../dynamic-content/DynamicContentRenderer";
import { HeaderSection } from "../sections/HeaderSection";
import { EnhancedHowItWorks } from "../sections/EnhancedHowItWorks";
import { EnhancedFeatures } from "../sections/EnhancedFeatures";
import { EnhancedBenefits } from "../sections/EnhancedBenefits";
import { ProblemSolutionSection } from "../sections/ProblemSolutionSection";
import { CardSections } from "../sections/CardSections";
import { FAQSection } from "../sections/FAQSection";
import { TestimonialsSection } from "../sections/TestimonialsSection";
import { CTASection } from "../sections/CTASection";
import { PricingSection } from "../sections/PricingSection";
import {
  ESignatureLayout,
  W9ChaserLayout,
  BulkSMSLayout,
  BulkWhatsAppLayout,
  BulkEmailLayout,
  DocumentMergeLayout,
} from "../layouts";

export const FeaturesPage: React.FC<FeaturesPageProps> = ({ pageId, slug }) => {
  const [data, setData] = useState<FeaturesPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const allPages = await fetchAllFeaturesPages();

        console.log("🔍 All Features Pages:", allPages);
        console.log("🔍 Looking for slug:", slug);

        const matchingPage = allPages.find(
          (page: FeaturesPageData) => page.slug === slug
        );

        if (matchingPage) {
          console.log("✅ Found matching page:", matchingPage);
          setData(matchingPage);

          if (matchingPage.seo_title || matchingPage.title) {
            document.title = matchingPage.seo_title || matchingPage.title;
          }

          setError(null);
        } else {
          setError("Features page not found");
        }
      } catch (err) {
        console.error("Failed to load features page:", err);
        setError("Failed to load features page");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [pageId, slug]);

  if (loading) return <LoadingState />;
  if (error || !data)
    return (
      <ErrorState
        error={error || "Page not found"}
        onRetry={() => window.location.reload()}
      />
    );

  const theme: Theme = createTheme(data.color_theme);

  // Render layout based on title
  const renderLayout = () => {
    const title = data.title.toLowerCase().replace(/[\s-]/g, '');
    
    if (title.includes('esignature') || title.includes('esign')) {
      return <ESignatureLayout data={data} theme={theme} />;
    }
    if (title.includes('w9') && title.includes('chaser')) {
      return <W9ChaserLayout data={data} theme={theme} />;
    }
    if (title.includes('bulk') && title.includes('sms')) {
      return <BulkSMSLayout data={data} theme={theme} />;
    }
    if (title.includes('bulk') && title.includes('whatsapp')) {
      return <BulkWhatsAppLayout data={data} theme={theme} />;
    }
    if (title.includes('bulk') && title.includes('email')) {
      return <BulkEmailLayout data={data} theme={theme} />;
    }
    if (title.includes('document') && title.includes('merge')) {
      return <DocumentMergeLayout data={data} theme={theme} />;
    }
    
    return renderDefaultLayout();
  };

  const renderDefaultLayout = () => (
    <>
      <HeaderSection data={data} theme={theme} />

      <HeaderSection data={data} theme={theme} />

      {data.dynamic_content && data.dynamic_content.length > 0 && (
        <div>
          {data.dynamic_content.map((block, index) => (
            <DynamicContentRenderer
              key={block.id || index}
              block={block}
              theme={theme}
            />
          ))}
        </div>
      )}

      {/* Static Sections */}
      {data.how_it_works_steps && data.how_it_works_steps.length > 0 && (
        <EnhancedHowItWorks
          steps={data.how_it_works_steps}
          theme={theme}
          getFullImageUrl={getFullImageUrl}
          heading={data.how_it_works_heading}
          description={data.how_it_works_description}
        />
      )}

      {data.features && data.features.length > 0 && (
        <EnhancedFeatures
          features={data.features}
          theme={theme}
          heading={data.features_intro_heading}
          description={data.features_intro_description}
        />
      )}

      {data.benefits && data.benefits.length > 0 && (
        <EnhancedBenefits
          benefits={data.benefits}
          theme={theme}
          heading={data.benefits_heading}
          description={data.benefits_description}
        />
      )}

      {(data.problem_solution_heading || data.problem_solution_introduction) && (
        <ProblemSolutionSection data={data} theme={theme} />
      )}

      {data.card_sections && data.card_sections.length > 0 && (
        <CardSections
          cards={data.card_sections}
          theme={theme}
          heading={data.card_sections_heading}
          description={data.card_sections_description}
        />
      )}

      {data.faqs && data.faqs.length > 0 && (
        <FAQSection
          faqs={data.faqs}
          theme={theme}
          heading={data.faq_section_heading}
          description={data.faq_section_description}
        />
      )}

      {/* Pricing Section */}
      {(data.pricing_heading || data.pricing_widget_code || data.show_pricing_cta) && (
        <PricingSection
          heading={data.pricing_heading}
          description={data.pricing_description}
          widgetCode={data.pricing_widget_code}
          showCta={data.show_pricing_cta}
          ctaText={data.pricing_cta_text}
          ctaUrl={data.pricing_cta_url}
          theme={theme}
        />
      )}

      {data.testimonials && data.testimonials.length > 0 && (
        <TestimonialsSection
          testimonials={data.testimonials}
          theme={theme}
          heading={data.testimonials_heading}
          description={data.testimonials_description}
        />
      )}

      {data.primary_cta_sections && data.primary_cta_sections.length > 0 && data.primary_cta_sections.map((cta: any, i: number) => (
        <CTASection
          key={i}
          heading={cta.heading}
          description={cta.description}
          buttonText={cta.button?.text || cta.button_text}
          buttonUrl={cta.button?.url || cta.button_url}
          backgroundImage={cta.background_image}
          theme={theme}
          isPrimary={true}
        />
      ))}

      {data.secondary_cta_heading && data.secondary_cta_buttons && data.secondary_cta_buttons.length > 0 && data.secondary_cta_buttons.map((btn: any, i: number) => (
        <CTASection
          key={i}
          heading={data.secondary_cta_heading!}
          description={data.secondary_cta_description}
          buttonText={btn.text}
          buttonUrl={btn.url}
          theme={theme}
          isPrimary={false}
        />
      ))}
    </>
  );

  return (
    <div className="features-page" style={{ backgroundColor: theme.bgColor }}>
      <CustomStyles theme={theme} />
      {renderLayout()}
    </div>
  );
};

// Custom Styles Component
const CustomStyles: React.FC<{ theme: Theme }> = ({ theme }) => (
  <style>{`
    :root {
      --primary-color: ${theme.primaryColor};
      --secondary-color: ${theme.secondaryColor};
      --accent-color: ${theme.accentColor};
      --neutral-color: ${theme.neutralColor};
      --background-color: ${theme.bgColor};
      --text-color: ${theme.textColor};
    }
    
    body {
      background-color: ${theme.bgColor} !important;
      color: ${theme.textColor};
    }
    
    .features-page {
      background-color: ${theme.bgColor};
      min-height: 100vh;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes float {
      0%, 100% {
        transform: translate(0, 0);
      }
      50% {
        transform: translate(20px, -20px);
      }
    }

    @keyframes pulse-glow {
      0%, 100% {
        box-shadow: 0 0 20px ${theme.primaryColor}20;
      }
      50% {
        box-shadow: 0 0 40px ${theme.primaryColor}40;
      }
    }
    
    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes bounceIn {
      0% {
        opacity: 0;
        transform: scale(0.3);
      }
      50% {
        opacity: 1;
        transform: scale(1.05);
      }
      70% {
        transform: scale(0.9);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    .animate-fadeInUp {
      animation: fadeInUp 0.8s ease-out forwards;
      opacity: 0;
    }
    
    .animation-delay-200 {
      animation-delay: 0.2s;
    }

    .animation-delay-400 {
      animation-delay: 0.4s;
    }

    .animate-float {
      animation: float 6s ease-in-out infinite;
    }

    .animate-pulse-glow {
      animation: pulse-glow 2s ease-in-out infinite;
    }

    .animate-slideInLeft {
      animation: slideInLeft 0.8s ease-out forwards;
      opacity: 0;
    }

    .animate-slideInRight {
      animation: slideInRight 0.8s ease-out forwards;
      opacity: 0;
    }

    .animate-bounceIn {
      animation: bounceIn 0.8s ease-out forwards;
      opacity: 0;
    }

    /* Smooth scrolling */
    html {
      scroll-behavior: smooth;
    }

    /* Custom scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background: ${theme.bgColor};
    }

    ::-webkit-scrollbar-thumb {
      background: ${theme.primaryColor}50;
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: ${theme.primaryColor};
    }
  `}</style>
);

export default FeaturesPage;
