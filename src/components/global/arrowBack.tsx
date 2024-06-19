import React from 'react'

import { FontAwesome } from '@expo/vector-icons'
import tailwind from 'twrnc'

type Props = {
  action: () => void
}

export function ArrowBack({ action }: Props) {
  return (
    <FontAwesome
      name="arrow-left"
      size={24}
      color="black"
      onPress={action}
      style={tailwind`self-start`}
      testID="arrow-back"
    />
  )
}
