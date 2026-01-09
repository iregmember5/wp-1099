import React, { useRef } from "react";
import type { DynamicContentBlock } from "../../types/landing";
import EasyIcon from "./IconRenderer";

const API_BASE_URL = "https://esign-admin.signmary.com";

const extractYouTubeId = (url: string): string => {
  if (!url) return "";
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/
  );
  return match ? match[1] : "";
};

const getFullImageUrl = (url: string): string => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${API_BASE_URL}${url}`;
};

const ScrollAnimateCard: React.FC<any> = ({
  bgClass,
  cardData,
  title,
  description,
  icon,
  features,
  formatDescription,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className={`group ${
        cardData.card_background ? "" : `bg-gradient-to-br ${bgClass}`
      } 
        rounded-2xl p-6 md:p-8 hover:shadow-2xl hover:-translate-y-1 
        border-2 border-slate-200 hover:border-blue-300
      `}
      style={
        cardData.card_background
          ? {
              backgroundImage: `url(${getFullImageUrl(
                cardData.card_background.url
              )})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {}
      }
    >
      {icon && (
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-4 md:mb-6 transition-all duration-300 group-hover:scale-110 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
          <EasyIcon icon={icon} size={24} color="#FFFFFF" />
        </div>
      )}

      {cardData.card_image && (
        <div className="w-full h-40 md:h-52 rounded-xl mb-4 md:mb-6 overflow-hidden border-2 border-white shadow-lg">
          <img
            src={getFullImageUrl(cardData.card_image.url)}
            alt={cardData.card_image.title || title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      )}

      <h4 className="text-xl md:text-2xl lg:text-3xl font-extrabold mb-3 md:mb-4 leading-tight text-slate-900">
        {title || "Card Title"}
      </h4>

      {description && (
        <div className="text-slate-600 leading-relaxed text-sm md:text-base font-medium">
          <ul className="space-y-2">{formatDescription(description)}</ul>
        </div>
      )}

      {(cardData.price || cardData.price_period) && (
        <div className="mb-4 md:mb-6 mt-3 md:mt-4">
          <span className="text-3xl md:text-4xl font-extrabold text-slate-900">
            {cardData.price}
          </span>
          {cardData.price_period && (
            <span className="text-slate-600 ml-2 font-medium text-sm md:text-base">
              {cardData.price_period}
            </span>
          )}
        </div>
      )}

      {features && features.length > 0 && (
        <ul className="space-y-2 md:space-y-3 mt-4 md:mt-6">
          {features.map((feature: string, featureIdx: number) => (
            <li key={featureIdx} className="flex items-start gap-2 md:gap-3">
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gradient-to-br from-emerald-500 to-green-600 shadow-sm">
                <EasyIcon icon="FiCheck" size={12} color="#FFFFFF" />
              </div>
              <span className="text-slate-700 text-sm md:text-base leading-relaxed font-medium">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      )}

      {cardData.button_text && cardData.button_url && (
        <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t-2 border-slate-100">
          <a
            href={cardData.button_url}
            className="inline-flex items-center gap-2 font-bold text-blue-600 transition-all duration-300 hover:gap-3 group/btn text-sm md:text-base"
          >
            {cardData.button_text}
            <EasyIcon icon="FiArrowRight" size={16} color="#3B82F6" />
          </a>
        </div>
      )}
    </div>
  );
};

const DynamicContentRenderer: React.FC<{ block: DynamicContentBlock }> = ({
  block,
}) => {
  const richRef = useRef<HTMLDivElement>(null);

  switch (block.type) {
    case "rich_text":
      return (
        <div className="relative mb-12 md:mb-16 overflow-hidden rounded-3xl shadow-2xl border-4 border-amber-400 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-yellow-400/20 to-orange-400/20 animate-pulse" />
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500" />
          <div
            ref={richRef}
            className="relative p-8 md:p-16 prose prose-xl md:prose-2xl max-w-none prose-headings:text-slate-900 prose-headings:font-black prose-headings:drop-shadow-sm prose-p:text-slate-800 prose-p:leading-relaxed prose-p:font-medium prose-a:text-amber-600 prose-a:font-bold hover:prose-a:text-amber-700 prose-strong:text-amber-700 prose-strong:font-extrabold prose-ul:text-slate-800 prose-ol:text-slate-800 prose-li:font-medium"
            dangerouslySetInnerHTML={{ __html: block.value }}
          />
        </div>
      );

    case "blockquote":
      return (
        <blockquote className="border-l-4 border-blue-500 pl-4 md:pl-8 py-4 md:py-6 mb-8 md:mb-12 bg-gradient-to-r from-blue-50 to-transparent rounded-r-xl shadow-md">
          <p className="text-base md:text-xl text-slate-700 font-medium leading-relaxed italic">
            "{block.value.text}"
          </p>
          {block.value.author && (
            <footer className="text-xs md:text-sm text-slate-600 mt-3 md:mt-4 not-italic font-bold">
              — {block.value.author}
              {block.value.source && (
                <span className="text-slate-500 font-normal">
                  {" "}
                  ({block.value.source})
                </span>
              )}
            </footer>
          )}
        </blockquote>
      );

    case "cta":
      return (
        <div
          className="relative p-6 sm:p-8 md:p-12 lg:p-16 rounded-xl md:rounded-2xl mb-10 md:mb-16 text-white overflow-hidden shadow-xl md:shadow-2xl"
          style={{
            backgroundImage: block.value.background_image
              ? `url(${getFullImageUrl(block.value.background_image.url)})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: block.value.background_image
              ? "transparent"
              : "#3B82F6",
          }}
        >
          {block.value.background_image && (
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
          )}
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-3 md:mb-6 drop-shadow-lg">
              {block.value.title}
            </h3>
            {block.value.description && (
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 md:mb-10 opacity-95 leading-relaxed font-medium">
                {block.value.description}
              </p>
            )}
            <a
              href={block.value.button_url}
              className={`inline-block px-6 py-3 md:px-10 md:py-5 rounded-lg md:rounded-xl font-bold text-sm md:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                block.value.button_style === "primary"
                  ? "bg-white text-blue-600 hover:bg-gray-100"
                  : block.value.button_style === "secondary"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "border-2 md:border-3 border-white text-white hover:bg-white hover:text-blue-600"
              }`}
            >
              {block.value.button_text}
            </a>
          </div>
        </div>
      );

    case "video":
      return (
        <div className="mb-10 md:mb-16">
          <div className="aspect-video rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl border-2 md:border-4 border-white">
            <iframe
              src={`https://www.youtube.com/embed/${extractYouTubeId(
                block.value.video_url || ""
              )}?autoplay=${block.value.autoplay === "true" ? 1 : 0}&controls=${
                block.value.controls === "true" ? 1 : 0
              }&loop=${block.value.loop === "true" ? 1 : 0}&mute=${
                block.value.muted === "true" ? 1 : 0
              }&playsinline=1`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Video content"
            />
          </div>
        </div>
      );

    case "card_grid":
      return (
        <div className="mb-12 md:mb-20">
          {block.value.heading && (
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 text-center text-slate-900">
              {block.value.heading}
            </h3>
          )}
          {block.value.subheading && (
            <p className="text-slate-600 mb-8 md:mb-16 text-center text-base md:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed font-medium px-4">
              {block.value.subheading}
            </p>
          )}
          <div
            className={`grid gap-4 md:gap-8 ${
              block.value.cards?.length === 2
                ? "grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto"
                : block.value.columns === "1"
                ? "grid-cols-1"
                : block.value.columns === "2"
                ? "grid-cols-1 md:grid-cols-2"
                : block.value.columns === "3"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : block.value.columns === "4"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {block.value.cards?.map((card: any, idx: number) => {
              const cardData = card.card_content || card;
              const title = card.custom_title || cardData.title || "";
              const description =
                card.custom_description || cardData.description || "";
              const icon = card.card_icon || cardData.icon || "";
              const image = card.card_image || cardData.card_image;
              const background =
                card.card_background || cardData.card_background;
              const features = cardData.features || [];

              const formatDescription = (desc: string) => {
                if (!desc) return null;
                const lines = desc.split(/\r?\n/).filter((line) => line.trim());
                return lines.map((line, i) => {
                  const trimmed = line.trim();
                  const isBullet =
                    trimmed.length < 80 &&
                    !trimmed.endsWith(":") &&
                    (i > 0 || lines.length > 2);
                  if (isBullet) {
                    return (
                      <li key={i} className="flex items-start gap-2 mb-2">
                        <span className="text-blue-600 mt-1 font-bold">•</span>
                        <span className="flex-1">{trimmed}</span>
                      </li>
                    );
                  }
                  return (
                    <p
                      key={i}
                      className="mb-2 md:mb-3 font-medium text-slate-700 text-sm md:text-base"
                    >
                      {trimmed}
                    </p>
                  );
                });
              };

              const bgColors = [
                "from-blue-50 to-indigo-50",
                "from-emerald-50 to-green-50",
                "from-orange-50 to-red-50",
                "from-purple-50 to-pink-50",
                "from-cyan-50 to-teal-50",
                "from-amber-50 to-yellow-50",
              ];
              const bgClass = background ? "" : bgColors[idx % bgColors.length];

              return (
                <ScrollAnimateCard
                  key={idx}
                  bgClass={bgClass}
                  cardData={{
                    ...cardData,
                    card_image: image,
                    card_background: background,
                  }}
                  title={title}
                  description={description}
                  icon={icon}
                  features={features}
                  formatDescription={formatDescription}
                />
              );
            })}
          </div>
        </div>
      );

    case "dynamic_list":
      const dynamicListData = block.value || {};
      return (
        <section className="py-12 md:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 via-white to-slate-50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="space-y-4 md:space-y-6 mb-10 md:mb-20">
              {dynamicListData.heading && (
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900">
                  {dynamicListData.heading}
                </h2>
              )}
              {dynamicListData.description && (
                <p className="text-base md:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium px-4">
                  {dynamicListData.description}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {Array.isArray(dynamicListData.items) &&
                dynamicListData.items.map((item: any, idx: number) => {
                  if (!item || typeof item !== "object") return null;
                  return <DynamicListItem key={idx} item={item} />;
                })}
            </div>
          </div>
        </section>
      );

    case "dynamic_list_old":
      const dynamicListOldData = block.value || {};
      return (
        <div className="mb-12 md:mb-20">
          {dynamicListOldData.heading && (
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 text-center text-slate-900">
              {dynamicListOldData.heading}
            </h3>
          )}
          {dynamicListOldData.description && (
            <p className="text-slate-600 mb-8 md:mb-12 text-base md:text-xl leading-relaxed text-center max-w-3xl mx-auto font-medium px-4">
              {dynamicListOldData.description}
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {Array.isArray(dynamicListOldData.items) &&
              dynamicListOldData.items.map((item: any, idx: number) => {
                if (!item || typeof item !== "object") return null;
                return <DynamicListOldItem key={idx} item={item} />;
              })}
          </div>
        </div>
      );

    case "old_dynamic_list":
      const oldDynamicListData = block.value || {};
      return (
        <div className="mb-12 md:mb-20">
          {oldDynamicListData.heading && (
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 text-slate-900">
              {oldDynamicListData.heading}
            </h3>
          )}
          {oldDynamicListData.description && (
            <p className="text-slate-600 mb-8 md:mb-12 text-base md:text-xl leading-relaxed font-medium">
              {oldDynamicListData.description}
            </p>
          )}
          <div className="space-y-4 md:space-y-8">
            {Array.isArray(oldDynamicListData.items) &&
              oldDynamicListData.items.map((item: any, idx: number) => {
                if (!item || typeof item !== "object") return null;
                return <OldDynamicListItem key={idx} item={item} />;
              })}
          </div>
        </div>
      );

    default:
      return null;
  }
};

const DynamicListItem: React.FC<{ item: any }> = ({ item }) => {
  return (
    <div className="group">
      <div className="bg-white rounded-xl md:rounded-2xl p-5 md:p-8 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border-2 border-slate-200 hover:border-blue-300 h-full">
        <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">
          {item.image && item.image.url && (
            <img
              src={getFullImageUrl(item.image.url)}
              alt={item.image.title || item.title}
              className="w-full h-40 md:h-52 object-cover rounded-lg md:rounded-xl border-2 border-white shadow-lg"
              loading="lazy"
            />
          )}
          <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {item.title}
          </h3>
          <div
            className="text-sm md:text-base text-slate-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </div>
      </div>
    </div>
  );
};

const DynamicListOldItem: React.FC<{ item: any }> = ({ item }) => {
  return (
    <div className="relative h-60 md:h-80 rounded-xl md:rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 ease-out origin-bottom-right" />
      {item.image && item.image.url && (
        <div className="absolute inset-0">
          <img
            src={getFullImageUrl(item.image.url)}
            alt={item.image.title || item.title || "Card image"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70"></div>
        </div>
      )}
      <div className="relative h-full flex flex-col justify-end p-4 md:p-6 text-white">
        <h4 className="text-xl md:text-2xl font-extrabold mb-1 md:mb-2 drop-shadow-lg text-white">
          {item.title || "Untitled"}
        </h4>
        <p className="text-base md:text-lg opacity-90 drop-shadow font-medium">
          {item.subtitle || "2025"}
        </p>
      </div>
    </div>
  );
};

const OldDynamicListItem: React.FC<{ item: any }> = ({ item }) => {
  const itemType = item.type || "";
  const itemValue = item.value || {};

  return (
    <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-10 hover:shadow-2xl transition-all duration-500 border-2 border-slate-200 hover:border-blue-300">
      {itemType === "custom_item" && (
        <>
          {itemValue.icon && (
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
              <EasyIcon icon={itemValue.icon} size={24} color="#FFFFFF" />
            </div>
          )}
          <h4 className="text-xl md:text-3xl font-extrabold mb-3 md:mb-5 text-slate-900">
            {itemValue.title || "Untitled"}
          </h4>
          {itemValue.content && (
            <div
              className="w-full max-w-none mb-4 md:mb-6 text-slate-700 text-sm md:text-base leading-relaxed"
              dangerouslySetInnerHTML={{
                __html:
                  typeof itemValue.content === "string"
                    ? itemValue.content
                    : String(itemValue.content || ""),
              }}
            />
          )}
          {itemValue.image && itemValue.image.url && (
            <img
              src={getFullImageUrl(itemValue.image.url)}
              alt={itemValue.image.title || "Content image"}
              className="mt-4 md:mt-6 rounded-lg md:rounded-xl w-full object-cover max-h-60 md:max-h-96 shadow-xl border-2 md:border-4 border-white"
              loading="lazy"
            />
          )}
        </>
      )}
      {itemType === "feature" && (
        <>
          {itemValue.icon && (
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
              <EasyIcon icon={itemValue.icon} size={24} color="#FFFFFF" />
            </div>
          )}
          <h4 className="text-xl md:text-3xl font-extrabold mb-3 md:mb-5 text-slate-900">
            {itemValue.title || "Feature"}
          </h4>
          {itemValue.description && (
            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
              {itemValue.description}
            </p>
          )}
        </>
      )}
      {itemType === "benefit" && (
        <>
          {itemValue.icon && (
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-6 bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg">
              <EasyIcon icon={itemValue.icon} size={24} color="#FFFFFF" />
            </div>
          )}
          <h4 className="text-xl md:text-3xl font-extrabold mb-3 md:mb-5 text-slate-900">
            {itemValue.title || "Benefit"}
          </h4>
          {itemValue.description && (
            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
              {itemValue.description}
            </p>
          )}
          {itemValue.stat && (
            <div className="mt-4 md:mt-6 p-4 md:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg md:rounded-xl border-2 border-blue-200">
              <p className="text-2xl md:text-3xl font-extrabold text-slate-900">
                {itemValue.stat}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export { DynamicContentRenderer };
export default DynamicContentRenderer;
