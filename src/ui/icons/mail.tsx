import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const Mail = ({ color = '#CCC', ...props }: SvgProps) => (
  <Svg width={20} height={20} viewBox="0 -960 960 960" fill="none" {...props}>
    <Path
      d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280 320-200v-80L480-520 160-720v80l320 200Z"
      fill={color}
    />
  </Svg>
);
