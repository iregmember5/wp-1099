import React from "react";

export const BulkEmailFeatures: React.FC<{
  features: any[];
  heading?: string;
  description?: string;
}> = ({ features, heading, description }) => (
  <section className="py-24 lg:py-32 bg-gradient-to-b from-white via-orange-50/30 to-white relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>

    <div className="container mx-auto px-6 lg:px-8 relative z-10">
      <div className="max-w-3xl mx-auto text-center mb-20">
        {heading && (
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-900 via-red-900 to-orange-900 bg-clip-text text-transparent">
            {heading}
          </h2>
        )}
        {description && (
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-7xl mx-auto">
        {features.map((f: any, i: number) => (
          <div
            key={i}
            className="group relative bg-white rounded-xl p-4 lg:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200 hover:-translate-y-2"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300" style={{boxShadow: '0 0 0 2px rgba(251, 146, 60, 0.2)'}}></div>

            <div className="relative z-10">
              <div className="relative w-10 h-10 mb-3">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg transform group-hover:rotate-6 transition-transform duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-red-700 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-orange-400 rounded-lg blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>

              <h3 className="text-lg lg:text-xl font-bold mb-2 text-gray-900 group-hover:text-orange-900 transition-colors">
                {f.title}
              </h3>

              <p className="text-gray-700 leading-relaxed text-xs lg:text-sm whitespace-pre-line">
                {f.description}
              </p>

              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-xl">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-orange-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  </section>
);
