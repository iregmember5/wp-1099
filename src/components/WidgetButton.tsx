import { useState, useEffect, useRef } from "react";
import type { Widget } from "../types/site-settings";

interface WidgetButtonProps {
  widgets: Widget[];
}

export default function WidgetButton({ widgets }: WidgetButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState<Widget | null>(null);
  const iframeRef = useRef<HTMLDivElement>(null);

  if (widgets.length === 0) return null;

  const extractIconUrl = (embedCode: string): string => {
    const match = embedCode.match(/src=["']([^"']+)["']/);
    return match ? match[1] : "";
  };

  const handleWidgetClick = (widget: Widget, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Widget clicked:", widget.data.name);
    setIsOpen(false);
    setSelectedWidget(widget);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Function to close widget and show blue button - with thorough cleanup
  const closeWidget = () => {
    // Clean up the widget container
    if (iframeRef.current) {
      iframeRef.current.innerHTML = "";
    }

    // Remove any widget-related elements that may have been added to body
    const widgetElements = document.querySelectorAll(
      '[class*="clicflo"], [class*="widget-modal"], [class*="helpdesk"], ' +
        '[class*="we-are-here"], [class*="help-desk"], ' +
        'iframe[src*="widget"], [class*="chat-widget"], [class*="floating"]'
    );
    widgetElements.forEach((el) => {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    });

    setSelectedWidget(null);
  };

  useEffect(() => {
    if (selectedWidget && iframeRef.current) {
      const container = iframeRef.current;
      container.innerHTML = selectedWidget.data.embed_code;

      const scripts = container.querySelectorAll("script");
      scripts.forEach((oldScript) => {
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });
        if (oldScript.innerHTML) {
          newScript.text = oldScript.innerHTML;
        }
        container.replaceChild(newScript, oldScript);
      });

      setTimeout(() => {
        const widgetButton = container.querySelector(
          'button, a, [role="button"], .widget-button, [class*="button"]'
        );
        if (widgetButton) {
          (widgetButton as HTMLElement).click();
        }
      }, 500);

      // Listen for clicks on close buttons within the widget
      const handleCloseClick = (e: Event) => {
        const target = e.target as HTMLElement;

        // Check if clicked element is a close button (X button)
        const isCloseButton =
          target.closest('[class*="close"]') ||
          target.closest('[aria-label*="close" i]') ||
          target.closest('[aria-label*="Close" i]') ||
          target.closest('button[class*="x"]') ||
          target.closest(".close-button") ||
          target.closest("[data-close]") ||
          // Check for X icon SVG paths or common close patterns
          (target.closest("svg")?.closest("button") &&
            (target
              .closest("button")
              ?.getAttribute("aria-label")
              ?.toLowerCase()
              .includes("close") ||
              target
                .closest("button")
                ?.className.toLowerCase()
                .includes("close")));

        if (isCloseButton) {
          // Small delay to let widget's own close animation play
          setTimeout(() => {
            closeWidget();
          }, 100);
        }
      };

      // Observe for widget being removed/closed by its own logic
      const observer = new MutationObserver(() => {
        // Check if the widget content has been removed or significantly changed
        const hasVisibleContent = container.querySelector(
          'iframe, [class*="modal"], [class*="popup"], [class*="dialog"], [class*="widget"]'
        );

        // Also check if any modal/popup is still visible
        const anyModalVisible = document.querySelector(
          '[class*="modal"]:not([style*="display: none"]), [class*="popup"]:not([style*="display: none"])'
        );

        if (
          !hasVisibleContent &&
          !anyModalVisible &&
          container.innerHTML.trim().length < 50
        ) {
          closeWidget();
        }
      });

      container.addEventListener("click", handleCloseClick, true);

      // Also listen on document for widgets that render modals outside the container
      const documentClickHandler = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        // Check if it's a close button in a modal/popup anywhere in the document
        if (
          target.closest('[class*="modal"] [class*="close"]') ||
          target.closest('[class*="popup"] [class*="close"]') ||
          target.closest('[class*="dialog"] [class*="close"]')
        ) {
          setTimeout(() => {
            closeWidget();
          }, 300);
        }
      };

      document.addEventListener("click", documentClickHandler, true);

      observer.observe(container, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style", "class"],
      });

      // Also observe the body for modals that might be added there
      const bodyObserver = new MutationObserver(() => {
        // Check if widget modal is still present
        setTimeout(() => {
          const widgetModalStillOpen = document.querySelector(
            '[class*="clicflo"], [class*="widget-modal"], [class*="helpdesk"], iframe[src*="widget"]'
          );
          if (!widgetModalStillOpen && selectedWidget) {
            // Double check the container too
            const containerHasContent = container.innerHTML.trim().length > 100;
            if (!containerHasContent) {
              closeWidget();
            }
          }
        }, 500);
      });

      bodyObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });

      return () => {
        observer.disconnect();
        bodyObserver.disconnect();
        container.removeEventListener("click", handleCloseClick, true);
        document.removeEventListener("click", documentClickHandler, true);

        // Clean up on unmount - remove any lingering widget elements
        container.innerHTML = "";
        const widgetElements = document.querySelectorAll(
          '[class*="clicflo"], [class*="widget-modal"], [class*="helpdesk"], ' +
            '[class*="we-are-here"], [class*="help-desk"], ' +
            'iframe[src*="widget"], [class*="chat-widget"], [class*="floating"]'
        );
        widgetElements.forEach((el) => {
          if (el.parentNode) {
            el.parentNode.removeChild(el);
          }
        });
      };
    }
  }, [selectedWidget]);

  // Listen for escape key to close widget
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedWidget) {
        closeWidget();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [selectedWidget]);

  return (
    <>
      <style>{`
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0) translateY(20px);
          }
          50% {
            transform: scale(1.1) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes slideUpMobile {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .widget-menu-button {
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .widget-menu-button:active {
          transform: scale(0.95) !important;
        }

        .widget-menu-button:hover {
          transform: scale(1.1);
        }
      `}</style>

      {/* Main Blue Button - Only show when NO widget is selected */}
      {!selectedWidget && (
        <button
          onClick={() => {
            if (widgets.length === 1) {
              setSelectedWidget(widgets[0]);
            } else {
              setIsOpen(!isOpen);
            }
          }}
          className={`fixed bottom-6 right-6 w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 hover:bg-blue-700 rounded-full shadow-2xl flex items-center justify-center z-[60] transition-all duration-300 ${
            isOpen ? "rotate-45" : "hover:scale-110"
          }`}
          aria-label="Toggle widgets"
        >
          {isOpen ? (
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          )}
        </button>
      )}

      {/* Backdrop overlay to close menu */}
      {isOpen && <div className="fixed inset-0 z-[45]" onClick={closeMenu} />}

      {/* Desktop: Circle Layout ABOVE button with MORE SPACE from right */}
      {isOpen && (
        <div className="hidden lg:block fixed z-[50]">
          {widgets.map((widget, index) => {
            const totalWidgets = widgets.length;
            const baseAngle = 90;
            const spreadAngle = Math.min(totalWidgets * 35, 90);
            const startAngle = baseAngle - spreadAngle / 2;
            const angle =
              startAngle +
              (index * spreadAngle) / Math.max(totalWidgets - 1, 1);

            const radius = 130;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            const iconUrl = extractIconUrl(widget.data.embed_code);

            return (
              <button
                key={widget.data.id}
                onClick={(e) => handleWidgetClick(widget, e)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleWidgetClick(widget, e);
                }}
                className="widget-menu-button fixed w-16 h-16 bg-white hover:bg-blue-50 rounded-full shadow-2xl flex items-center justify-center border-2 border-gray-200 hover:border-blue-500"
                style={{
                  bottom: `${24 + 32 + y}px`,
                  right: `${24 + 32 - x + 60}px`,
                  animation: `popIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${
                    index * 0.08
                  }s both`,
                }}
                title={widget.data.name}
              >
                {iconUrl ? (
                  <img
                    src={iconUrl}
                    alt={widget.data.name}
                    className="w-11 h-11 object-contain pointer-events-none"
                  />
                ) : (
                  <span className="text-3xl pointer-events-none">
                    {widget.type === "contact_widget" && "📞"}
                    {widget.type === "helpdesk_widget" && "💬"}
                    {widget.type === "w9form_widget" && "📄"}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Mobile & Tablet: Vertical List ABOVE button with MORE SPACE from right */}
      {isOpen && (
        <div
          className="lg:hidden fixed z-[50]"
          style={{ bottom: "104px", right: "24px" }}
        >
          <div className="flex flex-col-reverse gap-3">
            {widgets.map((widget, index) => {
              const iconUrl = extractIconUrl(widget.data.embed_code);

              return (
                <button
                  key={widget.data.id}
                  onClick={(e) => handleWidgetClick(widget, e)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleWidgetClick(widget, e);
                  }}
                  className="widget-menu-button w-12 h-12 sm:w-14 sm:h-14 bg-white hover:bg-blue-50 rounded-full shadow-2xl flex items-center justify-center border-2 border-gray-200 hover:border-blue-500"
                  style={{
                    animation: `slideUpMobile 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${
                      index * 0.08
                    }s both`,
                  }}
                  title={widget.data.name}
                >
                  {iconUrl ? (
                    <img
                      src={iconUrl}
                      alt={widget.data.name}
                      className="w-9 h-9 sm:w-10 sm:h-10 object-contain pointer-events-none"
                    />
                  ) : (
                    <span className="text-xl sm:text-2xl pointer-events-none">
                      {widget.type === "contact_widget" && "📞"}
                      {widget.type === "helpdesk_widget" && "💬"}
                      {widget.type === "w9form_widget" && "📄"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Widget Container - NO extra close button, relies on widget's own X */}
      {selectedWidget && (
        <div
          ref={iframeRef}
          className="widget-container fixed inset-0 z-[56]"
        />
      )}
    </>
  );
}
