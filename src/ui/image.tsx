import type { ImageProps } from 'expo-image';
import { Image as NImage } from 'expo-image';
import { cssInterop } from 'nativewind';
import * as React from 'react';

type Props = ImageProps & {
  uuid: string;
};

cssInterop(NImage, { className: 'style' });

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export const Image = ({ uuid, ...rest }: Props) => {
  return (
    <NImage
      className="h-full w-full"
      placeholder={{ blurhash }}
      cachePolicy={'memory-disk'}
      contentFit="cover"
      source={{
        uri: `https://ik.imagekit.io/aacivfepey/${uuid}.jpg`,
      }}
      {...rest}
    />
  );
};

export const preloadImages = (sources: string[]) => {
  NImage.prefetch(sources);
};
