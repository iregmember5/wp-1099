import {
  FiArrowRight,
  FiCheck,
  FiCheckCircle,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiFolder,
  FiGift,
  FiHeadphones,
  FiHelpCircle,
  FiImage,
  FiInfo,
  FiList,
  FiPlay,
  FiSend,
  FiShield,
  FiTag,
  FiX,
  FiZap,
} from "react-icons/fi";

const ICONS: Record<string, any> = {
  FiArrowRight,
  FiCheck,
  FiCheckCircle,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiFolder,
  FiGift,
  FiHeadphones,
  FiHelpCircle,
  FiImage,
  FiInfo,
  FiList,
  FiPlay,
  FiSend,
  FiShield,
  FiTag,
  FiX,
  FiZap,
};

interface IconRendererProps {
  iconPath: string;
  className?: string;
}

export default function IconRenderer({
  iconPath,
  className = "",
}: IconRendererProps) {
  if (!iconPath) return null;

  const [_, iconName] = iconPath.split("/");
  const IconComponent = ICONS[iconName];

  if (!IconComponent) return null;

  return <IconComponent className={className} />;
}
