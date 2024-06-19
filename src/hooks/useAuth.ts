import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { useTranslation } from 'react-i18next'
import Toast from 'react-native-toast-message'
import { ContinueWithGoogle, CreateAccount, Login, ResetPassword } from 'src/services/auth'
import { useAuthStore } from 'src/store/useAuthStore'

import type { User } from 'src/types/user'

// @ts-ignore: Suppress ts(2339) error for this line
const WEB_CLIENT_ID = process.env.EXPO_PUBLIC_WEB_CLIENT_ID
// @ts-ignore: Suppress ts(2339) error for this line
const IOS_CLIENT_ID = process.env.EXPO_PUBLIC_IOS_CLIENT_ID

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  offlineAccess: true,
  forceCodeForRefreshToken: true,
  iosClientId: IOS_CLIENT_ID,
  profileImageSize: 120
})

export default function useAuth() {
  const { t } = useTranslation()
  const [setJWT, setUser, setIsLoading, setIsFetched, setError, isLoading, isFetched, error] =
    useAuthStore((state) => [
      state.setJWT,
      state.setUser,
      state.setIsLoading,
      state.setIsFetched,
      state.setError,
      state.isLoading,
      state.isFetched,
      state.error
    ])

  const fetching = () => {
    setIsLoading(true)
    setIsFetched(false)
  }

  const errorFetching = (msg: string) => {
    setError(true)
    Toast.show({ type: 'error', text1: msg })
  }

  const fetched = () => {
    setIsLoading(false)
    setIsFetched(true)
  }

  const createAccount = (user: User) => {
    const createAccount = async () => {
      try {
        fetching()
        const data = await CreateAccount(user)
        setJWT(`Bearer ${data['jwt']}`)
        setUser(data['user'])
        setError(false)
        Toast.show({ type: 'success', text1: t('toast.useAuth.accountCreated') })
      } catch {
        errorFetching(t('toast.useAuth.accountNotCreated'))
      } finally {
        fetched()
      }
    }

    createAccount()
  }

  const login = (user: User) => {
    const login = async () => {
      try {
        fetching()
        const jwt = await Login(user)
        setJWT(`Bearer ${jwt}`)
        setError(false)
      } catch {
        errorFetching(t('toast.useAuth.loginFailed'))
      } finally {
        fetched()
      }
    }

    login()
  }

  const continueWithGoogle = () => {
    const continueWithGoogle = async () => {
      try {
        fetching()
        await GoogleSignin.hasPlayServices()
        const userInfo = await GoogleSignin.signIn()
        const user: User = {
          fullName: userInfo.user.name,
          email: userInfo.user.email
        }
        const data = await ContinueWithGoogle(user)
        setJWT(`Bearer ${data['jwt']}`)
        setUser(data['user'])
        setError(false)
      } catch {
        errorFetching(t('toast.useAuth.continueWithGoogleFailed'))
      } finally {
        fetched()
      }
    }

    continueWithGoogle()
  }

  const resetPassword = (user: User) => {
    const resetPassword = async () => {
      try {
        fetching()
        await ResetPassword(user)
        setError(false)
        Toast.show({ type: 'success', text1: t('toast.useAuth.passwordReseted') })
      } catch {
        errorFetching(t('toast.useAuth.resetPasswordFailed'))
      } finally {
        fetched()
      }
    }

    resetPassword()
  }

  return {
    createAccount,
    login,
    continueWithGoogle,
    resetPassword,
    isLoading,
    isFetched,
    error
  }
}
