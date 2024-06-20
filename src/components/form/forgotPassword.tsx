import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { Form } from 'src/components/form/form'
import { Modal } from 'src/components/global/modal'
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

  const onSubmit = (d: typeof user) => {
    navigation.navigate('ConfirmCode', {
      user: d
    })
    setVisible(false)
  }

  return (
    <Modal isVisible={isVisible} setVisible={setVisible}>
      <Form
        data={user}
        schema={schema}
        buttonTitle={t('components.forgotPassword.button')}
        action={onSubmit}
        isLoading={false}
      />
    </Modal>
  )
}
