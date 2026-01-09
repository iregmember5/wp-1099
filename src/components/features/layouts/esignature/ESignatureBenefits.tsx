import React from "react";

export const ESignatureBenefits: React.FC<{
  benefits: any[];
  heading?: string;
  description?: string;
}> = ({ benefits, heading, description }) => (
  <section className="py-24 lg:py-32 relative overflow-hidden">
    {/* Elegant gradient background with subtle pattern */}
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
      </div>
      {/* Signature pattern overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="sig-pattern"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M20,50 Q40,30 60,50 T100,50"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sig-pattern)" />
      </svg>
    </div>

    <div className="container mx-auto px-6 lg:px-8 relative z-10">
      {/* Section header */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        {heading && (
          <div className="mb-6">
            {/* Icon badge */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl mb-8 border border-white/20 shadow-2xl">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
              {heading}
            </h2>
          </div>
        )}
        {description && (
          <p className="text-lg md:text-xl text-blue-100 leading-relaxed whitespace-pre-line">
            {description}
          </p>
        )}
      </div>

      {/* Benefits grid with staggered animation */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
        {benefits.map((b: any, i: number) => (
          <div
            key={i}
            className="group relative"
            style={{ animationDelay: `${i * 75}ms` }}
          >
            {/* Card with glass morphism effect */}
            <div className="relative h-full bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-blue-500/50">
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 via-indigo-400/0 to-purple-400/0 group-hover:from-blue-400/20 group-hover:via-indigo-400/20 group-hover:to-purple-400/20 rounded-3xl transition-all duration-300"></div>

              <div className="relative z-10 flex flex-col items-center text-center h-full">
                {/* Icon with sophisticated animation */}
                <div className="relative mb-6">
                  {/* Pulsing background ring */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-300"></div>

                  {/* Main icon container */}
                  <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-105 transition-all duration-300">
                    <div className="text-4xl">
                      {/* Dynamic icons based on benefit type */}
                      {i === 0 && "⚡"}
                      {i === 1 && "🔒"}
                      {i === 2 && "💰"}
                      {i === 3 && "🌍"}
                      {i > 3 && "✨"}
                    </div>
                  </div>

                  {/* Decorative corner elements */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl lg:text-2xl font-bold mb-3 text-white group-hover:text-blue-100 transition-colors">
                    {b.title}
                  </h3>

                  <p className="text-blue-100/90 leading-relaxed text-sm lg:text-base group-hover:text-white transition-colors">
                    {b.description}
                  </p>
                </div>

                {/* Bottom indicator */}
                <div className="mt-6 pt-4 border-t border-white/10 w-full">
                  <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                  </div>
                </div>
              </div>


            </div>

            {/* Floating number badge */}
            <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-xl transform group-hover:scale-105 transition-all duration-300 z-20">
              {i + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom statistics bar */}
      <div className="mt-20 flex flex-wrap justify-center gap-8 lg:gap-16">
        {[
          { value: "10M+", label: "Documents Signed" },
          { value: "99.9%", label: "Uptime" },
          { value: "150+", label: "Countries" },
          { value: "24/7", label: "Support" },
        ].map((stat, idx) => (
          <div key={idx} className="text-center group cursor-pointer">
            <div className="text-3xl lg:text-4xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
              {stat.value}
            </div>
            <div className="text-sm lg:text-base text-blue-200 group-hover:text-white transition-colors">
              {stat.label}
            </div>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto mt-2 rounded-full transform scale-0 group-hover:scale-100 transition-transform"></div>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom decorative wave */}
    <div className="absolute bottom-0 left-0 right-0">
      <svg
        className="w-full h-24 text-white"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,64 C360,20 720,20 1080,64 C1440,108 1440,108 1440,108 L1440,120 L0,120 Z"
          fill="currentColor"
          fillOpacity="1"
        />
      </svg>
    </div>
  </section>
);
