import { useTheme } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { View, Text } from 'react-native'
import tailwind from 'twrnc'

export function LoginTitle() {
  const { colors } = useTheme()
  const { t } = useTranslation()
  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { fontFamily: 'Kaushan', color: '#404040' }]}>City</Text>
        <Text
          style={[styles.title, { fontFamily: 'Kaushan', color: colors.primary, marginLeft: -10 }]}>
          Walker
        </Text>
      </View>
      <Text style={[styles.subtitle, { fontFamily: 'Kaushan' }]}>
        {t('screens.login.description')}
      </Text>
    </>
  )
}

const styles = {
  titleContainer: tailwind`flex-row`,
  title: tailwind`shadow-xl text-15`,
  subtitle: tailwind`text-6 text-center mb-10`
}
