import React from 'react';
import {
  Text,
  TextInput,
  type TextInputProps,
  TouchableOpacity,
} from 'react-native';
import tailwind from 'twrnc';

import { useThemeConfig } from '@/core/use-theme-config';
import Card from '@/ui/card';
import { Icon } from '@/ui/icon';

interface Props extends TextInputProps {
  name: string;
  error?: string;
}

export const ControlledInput = React.forwardRef<TextInput, Props>(
  (props, ref) => {
    const { name, error, ...inputProps } = props;
    const [isFocused, setIsFocused] = React.useState(false);
    const [isSecured, setIsSecured] = React.useState(
      name === 'password' || name === 'confirmPassword'
    );
    const onFocus = React.useCallback(() => setIsFocused(true), []);
    const onBlur = React.useCallback(() => setIsFocused(false), []);
    const theme = useThemeConfig();

    return (
      <>
        <Card
          style={tailwind`flex-row items-center rounded border p-3 shadow-md ${isFocused
              ? `border-[${theme.colors.primary}]`
              : `border-transparent`
            } ${error ? `border-[${theme.colors.error}]` : ''}`}
        >
          <Card style={tailwind`mr-2 items-center justify-center`}>
            <Icon name={name} isFocused={isFocused} />
          </Card>
          <TextInput
            testID={`${name}-input`}
            ref={ref}
            placeholderTextColor={theme.colors.placeholder}
            style={tailwind`flex-1 text-[${theme.colors.text}]`}
            onFocus={onFocus}
            onBlur={onBlur}
            secureTextEntry={isSecured}
            selectionColor={theme.colors.text}
            {...inputProps}
          />
          {name === 'password' || name === 'confirmPassword' ? (
            <TouchableOpacity
              testID="showPassword"
              onPress={() => setIsSecured(!isSecured)}
            >
              <Icon name="visibility" isFocused={!isSecured} />
            </TouchableOpacity>
          ) : null}
        </Card>
        {error && (
          <Text
            testID={`${name}Input-error`}
            style={tailwind`text-[${theme.colors.error}] self-start pl-2 text-sm font-bold`}
          >
            {error}
          </Text>
        )}
      </>
    );
  }
);
