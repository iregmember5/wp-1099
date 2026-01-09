import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import IconRenderer from "./IconRenderer";
import WebForm from "./WebForm";
import {
  fetchLandingPageData,
  fetchAllFeaturesPages,
  fetchWorkbookPageData,
  prependImageUrl,
  type SalesPages,
  type FeaturesPageData,
} from "../../types/maverick";

const styles = `
  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.5); }
    50% { box-shadow: 0 0 40px rgba(251, 191, 36, 0.8); }
  }
  
  .geometric-bg {
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
    position: relative;
  }
  
  .geometric-bg::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(249, 115, 22, 0.1) 0%, transparent 50%);
  }
`;

export default function TaxAdvisorLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [pageData, setPageData] = useState<SalesPages | null>(null);
  const [showWebForm, setShowWebForm] = useState(false);

  const [_, setFeaturesData] = useState<FeaturesPageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchLandingPageData(),
      fetchAllFeaturesPages(),
      fetchWorkbookPageData(),
    ])
      .then(([landingData, featuresData]) => {
        setPageData(landingData);
        setFeaturesData(featuresData);

        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading) {
    return (
      <div className="geometric-bg text-white fixed inset-0 w-screen h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="geometric-bg text-white fixed inset-0 w-screen h-screen overflow-y-auto">
        {/* Top Banner */}
        {pageData?.header_section?.title && (
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white py-4 px-4 text-center font-bold shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 relative z-10">
              <p className="text-sm sm:text-base font-extrabold drop-shadow-lg">
                {pageData.header_section.title}
              </p>
              {pageData.header_section.button?.text && (
                <button
                  onClick={() => setShowWebForm(true)}
                  className="bg-black hover:bg-gray-900 text-yellow-400 px-6 py-2.5 rounded-full text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap font-bold shadow-xl hover:scale-105 transition-all"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  {pageData.header_section.button.text}
                </button>
              )}
            </div>
          </div>
        )}
        {pageData?.header_section?.line_one && (
          <p className="text-xl sm:text-sm mt-2 text-center font-bold text-yellow-300">
            {pageData.header_section.line_one}
          </p>
        )}

        {/* Hero Section */}
        <div className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-orange-500/10 to-transparent"></div>
          <div className="absolute top-20 right-20 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-20 left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />

          <div className="container mx-auto px-4 py-12 relative max-w-7xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left space-y-8">
                {pageData?.main_hero_section?.heading && (
                  <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 leading-tight bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl">
                    {pageData.main_hero_section.heading}
                  </h1>
                )}
                {pageData?.main_hero_section?.subheading && (
                  <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto md:mx-0 mb-8 leading-relaxed">
                    {pageData.main_hero_section.subheading}
                  </p>
                )}

                {pageData?.main_hero_section?.button?.text && (
                  <button
                    onClick={() => setShowWebForm(true)}
                    className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 text-black font-black py-5 px-10 rounded-full text-xl hover:scale-110 transition-all shadow-2xl hover:shadow-yellow-500/50 animate-[glow_2s_ease-in-out_infinite]"
                  >
                    🎯 {pageData.main_hero_section.button.text}
                  </button>
                )}
              </div>
              <div className="relative">
                {pageData?.main_hero_section?.image?.url && (
                  <div className="relative animate-[float_6s_ease-in-out_infinite]">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl blur-2xl opacity-50" />
                    <img
                      src={prependImageUrl(
                        pageData.main_hero_section.image.url
                      )}
                      alt="Workshop Hero"
                      className="relative rounded-3xl shadow-2xl w-full border-4 border-yellow-500/30"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Featured On Section */}
        {pageData?.featured_on_section?.items &&
          pageData.featured_on_section.items.length > 0 && (
            <div className="py-12 border-y border-gray-800 overflow-hidden">
              <p className="text-center text-gray-400 mb-6">
                {pageData.featured_on_section.heading}
              </p>
              <div className="flex items-center gap-12 px-4 animate-[scroll_20s_linear_infinite]">
                {[...Array(2)].map((_, idx) => (
                  <div key={idx} className="flex items-center gap-12 shrink-0">
                    {pageData.featured_on_section.items.map(
                      (item: any, i: number) => (
                        <div key={i} className="flex items-center gap-3">
                          {item.icon ? (
                            <IconRenderer
                              iconPath={item.icon}
                              className="w-8 h-8 text-white"
                            />
                          ) : (
                            <svg
                              className="w-8 h-8 text-gray-500"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <circle cx="12" cy="12" r="10" />
                            </svg>
                          )}
                          <span className="text-gray-500 text-2xl font-bold whitespace-nowrap">
                            {item.name}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* What You'll Learn */}
        {pageData?.card_sections?.cards &&
          pageData.card_sections.cards.length > 0 && (
            <div className="container mx-auto px-4 py-24">
              {pageData.card_sections.main_header && (
                <div className="text-center mb-16">
                  <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full text-sm font-bold mb-4">WHAT YOU'LL DISCOVER</div>
                  <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
                    {pageData.card_sections.main_header}
                  </h2>
                  {pageData.card_sections.footer_title && (
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                      {pageData.card_sections.footer_title}
                    </p>
                  )}
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {pageData.card_sections.cards.map((card: any, idx: number) => (
                  <div key={idx} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                    <div className="relative bg-gray-900 border border-yellow-500/30 rounded-2xl p-8 hover:border-yellow-500 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-2xl font-black text-black">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          {card.title && <h3 className="text-2xl font-bold text-white mb-2">{card.title}</h3>}
                          {card.subtitle && <h4 className="text-lg font-semibold text-yellow-400 mb-3">{card.subtitle}</h4>}
                          {card.description && <p className="text-gray-400 leading-relaxed">{card.description}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Free Registration Banner */}
        {pageData?.secondary_cta_section?.heading && (
          <div className="container mx-auto px-4 py-24">
            <div className="relative max-w-5xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-3xl blur-2xl opacity-30" />
              <div className="relative bg-black border-4 border-yellow-500 rounded-3xl p-12 text-center">
                <div className="inline-block bg-yellow-400 text-black px-4 py-1 rounded-full text-xs font-black uppercase mb-6">Limited Time Offer</div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
                  {pageData.secondary_cta_section.heading}
                </h2>
                {pageData.secondary_cta_section.description && (
                  <div className="text-6xl md:text-8xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-6">
                    {pageData.secondary_cta_section.description}
                  </div>
                )}
                {pageData.secondary_cta_section.announcement && (
                  <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    {pageData.secondary_cta_section.announcement}
                  </p>
                )}
                {pageData.secondary_cta_section.button?.text && (
                  <button
                    onClick={() => setShowWebForm(true)}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black py-5 px-12 rounded-full text-xl hover:scale-105 transition-transform shadow-2xl"
                  >
                    {pageData.secondary_cta_section.button.text} →
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Meet Your Speakers */}
        {pageData?.images_gallery_section?.images &&
          pageData.images_gallery_section.images.filter((img: any) => img.image).length > 0 && (
            <div className="container mx-auto px-4 py-24">
              {pageData.images_gallery_section.heading && (
                <div className="text-center mb-16">
                  <h2 className="text-5xl font-black text-white mb-4">{pageData.images_gallery_section.heading}</h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full" />
                </div>
              )}
              <div className="flex flex-wrap justify-center gap-12 max-w-5xl mx-auto">
                {pageData.images_gallery_section.images.filter((img: any) => img.image).map((img: any, i: number) => (
                  <div key={i} className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-yellow-500 shadow-2xl">
                      <img src={prependImageUrl(img.image?.url)} alt={img.caption || "Speaker"} className="w-full h-full object-cover" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Pricing Section */}
        {pageData?.primary_cta_section?.heading && (
          <div className="container mx-auto px-4 py-24">
            <div className="max-w-lg mx-auto">
              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-500 rounded-3xl overflow-hidden shadow-2xl">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 text-center">
                  <p className="text-black font-black text-sm uppercase tracking-wider">{pageData.primary_cta_section.heading}</p>
                </div>
                <div className="p-10 text-center">
                  {pageData.primary_cta_section.subtitle && (
                    <div className="text-7xl font-black text-white mb-4">{pageData.primary_cta_section.subtitle}</div>
                  )}
                  {pageData.primary_cta_section.description && (
                    <p className="text-gray-400 mb-6">{pageData.primary_cta_section.description}</p>
                  )}
                  {pageData.primary_cta_section.subdescription && (
                    <p className="text-yellow-400 font-bold text-lg mb-8">{pageData.primary_cta_section.subdescription}</p>
                  )}
                  {pageData.primary_cta_section.button?.text && (
                    <button
                      onClick={() => setShowWebForm(true)}
                      className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black py-5 rounded-full text-lg hover:scale-105 transition-transform shadow-xl"
                    >
                      {pageData.primary_cta_section.button.text}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reusable Sections */}
        {pageData?.reusable_sections
          ?.filter(
            (s: any) =>
              s.heading ||
              s.subheading ||
              s.description ||
              s.subdescription ||
              s.button?.text ||
              s.image ||
              s.cards?.length > 0
          )
          .map((section: any, idx: number) => (
            <div key={idx} className="relative py-24 overflow-hidden">
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-orange-500/5" />
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
              
              <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-7xl mx-auto">
                  {/* Section Header */}
                  <div className="text-center mb-20">
                    {section.heading && (
                      <h2 className="text-5xl md:text-6xl font-black mb-6">
                        <span className="bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
                          {section.heading}
                        </span>
                      </h2>
                    )}
                    {section.subheading && (
                      <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-2 rounded-full mb-6">
                        <h3 className="text-xl font-black text-black">
                          {section.subheading}
                        </h3>
                      </div>
                    )}
                    {section.description && (
                      <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                        {section.description}
                      </p>
                    )}
                  </div>

                  {/* Cards Grid */}
                  {section.cards && section.cards.length > 0 && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {section.cards
                        .filter((c: any) => c.name || c.description)
                        .map((card: any, i: number) => (
                          <div key={i} className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 rounded-2xl opacity-75 group-hover:opacity-100 blur transition-all duration-500" />
                            <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-yellow-600 group-hover:border-yellow-500 rounded-2xl p-6 h-full transition-all duration-300">
                              {card.name && (
                                <h4 className="text-lg font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                                  {card.name}
                                </h4>
                              )}
                              {card.description && (
                                <div className="text-gray-400 text-sm leading-relaxed space-y-2">
                                  {card.description.split('\n').map((line: string, idx: number) => (
                                    line.trim() && (
                                      <div key={idx} className="flex items-start gap-2">
                                        <span className="text-yellow-500 mt-1 flex-shrink-0">•</span>
                                        <span>{line.replace(/^🔸\s*/, '')}</span>
                                      </div>
                                    )
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}

                  {/* Button */}
                  {section.button?.text && (
                    <div className="text-center mt-16">
                      <button
                        onClick={() => setShowWebForm(true)}
                        className="group relative bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 text-black font-black py-5 px-12 rounded-full text-xl hover:scale-105 transition-all shadow-2xl overflow-hidden"
                      >
                        <span className="relative z-10">{section.button.text} →</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

        {/* Simple CTA Sections */}
        {pageData?.simple_cta_sections
          ?.filter(
            (c: any) =>
              c.heading || c.subtitle || c.description || c.button?.text
          )
          .map((cta: any, idx: number) => (
            <div key={idx} className="container mx-auto px-4 py-16 text-center">
              {cta.heading && (
                <h2 className="text-3xl font-bold mb-4">{cta.heading}</h2>
              )}
              {cta.subtitle && <p className="text-xl mb-8">{cta.subtitle}</p>}
              {cta.description && <p className="mb-4">{cta.description}</p>}
              {cta.button?.text && (
                <button
                  onClick={() => setShowWebForm(true)}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-4 px-8 rounded-full text-lg hover:scale-105 transition-transform"
                >
                  🎯 {cta.button.text}
                </button>
              )}
            </div>
          ))}

        {/* Web Form Section */}
        {pageData?.web_form_section?.form && (
          <div className="container mx-auto px-4 py-16">
            {pageData.web_form_section.heading && (
              <h2 className="text-3xl font-bold mb-4 text-center">
                {pageData.web_form_section.heading}
              </h2>
            )}
            {pageData.web_form_section.description && (
              <p className="text-center mb-8">
                {pageData.web_form_section.description}
              </p>
            )}
            <div className="max-w-2xl mx-auto">
              <p className="text-center text-gray-400">
                Form ID: {typeof pageData.web_form_section.form === 'object' ? pageData.web_form_section.form.id : pageData.web_form_section.form}
              </p>
            </div>
          </div>
        )}

        {/* Calendar Section */}
        {pageData?.calendar_section?.embed_code && (
          <div className="container mx-auto px-4 py-16">
            {pageData.calendar_section.heading && (
              <h2 className="text-3xl font-bold mb-8 text-center">
                {pageData.calendar_section.heading}
              </h2>
            )}
            <div
              className="max-w-4xl mx-auto"
              dangerouslySetInnerHTML={{
                __html: pageData.calendar_section.embed_code,
              }}
            />
          </div>
        )}

        {/* FAQ Section */}
        {pageData?.faq_section?.faqs && pageData.faq_section.faqs.length > 0 && (
          <div className="container mx-auto px-4 py-24">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black text-white mb-4">{pageData.faq_section.heading}</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full" />
              </div>
              <div className="space-y-4">
                {pageData.faq_section.faqs.map((faq: any, i: number) => (
                  <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-colors">
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left p-6 flex justify-between items-center group">
                      <span className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors pr-4">{faq.question}</span>
                      <div className="flex-shrink-0 w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center group-hover:bg-yellow-500/30 transition-colors">
                        {openFaq === i ? <ChevronUp className="w-5 h-5 text-yellow-400" /> : <ChevronDown className="w-5 h-5 text-yellow-400" />}
                      </div>
                    </button>
                    {openFaq === i && (
                      <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-gray-800" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {pageData?.web_form_section && (
        <WebForm
          isOpen={showWebForm}
          onClose={() => setShowWebForm(false)}
          data={pageData.web_form_section}
        />
      )}
    </>
  );
}
