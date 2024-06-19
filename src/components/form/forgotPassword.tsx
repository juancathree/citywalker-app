import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { Incubator } from 'react-native-ui-lib'
import { Form } from 'src/components/form/form'
import tailwind from 'twrnc'
import * as yup from 'yup'

import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { UnauthorizedScreensParamList } from 'src/navigation/unauthorizedScreens'
import type { User } from 'src/types/user'

type Props = {
  isVisible: boolean
  setVisible: (_visible: boolean) => void
}

export function ForgotPassword({ isVisible, setVisible }: Props) {
  const { t } = useTranslation()
  const navigation = useNavigation<NativeStackNavigationProp<UnauthorizedScreensParamList>>()

  const user: User = {
    email: ''
  }

  const schema = yup.object({
    email: yup.string().required(t('schema.email.required')).email(t('schema.email.invalid'))
  })

  const headerProps = {
    title: t('components.forgotPassword.title'),
    titleStyle: styles.titleStyle,
    subtitle: t('components.forgotPassword.subtitle'),
    subtitleStyle: styles.subtitleStyle,
    showKnob: false,
    showDivider: false
  }

  const onSubmit = (d: typeof user) => {
    navigation.navigate('ConfirmCode', {
      user: d
    })
    setVisible(false)
  }

  return (
    <Incubator.Dialog
      centerH
      centerV
      bottom
      visible={isVisible}
      onDismiss={() => setVisible(false)}
      containerStyle={styles.container}
      headerProps={headerProps}>
      <Form
        data={user}
        schema={schema}
        buttonTitle={t('components.forgotPassword.button')}
        action={onSubmit}
        isLoading={false}
      />
    </Incubator.Dialog>
  )
}

const styles = {
  container: tailwind`p-3 w-70`,
  titleStyle: tailwind`text-5 font-bold self-start`,
  subtitleStyle: tailwind`self-start`
}
