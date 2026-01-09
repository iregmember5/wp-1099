import React, { useEffect, useState } from "react";
import type {
  InformationPageData,
  InformationPageProps,
} from "../../types/information-page";
import {
  fetchInformationPageBySlug,
  fetchInformationPageById,
  fetchInformationPageByModuleSlug,
} from "./InformationPage.api";
import { LoadingState } from "../features/ui/LoadingState";
import { ErrorState } from "../features/ui/ErrorState";
import { DynamicContentRenderer } from "./dynamic-content/DynamicContentRenderer";

const InformationPage: React.FC<InformationPageProps> = ({
  pageId,
  slug,
  moduleSlug,
}) => {
  const [pageData, setPageData] = useState<InformationPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setLoading(true);
        setError(null);

        let data: InformationPageData | null = null;

        if (pageId) {
          data = await fetchInformationPageById(pageId);
        } else if (slug) {
          data = await fetchInformationPageBySlug(slug);
        } else if (moduleSlug) {
          data = await fetchInformationPageByModuleSlug(moduleSlug);
        }

        if (!data) {
          setError("Page not found");
          return;
        }

        setPageData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load page");
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, [pageId, slug, moduleSlug]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={() => window.location.reload()} />;
  if (!pageData) return <ErrorState error="Page not found" onRetry={() => window.location.reload()} />;

  const themeStyles = pageData.color_theme
    ? ({
        "--primary-color": pageData.color_theme.primary_color,
        "--secondary-color": pageData.color_theme.secondary_color,
        "--accent-color": pageData.color_theme.accent_color,
      } as React.CSSProperties)
    : {};

  return (
    <div className="information-page" style={themeStyles}>
      {/* Hero Section */}
      {pageData.hero.title && (
        <section className="hero-section py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">{pageData.hero.title}</h1>
            {pageData.hero.subtitle && (
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                {pageData.hero.subtitle}
              </p>
            )}
            {pageData.hero.image && (
              <div className="mt-8">
                <img
                  src={pageData.hero.image.url}
                  alt={pageData.hero.image.title}
                  className="mx-auto rounded-lg shadow-2xl max-w-4xl w-full"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Quick Features */}
      {pageData.quick_features.length > 0 && (
        <section className="quick-features py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pageData.quick_features.map((feature, index) => (
                <div key={index} className="text-center">
                  {feature.icon && (
                    <div className="mb-4">
                      <img
                        src={feature.icon.url}
                        alt={feature.icon.title}
                        className="w-16 h-16 mx-auto"
                      />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Key Features */}
      {pageData.key_features.length > 0 && (
        <section className="key-features py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pageData.key_features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  {feature.icon && (
                    <div className="mb-4">
                      <img
                        src={feature.icon.url}
                        alt={feature.icon.title}
                        className="w-12 h-12"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Content */}
      {pageData.dynamic_content.length > 0 && (
        <section className="dynamic-content">
          {pageData.dynamic_content.map((block, index) => (
            <DynamicContentRenderer 
              key={index}
              block={block} 
              theme={{
                primaryColor: pageData.color_theme?.primary_color || '#3B82F6',
                secondaryColor: pageData.color_theme?.secondary_color || '#10B981',
                accentColor: pageData.color_theme?.accent_color || '#F59E0B',
                textColor: '#1F2937',
                neutralColor: '#6B7280',
                bgColor: '#FFFFFF'
              }} 
            />
          ))}
        </section>
      )}

      {/* CTA Section */}
      {pageData.cta.text && pageData.cta.link && (
        <section className="cta-section py-16 bg-blue-600 text-white text-center">
          <div className="container mx-auto px-4">
            <a
              href={pageData.cta.link}
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              {pageData.cta.text}
            </a>
          </div>
        </section>
      )}
    </div>
  );
};

export default InformationPage;
