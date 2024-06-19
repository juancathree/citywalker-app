import { useAuthStore } from 'src/store/useAuthStore'

import AuthorizedScreens from './authorizedScreens'
import UnauthorizedScreens from './unauthorizedScreens'

export default function RootNavigator() {
  const jwt = useAuthStore((state) => state.jwt)

  return <>{jwt ? <AuthorizedScreens /> : <UnauthorizedScreens />}</>
}
