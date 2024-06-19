import React, { useRef } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { View, Text } from 'react-native'
import { LoadingButton } from 'src/components/global/loadingButton'
import tailwind from 'twrnc'

import { FormInput } from './formInput'

import type { TextInput } from 'react-native'
import type * as yup from 'yup'

type Props = {
  data: any
  buttonTitle: string
  action: (_data: any) => void
  schema: yup.ObjectSchema<any>
  isLoading?: boolean
  children?: React.ReactNode
}

export function Form({ data, buttonTitle, schema, action, isLoading = false, children }: Props) {
  const { t } = useTranslation()
  const inputsRef = useRef<TextInput[]>([])

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<typeof data>({
    resolver: yupResolver(schema)
  })

  const onSubmit = (d: typeof data) => {
    action(d)
  }

  const handleSubmitEditing = (index: number) => {
    if (index < inputsRef.current.length) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  return (
    <View style={styles.container}>
      {Object.keys(data)
        .filter((key: string) => data[key] === '')
        .map((key: string, index: number) => (
          <View key={index} style={styles.form}>
            <Controller
              control={control}
              key={index}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  name={key}
                  ref={(el) => (inputsRef.current[index] = el!)}
                  onBlur={onBlur}
                  onChangeText={(value: string) => onChange(value)}
                  onSubmitEditing={() => handleSubmitEditing(index)}
                  value={value}
                  placeholder={t(`components.formInput.${key}`)}
                  secureTextEntry={key === 'password'}
                  autofocus={index === 0}
                  returnKeyType={index === Object.keys(data).length - 1 ? 'done' : 'next'}
                />
              )}
              name={key}
            />
            {errors[key] && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errors[key].message as string}</Text>
              </View>
            )}
          </View>
        ))}
      {children}
      <View style={styles.buttonContainer}>
        <LoadingButton isLoading={isLoading} text={buttonTitle} onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  )
}

const styles = {
  container: tailwind`gap-3 items-center w-full`,
  form: tailwind`items-center`,
  errorContainer: tailwind`flex-row self-start gap-2 ml-2 mt-1`,
  errorText: tailwind`text-red-500 text-xs self-start`,
  buttonContainer: tailwind`mt-2`
}
