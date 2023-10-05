import React from "react";

type IndicatorSizeTypes = 'small' | 'medium' | 'large' | 'default';

export interface IndicatorProps {
  color: string;
  borderColor: string;
  size: IndicatorSizeTypes;
  additionalCss: string;
}

const Indicator = ({
  color,
  borderColor,
  size,
  additionalCss
}: IndicatorProps) => {
  const getSize = (value: IndicatorSizeTypes = 'small') => {
    const defaultValue = 'h-2 w-2';
    const sizes: any = {
      small: 'h-3 w-3',
      medium: 'h-6 w-6',
      large: 'h-9 w-9',
    };
    return sizes[value] || defaultValue;
  };
    
  const getColor = (value: string) => {
    const defaultValue = 'bg-purple-500';
    const colors: any = {
      yellow: 'bg-yellow-500',
      green: 'bg-green-500',
      orange: 'bg-orange-500',
      red: 'bg-red-500',
    };
    return colors[value] || defaultValue;
  };

  const getBorderColor = (value: string) => {
    const defaultValue = 'border-black';
    const colors: any = {
      gray: 'border-gray-500',
      white: 'border-white',
    };
    return colors[value] || defaultValue;
  };

  return (
    <div
      className={`${getColor(color)} ${getSize(size)} border-2 ${getBorderColor(borderColor)} rounded-full ${additionalCss}`}
    />
  );
}

export default Indicator;