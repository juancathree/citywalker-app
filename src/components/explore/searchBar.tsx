import React, { useEffect } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { tv } from 'tailwind-variants';

import { useCities } from '@/core/hooks/useCities';
import { useThemeConfig } from '@/core/useThemeConfig';
import { Card, Icon } from '@/ui';

const selectTv = tv({
  slots: {
    container: '',
    card: 'grow flex-row items-center justify-between rounded-xl border border-transparent p-3 shadow-md',
    icon: 'items-center justify-center',
    input: 'w-0 text-textLight dark:text-textDark',
  },

  variants: {
    focused: {
      true: {
        container: 'grow',
        card: 'border-primary',
        icon: 'mr-2',
        input: 'grow',
      },
    },
  },
  defaultVariants: {
    focused: false,
  },
});

export function SearchBar() {
  const theme = useThemeConfig();
  const { filter, setFilter } = useCities();
  const [isFocused, setIsFocused] = React.useState(false);
  const searchRef = React.useRef<TextInput>(null);

  const stylesTV = React.useMemo(
    () =>
      selectTv({
        focused: isFocused,
      }),
    [isFocused]
  );

  useEffect(() => {
    if (isFocused) {
      searchRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <TouchableOpacity
      className={stylesTV.container()}
      onPress={() => setIsFocused(true)}
    >
      <Card className={stylesTV.card()}>
        <Icon name="search" isFocused={isFocused} className={stylesTV.icon()} />
        <TextInput
          ref={searchRef}
          testID={`searchCities`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={theme.colors.placeholder}
          className={stylesTV.input()}
          placeholder={isFocused ? 'Search' : ''}
          selectionColor={theme.colors.text}
          onChangeText={(value) => {
            setFilter(value);
          }}
          value={filter}
        />
        {isFocused && (
          <TouchableOpacity
            onPress={() => {
              setFilter('');
              setIsFocused(false);
            }}
          >
            <Icon name="close" fill={theme.colors.error} />
          </TouchableOpacity>
        )}
      </Card>
    </TouchableOpacity>
  );
}
