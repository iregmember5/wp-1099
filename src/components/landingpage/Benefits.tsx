import React from "react";
import type { LandingPageData, Benefit } from "../../types/landing";
import EasyIcon from "./IconRenderer";

interface BenefitsProps {
  data: LandingPageData;
}

const Benefits: React.FC<BenefitsProps> = ({ data }) => {
  const { benefits_head, benefits_introduction, benefits } = data;

  if (
    !benefits_head &&
    !benefits_introduction &&
    (!benefits || benefits.length === 0)
  ) {
    return null;
  }

  const sampleBenefits = [
    {
      id: 1,
      title: "Save Time & Increase Efficiency",
      description:
        "Automate your tax form processes and reduce manual work by up to 80% with our streamlined platform.",
      stats: "80% Faster",
      icon: "FiZap",
      order: 1,
    },
    {
      id: 2,
      title: "Reduce Errors & Ensure Compliance",
      description:
        "Our built-in validation checks ensure IRS compliance and eliminate costly filing errors.",
      stats: "99% Accuracy",
      icon: "FiTarget",
      order: 2,
    },
    {
      id: 3,
      title: "Cost-Effective Solution",
      description:
        "Save up to 20% annually on tax preparation costs while improving service quality.",
      stats: "20% Savings",
      icon: "FiDollarSign",
      order: 3,
    },
    {
      id: 4,
      title: "Enhanced Security",
      description:
        "Enterprise-grade security protects your sensitive client data and tax information.",
      stats: "100% Secure",
      icon: "FiShield",
      order: 4,
    },
  ];

  const displayBenefits =
    benefits && benefits.length > 0 ? benefits : sampleBenefits;

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white">
      {/* Professional Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle Gradient Accents */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Professional */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20 max-w-3xl mx-auto px-4">
          {benefits_head && (
            <div className="mb-6">
              <div className="inline-block px-4 py-2 rounded-full text-xs font-bold mb-5 bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border border-emerald-200/50 shadow-sm">
                BENEFITS
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5 text-slate-900">
                {benefits_head}
              </h2>
            </div>
          )}

          {benefits_introduction && (
            <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-slate-600 font-medium">
              {benefits_introduction}
            </p>
          )}

          {(!benefits || benefits.length === 0) && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs mt-4 bg-blue-50 text-blue-700 border border-blue-200/50">
              <EasyIcon icon="FiInfo" size={14} color="#3b82f6" />
              <span>Discover the benefits of our platform</span>
            </div>
          )}
        </div>

        {/* Benefits Grid - Modern Professional Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
          {displayBenefits.map((benefit: Benefit) => {
            const imageUrl = benefit.image?.url
              ? `https://esign-admin.signmary.com${benefit.image.url}`
              : null;

            return (
              <div key={benefit.id} className="group relative">
                {/* Modern Professional Card */}
                <div className="relative h-full rounded-2xl transition-all duration-500 hover:shadow-2xl bg-white border-2 border-slate-200 hover:border-blue-300 overflow-hidden">
                  {/* Image at top with overlay */}
                  {imageUrl && (
                    <div className="w-full h-40 overflow-hidden relative">
                      <img
                        src={imageUrl}
                        alt={benefit.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  )}

                  <div className="p-6">
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                    {/* Icon and Stats Row */}
                    <div className="flex items-start justify-between mb-5 relative z-10">
                      {benefit.icon && (
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                          <EasyIcon
                            icon={benefit.icon}
                            size={20}
                            color="#FFFFFF"
                            className="relative z-10 transition-transform duration-500 group-hover:rotate-6"
                          />
                        </div>
                      )}

                      {benefit.stats && (
                        <div className="text-right font-extrabold text-base transition-all duration-300 group-hover:scale-105 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                          {benefit.stats}
                        </div>
                      )}
                    </div>

                    {/* Title - Bold */}
                    <h3 className="text-base sm:text-lg font-bold mb-3 transition-colors duration-300 line-clamp-2 text-slate-900 relative z-10">
                      {benefit.title}
                    </h3>

                    {/* Description - Clear */}
                    <p className="text-sm leading-relaxed line-clamp-3 text-slate-600 relative z-10">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA - Professional */}
        {(!benefits || benefits.length === 0) && (
          <div className="text-center mt-16 sm:mt-20 px-4">
            <p className="text-base sm:text-lg mb-6 text-slate-600 font-medium">
              Ready to experience these benefits for your business?
            </p>
            <button className="group/btn inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl gradient-theme-primary text-white">
              Start Saving Today
              <EasyIcon
                icon="FiArrowRight"
                size={16}
                color="#FFFFFF"
                className="transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Benefits;
