import { CreateRequest } from './createRequest'

import type { User } from 'src/types/user'

export const AskConfirmCode = async (user: User) => await CreateRequest('/user/code', 'POST', user)

export const CreateAccount = async (user: User) => await CreateRequest('/user/create', 'POST', user)

export const Login = async (user: User) => await CreateRequest('/user/login', 'POST', user)

export const ContinueWithGoogle = async (user: User) =>
  await CreateRequest('/user/continueWithGoogle', 'POST', user)

export const ResetPassword = async (user: User) =>
  await CreateRequest('/user/resetPassword', 'POST', user)
