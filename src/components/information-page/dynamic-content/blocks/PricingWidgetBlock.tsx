import React, { useEffect, useRef } from "react";
import type { Theme } from "../../../../types/features-page";

interface PricingWidgetBlockProps {
  value: any;
  theme: Theme;
}

export const PricingWidgetBlock: React.FC<PricingWidgetBlockProps> = ({
  value,
  theme,
}) => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value?.widget_code && widgetRef.current) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = value.widget_code;
      
      const scripts = tempDiv.querySelectorAll('script');
      scripts.forEach((script) => {
        const newScript = document.createElement('script');
        if (script.src) {
          newScript.src = script.src;
          newScript.async = true;
        } else {
          newScript.textContent = script.textContent;
        }
        document.head.appendChild(newScript);
      });
      
      const nonScriptContent = tempDiv.querySelectorAll(':not(script)');
      nonScriptContent.forEach((el) => {
        widgetRef.current?.appendChild(el.cloneNode(true));
      });
    }
  }, [value?.widget_code]);

  if (!value) return null;

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: theme.bgColor }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          {value.heading && (
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4" style={{ color: theme.primaryColor }}>
              {value.heading}
            </h2>
          )}
          {value.description && (
            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto" style={{ color: theme.neutralColor }}>
              {value.description}
            </p>
          )}
        </div>

        {value.widget_code ? (
          <div ref={widgetRef} className="max-w-6xl mx-auto" />
        ) : (
          <div className="text-center">
            <p className="text-sm sm:text-base mb-6 sm:mb-8" style={{ color: theme.neutralColor }}>
              Pricing information coming soon...
            </p>
            {value.show_cta && value.cta?.text && (
              <a
                href={value.cta.url || "#"}
                className="inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors font-semibold text-sm sm:text-base"
                style={{ backgroundColor: theme.primaryColor, color: theme.bgColor }}
              >
                {value.cta.text}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
