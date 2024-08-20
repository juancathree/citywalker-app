import { yupResolver } from '@hookform/resolvers/yup';
import type { PropsWithChildren } from 'react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { TextInput } from 'react-native';
import { View } from 'react-native';
import tailwind from 'twrnc';
import type * as yup from 'yup';

import { ControlledInput } from './controlledInput';
import { LoadingButton } from './loadingButton';

type Props = PropsWithChildren<{
  data: any;
  schema: yup.ObjectSchema<any>;
  onSubmit: (data: any) => void;
  buttonText: string;
  isLoading?: boolean;
}>;

export const Form = ({
  data,
  schema,
  onSubmit,
  buttonText,
  isLoading = false,
  children,
}: Props) => {
  const { control, handleSubmit } = useForm<typeof data>({
    resolver: yupResolver(schema),
  });
  const inputsRef = React.useRef<TextInput[]>([]);
  const { t } = useTranslation();

  const handleSubmitEditing = (index: number) => {
    if (index < inputsRef.current.length) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const returnKey = (index: number) => {
    if (index === Object.keys(data).length - 1) {
      return 'done';
    } else {
      return 'next';
    }
  };

  return (
    <View style={styles.container}>
      {Object.keys(data).map((key, index) => (
        <View key={index} style={styles.inputContainer}>
          <Controller
            name={key}
            control={control}
            key={index}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <ControlledInput
                ref={(ref: TextInput) => (inputsRef.current[index] = ref)}
                name={key}
                placeholder={t(`placeHolder.${key}`)!}
                onChangeText={onChange}
                value={value}
                error={error?.message}
                onSubmitEditing={() => handleSubmitEditing(index)}
                returnKeyType={returnKey(index)}
              />
            )}
          />
        </View>
      ))}
      {children}
      <LoadingButton
        isLoading={isLoading}
        text={buttonText}
        onPress={handleSubmit(onSubmit)}
        style={styles.loadingButton}
        testID="loadingButton"
      />
    </View>
  );
};

const styles = {
  container: tailwind`items-center gap-3`,
  inputContainer: tailwind`w-full items-center`,
  loadingButton: tailwind`mt-2 w-full`,
};
