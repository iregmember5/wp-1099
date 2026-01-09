import React, { useState } from "react";
import type { LandingPageData, Feature } from "../../types/landing";
import EasyIcon from "./IconRenderer";

interface FeaturesProps {
  data: LandingPageData;
}

const Features: React.FC<FeaturesProps> = ({ data }) => {
  const { features_head, features_introduction, features } = data;
  const [activePhase, setActivePhase] = useState(1);

  const phases = [
    { id: 1, title: "Part 1", range: [0, 4] },
    { id: 2, title: "Part 2", range: [5, 9] },
    { id: 3, title: "Part 3", range: [10, 14] },
    { id: 4, title: "Part 4", range: [15, 19] },
  ];

  const getPhaseFeatures = (phaseId: number) => {
    const phase = phases.find((p) => p.id === phaseId);
    if (!phase || !features) return [];
    return features.slice(phase.range[0], phase.range[1] + 1);
  };

  if (
    !features_head &&
    !features_introduction &&
    (!features || features.length === 0)
  ) {
    return null;
  }

  return (
    <section
      id="features"
      className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white"
    >
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          {features_head && (
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200/50 shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                FEATURES
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-5 text-slate-900">
                {features_head}
              </h2>
            </div>
          )}
          {features_introduction && (
            <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-slate-600 font-medium">
              {features_introduction}
            </p>
          )}
        </div>

        {/* Phase Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 max-w-6xl mx-auto">
          {phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setActivePhase(phase.id)}
              className={`px-8 py-4 rounded-2xl font-black text-sm sm:text-base transition-all duration-300 shadow-lg ${
                activePhase === phase.id
                  ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-blue-500/50 scale-105"
                  : "bg-white text-slate-700 border-2 border-slate-300 hover:border-blue-500 hover:shadow-xl hover:scale-105"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    activePhase === phase.id
                      ? "bg-white/20"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {phase.id}
                </span>
                <span>{phase.title.replace(/Phase \d+: /, "")}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {getPhaseFeatures(activePhase).map((feature: Feature) => (
            <div
              key={feature.id}
              className="relative p-8 rounded-3xl bg-white border-2 border-slate-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-500 group overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-t-3xl" />
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl group-hover:opacity-100 opacity-0 transition-all duration-700" />

              <div className="relative z-10">
                {feature.icon && (
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <EasyIcon icon={feature.icon} size={28} color="#FFFFFF" />
                  </div>
                )}

                <h3 className="text-2xl font-black text-slate-900 leading-tight mb-5">
                  {feature.title}
                </h3>

                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200">
                  <p className="text-base leading-loose text-slate-700 whitespace-pre-line">
                    {feature.description}
                  </p>
                </div>

                {feature.image && (
                  <div className="mt-6 rounded-2xl overflow-hidden border-4 border-slate-100 shadow-xl">
                    <img
                      src={`https://esign-admin.signmary.com${feature.image.url}`}
                      alt={feature.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
