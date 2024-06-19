import { useTranslation } from 'react-i18next'
import { View, Text } from 'react-native'

export function Divider() {
  const { t } = useTranslation()
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
      <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
      <View>
        <Text style={{ width: 50, textAlign: 'center' }}>{t('components.divider.or')}</Text>
      </View>
      <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
    </View>
  )
}
