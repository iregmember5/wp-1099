import React from "react";
import type { DynamicContentBlock } from "../../../types/information-page";
import { CardGridBlock } from "./blocks/CardGridBlock";
import { DynamicListBlock } from "./blocks/DynamicListBlock";
import { VideoBlock } from "./blocks/VideoBlock";
import { RichTextBlock } from "./blocks/RichTextBlock";
import { CTABlock } from "./blocks/CTABlock";
import { BlockquoteBlock } from "./blocks/BlockquoteBlock";
import { ProblemSolutionBlock } from "./blocks/ProblemSolutionBlock";
import { PricingWidgetBlock } from "./blocks/PricingWidgetBlock";

interface DynamicContentRendererProps {
  block: DynamicContentBlock;
  theme: any;
}

export const DynamicContentRenderer: React.FC<DynamicContentRendererProps> = ({
  block,
  theme,
}) => {
  const renderers = {
    card_grid: CardGridBlock,
    dynamic_list: DynamicListBlock,
    video: VideoBlock,
    rich_text: RichTextBlock,
    cta: CTABlock,
    blockquote: BlockquoteBlock,
    problem_solution: ProblemSolutionBlock,
    pricing_widget: PricingWidgetBlock,
  };

  const BlockComponent = renderers[block.type as keyof typeof renderers];

  if (!BlockComponent) {
    console.warn(`No renderer found for block type: ${block.type}`);
    return null;
  }

  try {
    return <BlockComponent value={block.value} theme={theme} getFullImageUrl={(url: string) => url.startsWith('http') ? url : `https://esign-admin.signmary.com${url}`} />;
  } catch (error) {
    console.error(`Error rendering block ${block.type}:`, error);
    return null;
  }
};
