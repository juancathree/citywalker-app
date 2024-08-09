import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { TextInput } from 'react-native';
import { View } from 'react-native';
import type * as yup from 'yup';

import { ControlledInput } from '@/components/form/controlledInput';
import { LoadingButton } from '@/components/form/loadingButton';

type FormProps = {
  data: any;
  schema: yup.ObjectSchema<any>;
  onSubmit: (data: any) => void;
  buttonText: string;
  children?: React.ReactNode;
};

export const Form = ({
  data,
  schema,
  onSubmit,
  buttonText,
  children = null,
}: FormProps) => {
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

  return (
    <View className="items-center gap-3">
      {Object.keys(data).map((key, index) => (
        <View key={index} className="w-full items-center">
          <Controller
            name={key}
            control={control}
            key={index}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <ControlledInput
                ref={(ref) => (inputsRef.current[index] = ref!)}
                testID={`${key}-input`}
                name={key}
                placeholder={t(`placeHolder.${key}`) as string}
                onChangeText={onChange}
                value={value}
                error={error?.message}
                onSubmitEditing={() => handleSubmitEditing(index)}
                returnKeyType={
                  index === Object.keys(data).length - 1 ? 'done' : 'next'
                }
              />
            )}
          />
        </View>
      ))}
      {children}
      <View className="mt-2 w-full">
        <LoadingButton
          isLoading={false}
          text={buttonText}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};
