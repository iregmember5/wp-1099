import React from "react";

export const ESignatureFeatures: React.FC<{
  features: any[];
  heading?: string;
  description?: string;
}> = ({ features, heading, description }) => (
  <section className="py-24 lg:py-32 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
    {/* Decorative elements */}
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

    <div className="container mx-auto px-6 lg:px-8 relative z-10">
      {/* Section header */}
      <div className="max-w-3xl mx-auto text-center mb-20">
        {heading && (
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 bg-clip-text text-transparent">
            {heading}
          </h2>
        )}
        {description && (
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Features grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-7xl mx-auto">
        {features.map((f: any, i: number) => (
          <div
            key={i}
            className="group relative bg-white rounded-xl p-4 lg:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 hover:-translate-y-2"
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Content */}
            <div className="relative z-10">
              {/* Icon with elegant animation */}
              <div className="relative w-10 h-10 mb-3">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg transform group-hover:rotate-6 transition-transform duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-blue-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              </div>

              <h3 className="text-lg lg:text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-900 transition-colors">
                {f.title}
              </h3>

              <p className="text-gray-700 leading-relaxed text-xs lg:text-sm whitespace-pre-line">
                {f.description}
              </p>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-3xl">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-blue-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
          </div>
        ))}
      </div>

      {/* Bottom decorative element */}
      <div className="flex justify-center mt-20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  </section>
);
