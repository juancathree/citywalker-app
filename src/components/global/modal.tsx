import { useTranslation } from 'react-i18next'
import { Incubator } from 'react-native-ui-lib'
import tailwind from 'twrnc'

type Props = {
  isVisible: boolean
  setVisible: (_visible: boolean) => void
  children: React.ReactNode
}

export function Modal({ isVisible, setVisible, children }: Props) {
  const { t } = useTranslation()

  const headerProps = {
    title: t('components.forgotPassword.title'),
    titleStyle: styles.titleStyle,
    subtitle: t('components.forgotPassword.subtitle'),
    subtitleStyle: styles.subtitleStyle,
    showKnob: false,
    showDivider: false
  }

  return (
    <Incubator.Dialog
      centerH
      centerV
      bottom
      visible={isVisible}
      modalProps={{ overlayBackgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      onDismiss={() => setVisible(!isVisible)}
      containerStyle={styles.container}
      headerProps={headerProps}>
      {children}
    </Incubator.Dialog>
  )
}

const styles = {
  container: tailwind`p-3 w-70`,
  titleStyle: tailwind`text-5 font-bold self-start`,
  subtitleStyle: tailwind`self-start`
}
