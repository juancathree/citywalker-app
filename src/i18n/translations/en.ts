import type { Translation } from 'src/i18n/types'

export const en: Translation = {
  translation: {
    screens: {
      login: {
        description: 'Your city, your way, your itinerary',
        forgotPassword: 'Forgot password?',
        loginButton: 'Login',
        notAccount: 'Not account yet? ',
        register: 'Register'
      },
      register: {
        title: 'SignUp',
        description: 'Create your account to get started',
        button: 'Continue'
      },
      forgotPassword: {
        title: 'Forgot pasword?',
        description: 'Introduce your email to get a code',
        button: 'Send me'
      },
      confirmCode: {
        wrongOTPCode: 'Wrong OTP code',
        errorFetchingCode: 'Error fetching OTP code',
        title: 'Confirm your email',
        description: 'Introduce your code to confirm your account'
      }
    },
    components: {
      divider: {
        or: 'or'
      },
      formInput: {
        email: 'Email',
        password: 'Password',
        fullName: 'Full Name',
        confirmPassword: 'Confirm Password'
      },
      forgotPassword: {
        title: 'Forgot password?',
        subtitle: 'Introduce your email to get a code',
        button: 'Send me'
      }
    },
    schema: {
      email: {
        required: 'Email is required',
        invalid: 'Invalid email'
      },
      password: {
        required: 'Password is required',
        min: 'Password must be at least 8 characters',
        bothMustMatch: 'Passwords must match'
      },
      fullName: {
        required: 'Full name is required'
      }
    },
    services: {
      networkError: 'Network error, try again later',
      '/user/googleLogin-error': 'User or password is incorrect',
      '/user/googleCreate-error': 'Cannot create account, try again later',
      '/user/create-error': 'Cannot create account, try again later',
      '/user/login-error': 'User or password is incorrect',
      '/user/forgotPassword-error': 'Cannot send code, try again later'
    },
    toast: {
      useAuth: {
        accountCreated: '',
        accountNotCreated: '',
        loginFailed: '',
        continueWithGoogleFailed: '',
        passwordReseted: '',
        resetPasswordFailed: ''
      }
    }
  }
}
