import { cssInterop } from 'nativewind';
import Svg from 'react-native-svg';

export * from './animatedImage';
export * from './avatar';
export * from './background';
export * from './card';
export { default as colors } from './colors';
export * from './divider';
export * from './focusAwareStatusBar';
export * from './icon';
export * from './image';
export * from './image';
export * from './link';
export * from './listSeparator';
export * from './text';
export * from './text';
export * from './title';
export * from './utils';
export * from './view';

//Apply cssInterop to Svg to resolve className string into style
cssInterop(Svg, {
  className: {
    target: 'style',
  },
});
