import { FlashList } from '@shopify/flash-list';
import React from 'react';
import tailwind from 'twrnc';

import { useCities } from '@/core';
import { ListSeparator } from '@/ui';

import { CitiesItem } from './citiesItem';

export function CitiesList() {
  const { data: cities, filter } = useCities();

  return (
    <FlashList
      showsVerticalScrollIndicator={false}
      estimatedItemSize={100}
      data={cities?.filter((item) =>
        item.city.toLowerCase().startsWith(filter.toLowerCase())
      )}
      contentContainerStyle={tailwind`pb-20`}
      ItemSeparatorComponent={ListSeparator}
      renderItem={({ item, index }) => {
        return <CitiesItem item={item} index={index} />;
      }}
    />
  );
}
