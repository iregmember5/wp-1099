import React from "react";

interface CardGridBlockProps {
  value: any;
  theme: any;
}

export const CardGridBlock: React.FC<CardGridBlockProps> = ({ value }) => {
  if (!value || !value.cards) return null;

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        {value.heading && (
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            {value.heading}
          </h2>
        )}
        {value.subheading && (
          <p className="text-xl text-center mb-12 text-gray-600 max-w-3xl mx-auto">
            {value.subheading}
          </p>
        )}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {value.cards.map((card: any, cardIndex: number) => (
            <div
              key={cardIndex}
              className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-blue-100"
            >
              <h3 className="text-2xl font-bold mb-4 text-blue-600">
                {card.custom_title}
              </h3>
              <p className="text-gray-700 mb-6 whitespace-pre-line leading-relaxed">
                {card.custom_description}
              </p>
              {value.cta_text && value.cta_url && (
                <a
                  href={value.cta_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  {value.cta_text}
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
