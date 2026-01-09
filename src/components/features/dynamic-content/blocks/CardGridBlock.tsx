import React from "react";
import type { Theme } from "../../../../types/features-page";

/* eslint-disable @typescript-eslint/no-unused-vars */

interface CardGridBlockProps {
  value: any;
  theme: Theme;
  getFullImageUrl: (url: string) => string;
}

export const CardGridBlock: React.FC<CardGridBlockProps> = ({
  value,
  theme: _theme,
  getFullImageUrl,
}) => {
  if (!value || !value.cards) return null;

  const columns = parseInt(value.columns) || 3;
  const gridCols =
    {
      1: "grid-cols-1",
      2: "md:grid-cols-2",
      3: "md:grid-cols-2 lg:grid-cols-3",
      4: "md:grid-cols-2 lg:grid-cols-4",
    }[columns] || "md:grid-cols-3";

  // Check if there are exactly two cards to apply centering
  const shouldCenterCards = value.cards.length === 2;
  const gridContainerClasses = `grid ${gridCols} gap-8 ${
    shouldCenterCards ? "md:justify-center" : ""
  }`;

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {value.heading && (
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            {value.heading}
          </h2>
        )}
        {value.subheading && (
          <p className="text-xl text-center mb-12 lg:mb-20 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {value.subheading}
          </p>
        )}

        <div className={gridContainerClasses}>
          {value.cards.map((card: any, idx: number) => {
            const getCardImage = () => {
              if (card.card_content?.card_image) {
                const img = card.card_content.card_image;
                if (typeof img === "string") return img;
                if (img?.url) return getFullImageUrl(img.url);
              }
              return null;
            };

            const cardImageUrl = getCardImage();

            const title = card.custom_title || card.card_content?.title || "";
            let icon = "";
            let text = title;

            if (title.startsWith("❌")) {
              icon = "❌";
              text = title.substring(1).trim();
            } else if (title.startsWith("✔️")) {
              icon = "✔️";
              text = title.substring(1).trim();
            }

            // Generate a unique color for each card based on its index
            const hue = (idx * 137) % 360; // Distribute colors evenly
            const iconBgColor = `hsl(${hue}, 70%, 80%)`;

            const cardBaseClasses =
              "rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col border";
            
            let cardStyle = `bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500`;
            if (icon === "❌") {
              cardStyle = "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700";
            } else if (icon === "✔️") {
              cardStyle = "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700";
            }

            return (
              <div
                key={idx}
                className={`${cardBaseClasses} ${cardStyle} hover:-translate-y-1`}
              >
                {cardImageUrl ? (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={cardImageUrl}
                      alt={text}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  // Show decorative icon if no image
                  <div className="h-32 flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl"
                      style={{ backgroundColor: icon ? (icon === "❌" ? "#EF4444" : "#10B981") : iconBgColor }}
                    >
                      {!icon && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {icon}
                    </div>
                  </div>
                )}
                <div className="p-6 md:p-8 flex-grow flex flex-col">
                  <div className="flex items-start flex-grow">
                    {icon && (
                      <span className="text-3xl mr-4 mt-1">{icon}</span>
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                        {text}
                      </h3>
                      {card.custom_description || card.card_content?.description ? (
                        <p className="text-gray-600 dark:text-gray-300 flex-grow">
                          {card.custom_description ||
                            card.card_content?.description}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  {/* Add a subtle hover effect indicator */}
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                      Learn more
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};