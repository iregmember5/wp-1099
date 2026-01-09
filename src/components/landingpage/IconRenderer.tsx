import React from "react";
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

interface EasyIconProps {
  icon: string;
  size?: number;
  color?: string;
  className?: string;
}

const EasyIcon: React.FC<EasyIconProps> = ({
  icon,
  size = 24,
  color,
  className = "",
}) => {
  if (icon && !/^[A-Z][a-z]/.test(icon)) {
    return (
      <span className={className} style={{ fontSize: size, lineHeight: 1 }}>
        {icon}
      </span>
    );
  }

  const IconComponent = ICONS[icon];

  if (!IconComponent) {
    return <FiHelpCircle size={size} color={color} className={className} />;
  }

  return <IconComponent size={size} color={color} className={className} />;
};

export default EasyIcon;
