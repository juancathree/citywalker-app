import React from 'react';
import {
  Text,
  TextInput,
  type TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { tv } from 'tailwind-variants';

import { useThemeConfig } from '@/core/useThemeConfig';
import { Card, Icon } from '@/ui';

type Props = {
  name: string;
  error?: string;
} & TextInputProps;

const secretsFields = ['password', 'confirmPassword'];

export const ControlledInput = React.forwardRef<TextInput, Props>(
  (props, ref) => {
    const { name, error, ...inputProps } = props;
    const theme = useThemeConfig();
    const [isFocused, setIsFocused] = React.useState<boolean>(false);
    const [isSecured, setIsSecured] = React.useState<boolean>(
      secretsFields.includes(name)
    );

    const stylesTV = React.useMemo(
      () =>
        selectTV({
          focused: isFocused,
          error: error ? true : false,
        }),
      [isFocused, error]
    );

    const onFocus = React.useCallback(() => setIsFocused(true), []);
    const onBlur = React.useCallback(() => setIsFocused(false), []);
    const toggleSecure = React.useCallback(
      () => setIsSecured(!isSecured),
      [isSecured]
    );

    return (
      <>
        <Card className={stylesTV.inputContainer()}>
          <Icon name={name} isFocused={isFocused} />
          <TextInput
            testID={`${name}Input`}
            ref={ref}
            placeholderTextColor={theme.colors.placeholder}
            className={stylesTV.textInput()}
            onFocus={onFocus}
            onBlur={onBlur}
            secureTextEntry={isSecured}
            selectionColor={theme.colors.text}
            {...inputProps}
          />
          {secretsFields.includes(name) ? (
            <TouchableOpacity testID="showPassword" onPress={toggleSecure}>
              <Icon name="visibility" isFocused={!isSecured} />
            </TouchableOpacity>
          ) : null}
        </Card>
        {error && (
          <Text
            testID={`${name}InputError`}
            className={stylesTV.errorMessage()}
          >
            {error}
          </Text>
        )}
      </>
    );
  }
);

const selectTV = tv({
  slots: {
    inputContainer:
      'flex-row items-center gap-2 rounded border border-transparent p-3 shadow-md',
    error: 'self-start pl-2 text-sm font-bold',
    textInput: 'flex-1 text-textLight dark:text-textDark',
    errorMessage: 'mt-1 self-start text-errorLight dark:text-errorDark',
  },
  variants: {
    error: {
      true: {
        inputContainer: 'border-errorLight dark:border-errorDark',
      },
    },
    focused: {
      true: {
        inputContainer: 'border-primary',
      },
    },
  },
  defaultVariants: {
    error: false,
    focused: false,
  },
});
