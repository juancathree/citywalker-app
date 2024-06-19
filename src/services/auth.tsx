import { CreateRequest } from './createRequest'

import type { User } from 'src/types/user'

// @ts-ignore: Suppress ts(2339) error for this line
const API_URL = process.env.EXPO_PUBLIC_API_URL

export const AskConfirmCode = async (user: User): Promise<any | null> => {
  const response = await fetch(`${API_URL}/user/code`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })

  const json = await response.json()

  if (json['error']) {
    throw new Error(json['msg'])
  }

  return json['data']
}

export const CreateAccount = async (user: User) => await CreateRequest('/user/create', 'POST', user)

export const Login = async (user: User) => await CreateRequest('/user/login', 'POST', user)

export const ContinueWithGoogle = async (user: User) =>
  await CreateRequest('/user/continueWithGoogle', 'POST', user)

export const ResetPassword = async (user: User) =>
  await CreateRequest('/user/resetPassword', 'POST', user)
