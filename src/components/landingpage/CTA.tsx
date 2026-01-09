import React from "react";
import type { LandingPageData } from "../../types/landing";
import EasyIcon from "./IconRenderer";

interface CTAProps {
  data: LandingPageData;
}

const CTA: React.FC<CTAProps> = ({ data }) => {
  const {
    cta_head,
    cta_introduction,
    cta_primary_text,
    cta_primary_url,
    cta_secondary_text,
    cta_secondary_url,
    cta_offer,
  } = data;

  if (!cta_head && !cta_introduction && !cta_primary_text) return null;

  return (
    <section className="py-20 sm:py-28 lg:py-32 relative overflow-hidden gradient-theme-primary">
      <div className="absolute inset-0 opacity-[0.08]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none bg-white" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-15 pointer-events-none bg-white" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {cta_head && (
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              {cta_head}
            </h2>
          )}

          {cta_introduction && (
            <p className="text-lg sm:text-xl md:text-2xl text-white/95 mb-8 leading-relaxed max-w-3xl mx-auto font-medium">
              {cta_introduction}
            </p>
          )}

          {cta_offer && (
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-10 border backdrop-blur-sm bg-white/15 border-white/25 shadow-lg">
              <EasyIcon icon="FiGift" size={18} color="#FFFFFF" className="sm:w-5 sm:h-5" />
              <p className="text-white font-bold text-sm md:text-base">
                {cta_offer}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 w-full sm:w-auto">
            {cta_primary_text && (
              <a
                href={cta_primary_url || "#"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-blue-600 font-bold text-base shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden group"
              >
                <span className="relative z-10">{cta_primary_text}</span>
                <EasyIcon icon="FiArrowRight" size={20} color="currentColor" className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </a>
            )}

            {cta_secondary_text && (
              <a
                href={cta_secondary_url || "#"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base border-2 text-white transition-all duration-300 hover:scale-105 backdrop-blur-sm border-white/40 hover:bg-white/10 shadow-lg"
              >
                <span>{cta_secondary_text}</span>
              </a>
            )}
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 text-white/90">
            <div className="flex items-center gap-2 transition-all duration-300 hover:text-white">
              <EasyIcon icon="FiCheckCircle" size={18} color="currentColor" />
              <span className="text-sm md:text-base font-medium">
                No credit card required
              </span>
            </div>
            <div className="flex items-center gap-2 transition-all duration-300 hover:text-white">
              <EasyIcon icon="FiShield" size={18} color="currentColor" />
              <span className="text-sm md:text-base font-medium">Secure & Compliant</span>
            </div>
            <div className="flex items-center gap-2 transition-all duration-300 hover:text-white">
              <EasyIcon icon="FiHeadphones" size={18} color="currentColor" />
              <span className="text-sm md:text-base font-medium">24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
