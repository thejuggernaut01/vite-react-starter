import { cloneElement } from 'react';
import { z } from 'zod';


import More from '@/assets/icons/more.svg?react';


const iconEnums = z.enum([
  
  'more',
  
]);

export type iconTypes = z.infer<typeof iconEnums>;

interface IconInterface extends React.SVGProps<SVGSVGElement> {
  name: iconTypes;
  svgProp?: React.SVGProps<SVGElement>;
  className?: string;
}

const icons: Record<iconTypes, JSX.Element> = {
  
  more: <More />,
  
};

const Icon = ({ name, svgProp, className, ...props }: IconInterface) => {
  return cloneElement(icons[name], { className, ...props, ...svgProp });
};

export default Icon;
