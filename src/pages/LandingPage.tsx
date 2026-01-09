import React, { useEffect, useState } from "react";
import type { LandingPageData } from "../types/landing";
import { fetchLandingPageData } from "../types/landing";
import { useTheme } from "../contexts/ThemeContext";
import DynamicContentRenderer from "../components/landingpage/DynamicContent";
import GlassNavbar from "../components/landingpage/GlassNavbar";
import Header from "../components/landingpage/Header";
import Features from "../components/landingpage/Features";
import VideoSection from "../components/landingpage/VideoSection";
import Benefits from "../components/landingpage/Benefits";
import CardSections from "../components/landingpage/CardSections";
import Testimonials from "../components/landingpage/Testimonials";
import FAQ from "../components/landingpage/FAQ";
import CTA from "../components/landingpage/CTA";
import Footer from "../components/landingpage/Footer";
import ProblemSolution from "../components/landingpage/ProblemSolution";
import HowItWorks from "../components/landingpage/HowItWorks";
import Pricing from "../components/landingpage/Pricing";
import WidgetButton from "../components/WidgetButton";

interface LandingPageProps {
  onShowLogin?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onShowLogin }) => {
  const [data, setData] = useState<LandingPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [_, setThemeColors] = useState<any>(null);

  const { setTheme } = useTheme();

  useEffect(() => {
    const loadData = async () => {
      try {
        const pageData = await fetchLandingPageData();

        if (pageData.color_theme) {
          setThemeColors(pageData.color_theme);
          setTheme(pageData.color_theme);
        }

        setData(pageData);

        if (pageData.meta_title || pageData.title) {
          document.title = pageData.meta_title || pageData.title;
        }

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription && (pageData.meta_description || pageData.header_description)) {
          metaDescription.setAttribute("content", pageData.meta_description || pageData.header_description || "");
        }

        if (pageData.og_image) {
          let ogImage = document.querySelector('meta[property="og:image"]');
          if (!ogImage) {
            ogImage = document.createElement("meta");
            ogImage.setAttribute("property", "og:image");
            document.head.appendChild(ogImage);
          }
          ogImage.setAttribute("content", pageData.og_image.url);
        }

        setError(null);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load landing page:", err);
        setError(err instanceof Error ? err.message : "Failed to load page data");
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // ===== DYNAMIC SECTION RENDERING FUNCTION =====
  const renderSection = (sectionKey: string, index: number) => {
    // Map section keys to their components with appropriate animations
    const sectionComponents: Record<string, React.ReactElement | null> = {
      header: (
        <div key={`header-${index}`}>
          <Header data={data!} onShowLogin={onShowLogin} />
        </div>
      ),
      features: (
        <div key={`features-${index}`}>
          <Features data={data!} />
        </div>
      ),
      problem_solution: (
        <div key={`problem-solution-${index}`}>
          <ProblemSolution
            data={
              {
                ...data?.problem_solution_section,
                color_theme: data?.color_theme,
              } as any
            }
          />
        </div>
      ),
      how_it_works: (
        <div key={`how-it-works-${index}`}>
          <HowItWorks data={data!} />
        </div>
      ),
      video: data?.video_section?.featured_video ? (
        <div key={`video-${index}`}>
          <VideoSection data={data} />
        </div>
      ) : null,
      benefits: (
        <div key={`benefits-${index}`}>
          <Benefits data={data!} />
        </div>
      ),
      pricing: (
        <div key={`pricing-${index}`}>
          <Pricing data={data!} />
        </div>
      ),
      card_sections:
        data?.card_sections?.cards && data.card_sections.cards.length > 0 ? (
          <div key={`card-sections-${index}`}>
            <CardSections data={data} />
          </div>
        ) : null,
      dynamic_content:
        data?.dynamic_content && data.dynamic_content.length > 0 ? (
          <section
            key={`dynamic-content-${index}`}
            className="w-full py-8 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-8 bg-theme-background"
          >
            <div className="w-full max-w-7xl mx-auto">
              <div className="space-y-8 sm:space-y-12">
                {data.dynamic_content.map((block) => (
                  <div key={block.id} className="w-full">
                    <DynamicContentRenderer block={block} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null,
      testimonials: (
        <div key={`testimonials-${index}`}>
          <Testimonials data={data!} />
        </div>
      ),
      faq: (
        <div key={`faq-${index}`}>
          <FAQ data={data!} />
        </div>
      ),
      cta:
        data?.cta_head || data?.cta_introduction || data?.cta_primary_text ? (
          <div key={`cta-${index}`}>
            <CTA data={data} />
          </div>
        ) : null,

      secondary_cta:
        data?.secondary_cta_heading ||
        data?.secondary_cta_description ||
        data?.secondary_cta_button_text ? (
          <div key={`secondary-cta-${index}`}>
            <CTA data={data} />
          </div>
        ) : null,
      footer: (
        <div key={`footer-${index}`}>
          <Footer data={data!} />
        </div>
      ),
    };

    return sectionComponents[sectionKey] || null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="relative inline-block mb-8">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-600"></div>
            <div className="absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-20"></div>
          </div>
          <div className="text-2xl font-bold text-slate-900">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-background">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-theme-accent mb-6">
            <svg
              className="w-20 h-20 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-theme-text mb-3">
            Unable to Load Page
          </h2>
          <p className="text-theme-neutral mb-8 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 gradient-theme-primary text-white rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-background">
        <div className="text-center">
          <p className="text-theme-neutral text-xl">No page data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="landing-page relative overflow-hidden">
      {/* Inauguration Curtains */}

      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 parallax-fast"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${
                Math.random() * 10 + 15
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse parallax-slow"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse parallax-slow"
          style={{ animationDuration: "10s", animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse parallax-fast"
          style={{ animationDuration: "12s", animationDelay: "4s" }}
        />
      </div>

      {/* Global Animation Styles */}
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(60px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; filter: blur(10px); }
          to { opacity: 1; filter: blur(0); }
        }

        @keyframes slideLeft {
          from {
            opacity: 0;
            transform: translateX(80px) rotate(5deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) rotate(0);
          }
        }

        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-80px) rotate(-5deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) rotate(0);
          }
        }

        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.8) rotate(-3deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0);
          }
        }

        @keyframes fadeDown {
          from {
            opacity: 0;
            transform: translateY(-60px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .scroll-fade-up {
          opacity: 0;
          transform: translateY(60px) scale(0.95);
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .scroll-fade-in {
          opacity: 0;
          filter: blur(10px);
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), filter 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .scroll-slide-left {
          opacity: 0;
          transform: translateX(80px) rotate(5deg);
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .scroll-slide-right {
          opacity: 0;
          transform: translateX(-80px) rotate(-5deg);
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .scroll-scale-up {
          opacity: 0;
          transform: scale(0.8) rotate(-3deg);
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .scroll-fade-down {
          opacity: 0;
          transform: translateY(-60px) scale(0.95);
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) translateX(0) scale(1) rotate(0) !important;
          filter: blur(0) !important;
        }

        html {
          scroll-behavior: smooth;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }

        /* Smooth scroll with momentum */
        * {
          scroll-behavior: smooth;
        }

        /* Parallax layers */
        .parallax-slow {
          will-change: transform;
          transition: transform 0.1s ease-out;
        }

        .parallax-fast {
          will-change: transform;
          transition: transform 0.05s ease-out;
        }

        /* Stagger animation delays */
        .scroll-fade-up:nth-child(1) { transition-delay: 0s; }
        .scroll-fade-up:nth-child(2) { transition-delay: 0.1s; }
        .scroll-fade-up:nth-child(3) { transition-delay: 0.2s; }
        .scroll-fade-up:nth-child(4) { transition-delay: 0.3s; }

        /* Curtain Animations */
        @keyframes curtainLeft {
          0% { 
            transform: translateX(0) scaleX(1);
            opacity: 1;
          }
          20% {
            transform: translateX(-2%) scaleX(1.02);
          }
          100% { 
            transform: translateX(-105%) scaleX(0.95);
            opacity: 0.8;
          }
        }

        @keyframes curtainRight {
          0% { 
            transform: translateX(0) scaleX(1);
            opacity: 1;
          }
          20% {
            transform: translateX(2%) scaleX(1.02);
          }
          100% { 
            transform: translateX(105%) scaleX(0.95);
            opacity: 0.8;
          }
        }
      `}</style>

      {/* Apply color theme globally with contrast fix */}
      {data.color_theme && (
        <style>{`
          :root {
            --color-primary: ${data.color_theme.primary_color};
            --color-secondary: ${data.color_theme.secondary_color};
            --color-accent: ${data.color_theme.accent_color};
            --color-neutral: ${data.color_theme.neutral_color};
            --color-background: ${
              data.color_theme.background_color === "#6B7280"
                ? "#FFFFFF"
                : data.color_theme.background_color
            };
            --color-text: ${data.color_theme.text_color};
          }
          
          /* Ensure good contrast */
          body {
            background-color: var(--color-background) !important;
            color: var(--color-text);
          }
          
          .landing-page {
            background-color: var(--color-background);
            min-height: 100vh;
          }
        `}</style>
      )}

      {/* Navbar Section - Always at top */}
      <GlassNavbar data={data} onShowLogin={onShowLogin} />

      {/* ===== DYNAMIC SECTION RENDERING ===== */}
      {data.section_order && data.section_order.length > 0 ? (
        // If section_order exists in API, render sections dynamically
        data.section_order.map((sectionKey, index) => {
          // Skip navbar as it's already rendered above
          if (sectionKey === "navbar") return null;

          return renderSection(sectionKey, index);
        })
      ) : (
        // Fallback: If no section_order, render in default order
        <>
          {/* Header Section */}
          <div>
            <Header data={data} onShowLogin={onShowLogin} />
          </div>

          {/* Features Section */}
          <div>
            <Features data={data} />
          </div>

          {/* Problem Solution Section */}
          <div>
            <ProblemSolution
              data={
                {
                  ...data?.problem_solution_section,
                  color_theme: data?.color_theme,
                } as any
              }
            />
          </div>

          {/* How It Works Section */}
          <div>
            <HowItWorks data={data} />
          </div>

          {/* Video Section */}
          {data.video_section?.featured_video && (
            <div>
              <VideoSection data={data} />
            </div>
          )}

          {/* Benefits Section */}
          <div>
            <Benefits data={data} />
          </div>

          {/* Pricing Section */}
          <div>
            <Pricing data={data} />
          </div>

          {/* Card Sections */}
          {data.card_sections?.cards && data.card_sections.cards.length > 0 && (
            <div>
              <CardSections data={data} />
            </div>
          )}

          {/* Dynamic Content Section */}
          {data.dynamic_content && data.dynamic_content.length > 0 && (
            <section className="w-full py-8 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-8 bg-theme-background">
              <div className="w-full max-w-7xl mx-auto">
                <div className="space-y-8 sm:space-y-12">
                  {data.dynamic_content.map((block) => (
                    <div key={block.id} className="w-full">
                      <DynamicContentRenderer block={block} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Testimonials Section */}
          <div>
            <Testimonials data={data} />
          </div>

          {/* FAQ Section */}
          <div>
            <FAQ data={data} />
          </div>

          {/* CTA Section */}
          {(data.cta_head ||
            data.cta_introduction ||
            data.cta_primary_text) && (
            <div>
              <CTA data={data} />
            </div>
          )}

          {/* Footer */}
          <div>
            <Footer data={data} />
          </div>
        </>
      )}

      {/* Widget Button */}
      <WidgetButton
        widgets={[
          ...(data.contact_widget
            ? [{ type: "contact_widget", data: data.contact_widget }]
            : []),
          ...(data.helpdesk_widget
            ? [{ type: "helpdesk_widget", data: data.helpdesk_widget }]
            : []),
          ...(data.w9form_widget
            ? [{ type: "w9form_widget", data: data.w9form_widget }]
            : []),
        ]}
      />
    </div>
  );
};

export default LandingPage;
